import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthContext } from "./AuthContext";
import { useDataContext } from "./DataContext";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const WishesContext = createContext();


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const WishesProvider = ({ children }) => {
    const [wishItems, setWsihtems] = useState(
        JSON.parse(Cookies.get("wish-items") || "[]")
    );

    const { user, token } = useAuthContext();
    const { getProtectedRequest } = useDataContext();

    async function getWishes() {
        const data = await getProtectedRequest('wishitems');
        console.log(data)

        setWsihtems(data?.data?.wishes);
    }

    useEffect(function() {
        if(user && token) {
            getWishes();
        } else {
            setWsihtems([])
        }
    }, [user, token]);


    useEffect(function() {
        Cookies.set("wish-item", JSON.stringify(wishItems));
    }, [wishItems]);


    let contextData = {
        wishItems,
        setWsihtems,
    }


    return <WishesContext.Provider value={contextData}>{children}</WishesContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useWishesContext = () => useContext(WishesContext);