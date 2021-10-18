import { getAuth, signInWithPopup, GoogleAuthProvider,signOut, onAuthStateChanged} from "firebase/auth";
import React, { useEffect, useState } from 'react';
import initializeAuthentication from "../Pages/Login/Firebase/Firebase.init";

initializeAuthentication();

const useFirebase =()=>{
    const [user,setUser]=useState({});
    const auth=getAuth();
    const [isLoading, setIsLoading]=useState(true);


    const signInUsingGoogle=()=>{
        setIsLoading(true);
        const googleProvider=new GoogleAuthProvider();
        signInWithPopup(auth,googleProvider)
        .then(result=>{
            console.log(result.user);
            setUser(result.user)
        })
        .finally(()=>{
            setIsLoading(false);
        })

    }
    // observe 
    useEffect(()=>{
       const unsubscribed= onAuthStateChanged(auth,user=>{
            if(user)
            {
                setUser(user);
            }
            else
            {
                setUser({});
            }
            setIsLoading(false)
        });
        return ()=>unsubscribed

    },[])



    const logOut=()=>{
        setIsLoading(true);
        signOut(auth)
        .then(()=>{})
        .then(()=>{setIsLoading(false)})
    }


    return {
        user,
        signInUsingGoogle,
        logOut,
        isLoading,
    }
}

export default useFirebase;