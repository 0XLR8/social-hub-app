import { useState } from "react";
import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";

export const Sign = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);

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