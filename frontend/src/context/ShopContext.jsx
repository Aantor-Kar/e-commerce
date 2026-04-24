import { createContext, useState, useEffect } from 'react';
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext();
const USER_TOKEN_STORAGE_KEY = 'userToken'
const LEGACY_SHARED_TOKEN_KEY = 'token'
const CART_STORAGE_KEY = 'cartItems'

const parseTokenPayload = (token) => {
    try {
        if (!token) {
            return null;
        }
        const base64 = token.split('.')[1];
        if (!base64) {
            return null;
        }
        const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(
            atob(normalized)
                .split('')
                .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
                .join('')
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
}

const getStoredUserToken = () => {
    const storedUserToken = localStorage.getItem(USER_TOKEN_STORAGE_KEY);
    if (storedUserToken) {
        return storedUserToken;
    }

    const legacyToken = localStorage.getItem(LEGACY_SHARED_TOKEN_KEY);
    const legacyPayload = parseTokenPayload(legacyToken);
    if (legacyPayload && typeof legacyPayload === 'object' && legacyPayload.id) {
        localStorage.setItem(USER_TOKEN_STORAGE_KEY, legacyToken);
        return legacyToken;
    }

    return '';
}

const getStoredCartItems = () => {
    try {
        const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
        if (!storedCartItems) {
            return {};
        }

        const parsedCartItems = JSON.parse(storedCartItems);
        return parsedCartItems && typeof parsedCartItems === 'object' ? parsedCartItems : {};
    } catch {
        return {};
    }
}

const mergeCartStates = (serverCart = {}, localCart = {}) => {
    const mergedCart = structuredClone(serverCart || {});

    for (const itemId in localCart) {
        for (const size in localCart[itemId]) {
            const quantity = Number(localCart[itemId][size] || 0);
            if (quantity <= 0) {
                continue;
            }

            if (!mergedCart[itemId]) {
                mergedCart[itemId] = {};
            }

            mergedCart[itemId][size] = quantity;
        }
    }

    return mergedCart;
}

const areCartStatesEqual = (firstCart = {}, secondCart = {}) => {
    return JSON.stringify(firstCart || {}) === JSON.stringify(secondCart || {});
}

const updateCartState = (existingCart = {}, itemId, size, quantity) => {
    const nextCart = structuredClone(existingCart || {});

    if (!itemId || !size) {
        return nextCart;
    }

    if (quantity <= 0) {
        if (nextCart[itemId]) {
            delete nextCart[itemId][size];
            if (Object.keys(nextCart[itemId]).length === 0) {
                delete nextCart[itemId];
            }
        }
        return nextCart;
    }

    if (!nextCart[itemId]) {
        nextCart[itemId] = {};
    }

    nextCart[itemId][size] = quantity;
    return nextCart;
}

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => getStoredCartItems());
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(getStoredUserToken());

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        setCartItems(prevCartItems => {
            const currentQuantity = Number(prevCartItems?.[itemId]?.[size] || 0);
            return updateCartState(prevCartItems, itemId, size, currentQuantity + 1);
        });

        toast.success('Added to Cart!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                if (!response.data.success) {
                    throw new Error(response.data.message)
                }
                setCartItems(response.data.cartData || {})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                await getUserCart(token)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error("Something went wrong!")
                    console.log(error)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        const parsedQuantity = Number(quantity);
        if (Number.isNaN(parsedQuantity)) {
            return;
        }

        setCartItems(prevCartItems => updateCartState(prevCartItems, itemId, size, parsedQuantity));

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity: parsedQuantity }, { headers: { token } })
                if (!response.data.success) {
                    throw new Error(response.data.message)
                }
                setCartItems(response.data.cartData || {})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                await getUserCart(token)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) {
                continue;
            }
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const syncUserCart = async (currentToken, nextCartItems) => {
        const response = await axios.post(
            backendUrl + '/api/cart/sync',
            { cartData: nextCartItems },
            { headers: { token: currentToken } }
        )

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        const syncedCartItems = response.data.cartData || {};
        setCartItems(syncedCartItems)
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(syncedCartItems));
        return syncedCartItems;
    }

    const getUserCart = async (currentToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: currentToken } })
            if (response.data.success) {
                const serverCartItems = response.data.cartData || {};
                const mergedCartItems = mergeCartStates(serverCartItems, getStoredCartItems())

                if (areCartStatesEqual(serverCartItems, mergedCartItems)) {
                    setCartItems(serverCartItems)
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serverCartItems));
                    return serverCartItems;
                }

                return await syncUserCart(currentToken, mergedCartItems)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

        return {};
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        if (token) {
            localStorage.setItem(USER_TOKEN_STORAGE_KEY, token);
            getUserCart(token)
            return;
        }

        localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
        const legacyToken = localStorage.getItem(LEGACY_SHARED_TOKEN_KEY);
        const legacyPayload = parseTokenPayload(legacyToken);
        if (legacyPayload && typeof legacyPayload === 'object' && legacyPayload.id) {
            localStorage.removeItem(LEGACY_SHARED_TOKEN_KEY);
        }
        setCartItems({});
    }, [token])

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, setCartItems, getUserCart, syncUserCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
