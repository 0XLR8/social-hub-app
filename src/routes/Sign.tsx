import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";
import { AuthContext } from "../context/AuthContext";

export const Sign = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);
    const {logged, pending} = useContext(AuthContext);

    if(pending){
        return <Loader />
    }

    if(logged){
        return <Navigate to='/' />
    }
    
    return(
        <div className="sign p-4 mt-5">
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