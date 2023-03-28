import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsEnvelope, BsLock } from 'react-icons/bs';
import { useAuth } from "../hooks";
import { makeSignError } from "../utils";

export const Signin = () => {
    const [login, setLogin] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);

    const auth = useAuth();
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value.split(' ').join('')
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        try{
            await signInWithEmailAndPassword(auth, login.email, login.password)
        }
        catch(er: any){
            setError(makeSignError(er.code))
            setPending(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1 className="text-center">Welcome back!</h1>
            <p  className="text-center">Please sign in to your account</p>
            {error && <p className="error">{error}</p>}
            <div className="form-floating mb-3">
                <BsEnvelope className='icon' />
                <input 
                    required
                    name='email'
                    value={login.email}
                    onChange={handleInputChange}
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4">
                <BsLock className='icon' />
                <input 
                    name='password'
                    value={login.password}
                    onChange={handleInputChange}
                    required 
                    type="password" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Password</label>
            </div>
            <button disabled={pending} className="sign-btn">Sign in</button>
        </form>
    )
}