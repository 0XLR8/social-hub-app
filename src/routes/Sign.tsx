import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";
import { AuthContext } from "../context/AuthContext";

export const Sign = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);
    const {logged, pending} = useContext(AuthContext);

    if(pending){
        return <h1 style={{color: 'white'}}>Loading...</h1>
    }

    if(logged){
        return <Navigate to='/' />
    }
    
    return(
        <div className="sign p-4">
            {isSignIn ? <Signin /> : <Signup />}
            <p className="switch-text text-center mb-0 mt-4">
                {isSignIn ? "Don't have an account?" : 'Already a member?'}
                {' '}
                <span className="switch-btn" onClick={() => setIsSignIn(!isSignIn)}>
                    {isSignIn ? 'Sign up' : 'Sign in'}
                </span>
            </p>
        </div>
    )
}