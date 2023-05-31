import { createContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import Cookies from 'js-cookie';

export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Cookies.set('loggedin', 'true');
            }
            else {
                Cookies.remove('loggedin');
            }
            setAuthUser(user);
        });
        return () => unsubscribe();
    }, [authUser?.uid]);

    return (
        <AuthContext.Provider value={{ authUser }}>
            {children}
        </AuthContext.Provider>
    );
};
