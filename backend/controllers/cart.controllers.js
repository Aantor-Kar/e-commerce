import userModel from './../models/userModel.js';

const getNextCartData = (existingCart = {}, itemId, size, quantity) => {
    const nextCartData = structuredClone(existingCart || {});

    if (!itemId || !size) {
        return nextCartData;
    }

    if (quantity <= 0) {
        if (nextCartData[itemId]) {
            delete nextCartData[itemId][size];
            if (Object.keys(nextCartData[itemId]).length === 0) {
                delete nextCartData[itemId];
            }
        }
        return nextCartData;
    }

    if (!nextCartData[itemId]) {
        nextCartData[itemId] = {};
    }

    nextCartData[itemId][size] = quantity;
    return nextCartData;
}

const normalizeCartData = (cartData = {}) => {
    const nextCartData = {};

    for (const itemId in cartData) {
        for (const size in cartData[itemId]) {
            const quantity = Number(cartData[itemId][size] || 0);
            if (quantity <= 0) {
                continue;
            }

            if (!nextCartData[itemId]) {
                nextCartData[itemId] = {};
            }

            nextCartData[itemId][size] = quantity;
        }
    }

    return nextCartData;
}

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        const currentQuantity = Number(userData.cartData?.[itemId]?.[size] || 0)
        const cartData = getNextCartData(userData.cartData, itemId, size, currentQuantity + 1)

        await userModel.findByIdAndUpdate(userId, { $set: { cartData } })
        res.json({ success: true, message: "Added To Cart!", cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        const parsedQuantity = Number(quantity)
        if (Number.isNaN(parsedQuantity)) {
            return res.json({ success: false, message: "Invalid quantity" })
        }

        const cartData = getNextCartData(userData.cartData, itemId, size, parsedQuantity)
        await userModel.findByIdAndUpdate(userId, { $set: { cartData } })

        res.json({ success: true, message: "Cart Updated!", cartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Sync full cart
const syncCart = async (req, res) => {
    try {
        const { userId, cartData } = req.body;
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        const normalizedCartData = normalizeCartData(cartData)
        await userModel.findByIdAndUpdate(userId, { $set: { cartData: normalizedCartData } })

        res.json({ success: true, message: "Cart Synced!", cartData: normalizedCartData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get cart info
const getCartInfo = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({ success: true, cartData: userData.cartData || {} })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, syncCart, getCartInfo }
