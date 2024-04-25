import React, { createContext, useEffect, useState, useContext } from 'react';
import { app } from '../config/firebase';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth';

// Create a context for the authentication provider
export const AuthContext = createContext<any>(null);

// Create the authentication provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};
// Sign in function


// Custom hook to access the currentUser data
export const useAuth = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const currentUser = useContext(AuthContext);
    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user)
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };
    const logOut=async ()=>{
        try {
            const task=await signOut(auth);
            window.location.href='/'
            return task
        } catch (error) {
            console.log(error)
            return error
        }
    }
    const signInwithGoogle=async()=>{
        try {
            auth.languageCode = 'it';

            const task=signInWithPopup(auth,provider)
            
        } catch (error) {
            console.log(error)
            return error
            
        }

    }
    return {
        currentUser,signIn,logOut,signInwithGoogle
    }
};