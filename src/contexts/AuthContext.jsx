import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const AuthContext = createContext();
export default AuthContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(function() {
		// Cookies.get("storeuser") ? JSON.parse(Cookies.get("storeuser")) : null
		Cookies.get("storeuser") ? Cookies.get("storeuser") : null
    });
	const [token, setToken] = useState(Cookies.get("usertoken") || null);

    // HANDLE USER AND TOKEN CHANGE
	function handleChange(user, token ) {
		setUser(user);
		setToken(token);
	};

    // HANDLE USER CHANGE
	function handleUser(user) {
		setUser(user);
	};

    // USER LOGOUT
	async function logout(){
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			if(!res.ok) throw new Error('Something went wrong!');
			const data = await res.json();

			if(data.status !== 'success') throw new Error(data.message);
			Cookies.remove("storeuser");
			Cookies.remove("usertoken");
		} catch (err) {
			console.log(err.message)
			Cookies.remove("storeuser");
			Cookies.remove("usertoken");
		}
	};

    // USER LOGIN
    async function userLogin(email, password) {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
                body: JSON.stringify({ email, password }),
			});

            if(!res.ok) throw new Error('Unable to login');
            const data = await res.json();
            if(!data?.status !== 'success') throw new Error(data?.message);
            handleChange(data?.data?.user, data?.token)
            return data;
        } catch(err) {
            return err;
        }
    }

    // USER SIGNUP
    async function userSignup(body) {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
                body: JSON.stringify(body),
			});

            if(!res.ok) throw new Error('Unable to signup, Check internet connection');
            const data = await res.json();
            if(!data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;
        } catch(err) {
            return err;
        }
    }

    // SHOULDKICK
	function shouldKick(responseErr) {
		if (responseErr.status === 401 || responseErr.status === 403) {
		  Cookies.remove("storeuser");
		  Cookies.remove("usertoken");
		  window.location.href = "/login";
		}
	};


	useEffect(() => {
		Cookies.set("storeuser", JSON.stringify(user), { expires: 30 });
		Cookies.set("usertoken", token, { expires: 30 });
	}, [user, token]);


    // CREATE CONTEXT DATA
	let contextData = {
		user,
		token,
		handleChange,
		handleUser,
		logout,
        userLogin,
        userSignup,
		shouldKick,
	};

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAuthContext = () => useContext(AuthContext);

