import { useState } from "react";
import { BsEnvelope, BsLock, BsPerson } from 'react-icons/bs';

export const Signup = () => {
    const [signup, setSignup] = useState<{username: string, email: string, password: string}>({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value.split(' ').join('')
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-center">Create account</h1>
            <p  className="text-center">Please fill in the form to continue</p>
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