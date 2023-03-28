import { useState } from "react";
import { BsEnvelope, BsLock, BsPerson } from 'react-icons/bs';
import { useAuth } from "../hooks";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { makeSignError } from "../utils";

export const Signup = () => {
    const [signup, setSignup] = useState<{username: string, email: string, password: string}>({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const auth = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value.split(' ').join('')
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        try{
            const snapShot = await getDocs(collection(db, 'users'));
            let isUsernameValid = true;

            snapShot.forEach((doc) => {
                if(doc.data().username === signup.username){
                    isUsernameValid = false;
                }
            })

            if(isUsernameValid){
                const userCredentials = await createUserWithEmailAndPassword(auth, signup.email, signup.password)
                
                if(userCredentials){
                    await addDoc(collection(db, 'users'), {
                        username: signup.username,
                        email: signup.email,
                        avatar: ''
                    });
                } else {
                    throw Error;
                }

            } else {
                throw new Error('auth/display-name-used');
            }
        }
        catch(er: any){
            setError(makeSignError(er.code ?? er.message))
            setPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center">Create account</h1>
            <p  className="text-center">Please fill in the form to continue</p>
            {error && <p className="error">{error}</p>}
            <div className="form-floating mb-3">
                <BsPerson className='icon' />
                <input 
                    required
                    name='username'
                    value={signup.username}
                    onChange={handleInputChange}
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Username" />
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
                <BsEnvelope className='icon' />
                <input 
                    required
                    name='email'
                    value={signup.email}
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
                    required
                    name='password'
                    value={signup.password}
                    onChange={handleInputChange} 
                    type="password" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" />
                <label htmlFor="floatingInput">Password</label>
            </div>
            <button disabled={pending} className="sign-btn">Sign up</button>
        </form>
    )
}