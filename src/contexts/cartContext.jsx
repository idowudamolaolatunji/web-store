import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { truncateString } from "../utils/helper";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const CartContext = createContext();



//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(
        JSON.parse(Cookies.get("cart") || "[]")
    );

    const [totalPrice, setTotalPrice] = useState(
        JSON.parse(Cookies.get("totalPrice") || 0)
    );

    const [totalQuantities, setTotalQuantities] = useState(
        JSON.parse(Cookies.get("totalQuantities") || 0)
    );

    // const [qty, setQty] = useState(1);

    useEffect(() => {
        Cookies.set("cart", JSON.stringify(cartItems));
        Cookies.set("totalPrice", JSON.stringify(totalPrice));
        Cookies.set("totalQuantities", JSON.stringify(totalQuantities));
    }, [cartItems, totalQuantities, totalPrice]);

    let foundProduct;

    const onAdd = (product, quantity) => {
        //check if the product is already inside the cart
        const checkProductInCart = cartItems.find((item) => item.id === product.id);

        // adding to the price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.discountedPrice * quantity);

        //adding to the quantity
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        selectedQuantity: cartProduct.selectedQuantity + quantity,
                    };
                } else {
                    return {
                        ...cartProduct,
                    };
                }
            });

            setCartItems(updatedCartItems);
        } else {
            product.selectedQuantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        // toast.success(`${truncateString(product.name, 20)} added to the cart.`);
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);

        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setCartItems(newCartItems);

        setTotalPrice(
            (prevTotalPrice) =>
                prevTotalPrice - foundProduct.discountedPrice * foundProduct.selectedQuantity
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities - foundProduct.selectedQuantity
        );
    };



    const toggleCartItemQuanitity = (id, size, value) => {

        foundProduct = cartItems.find((item) => item.id === id && item.size === size);

        if (value === "inc") {
            const newFoundProduct = {
                ...foundProduct,
                quantity: foundProduct.quantity + 1,
            };
            const newArray = cartItems.map((obj) =>
                obj.id === id && obj.size === size ? newFoundProduct : obj
            );
            setCartItems(newArray);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                const newFoundProduct = {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1,
                };
                const newArray = cartItems.map((obj) =>
                    obj.id === id && obj.size === size ? newFoundProduct : obj
                );
                setCartItems(newArray);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    };


    // const incQty = () => {
    //     setQty((prevQty) => prevQty + 1);
    // };

    // const decQty = () => {
    //     setQty((prevQty) => {
    //         if (prevQty - 1 < 1) return 1;

    //         return prevQty - 1;
    //     });
    // };



    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }


    let contextData = {
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        // qty,
        // incQty,
        // decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        clearCart,
    }
    
    return <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
};


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useCartContext = () => useContext(CartContext);