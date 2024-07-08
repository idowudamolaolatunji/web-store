import { createContext, useContext } from "react";
import { useAuthContext } from "./AuthContext";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const DataContext = createContext();
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const DataProvider = ({ children }) => {
    const { token, shouldKick } = useAuthContext();

    // DELETE REQUEST
    async function deleteRequest(route, id) {
        const url = `${import.meta.env.VITE_SERVER_URL}/${route}/${id}`;
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 || res.status === 403) {
                shouldKick(res);
                throw new Error('Invalid Token, Re-login')
            }

            if(res.status === 429) {
                window.location.href = '/error-too-many-request';
            }

            if (!res.ok) {
                throw new Error('Internet Error')
            }
            const data = await res.json();
            if (data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;

        } catch (err) {
            return null
        }
    };

    // PATCH REQUEST
    async function patchRequest(route, id, body) {
        const url = `${import.meta.env.VITE_SERVER_URL}/${route}/${id}`;
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (res.status === 401 || res.status === 403) {
                shouldKick(res);
                throw new Error('Invalid Token, Re-login')
            }

            if(res.status === 429) {
                window.location.href = '/error-too-many-request';
            }

            if (!res.ok) {
                throw new Error('Internet Error')
            }
            const data = await res.json();
            if (data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;

        } catch (err) {
            return err
        }
    };

    // GET REQUEST
    async function getRequest(route, id=null) {
        const url = `${import.meta.env.VITE_SERVER_URL}/${route}${id ? `/${id}` : ''}`;
        console.log(url)
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if(res.status === 429) {
                window.location.href = '/error-too-many-request';
            }

            if (!res.ok) {
                throw new Error('Internet Error')
            }
            const data = await res.json();
            if (data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;
        } catch (err) {
            return err
        }
    };

    // GET PROTECTED REQUEST
    async function getProtectedRequest(route, id = null) {
        const url = `${import.meta.env.VITE_SERVER_URL}/${route}${id ? `/${id}` : ''}`;
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 || res.status === 403) {
                shouldKick(res);
                throw new Error('Invalid Token, Re-login')
            }

            if(res.status === 429) {
                window.location.href = '/error-too-many-request';
            }

            if (!res.ok) {
                throw new Error('Internet Error');
            }
            const data = await res.json();
            if (data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;

        } catch (err) {
            return err
        }
    };

    // POST REQUEST
    async function postRequest(route, body) {
        const url = `${import.meta.env.VITE_SERVER_URL}/${route}`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            });

            if (res.status === 401 || res.status === 403) {
                shouldKick(res);
                throw new Error('Invalid Token, Re-login')
            }

            if(res.status === 429) {
                window.location.href = '/error-too-many-request';
            }

            if (!res.ok) {
                throw new Error('Internet Error')
            }
            const data = await res.json();
            if (data?.status !== 'success') throw new Error(data?.message);

            import.meta.env.VITE_WORK_ENV === 'development' && console.log(res, data);
            return data;

        } catch (err) {
            return err
        }
    };

    // CREATE CONTEXT DATA
    let contextData = {
        deleteRequest,
        patchRequest,
        getRequest,
        getProtectedRequest,
        postRequest,
    };


    return (
        <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
    );
};


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);