import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const FavoriteContext = createContext();



//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const FavoriteProvider = ({ children }) => {
    const [actionType, setActionType] = useState(null)
    const [favItems, setFavItems] = useState(
        JSON.parse(Cookies.get("fav-item") || "[]")
    );

    useEffect(() => {
        Cookies.set("fav-item", JSON.stringify(favItems));
    }, [favItems]);


    const onToggleFavorite = (product) => {
        const alreadyFavorite = favItems.find((item) => item._id === product._id);
        if(alreadyFavorite) {
            console.log('I already exist')
            const newFavItem = favItems.filter((item) => item._id !== product._id);
            setActionType('remove');
            setFavItems(newFavItem);
        } else {
            setFavItems([...favItems, { ...product }])
            setActionType('add');
        }

        // display alert here
    };


    let contextData = {
        onToggleFavorite,
        favItems,
        setFavItems
    }
    
    return <FavoriteContext.Provider value={contextData}>{children}</FavoriteContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFavoriteContext = () => useContext(FavoriteContext);