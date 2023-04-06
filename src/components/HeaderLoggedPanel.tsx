import { BiLogOutCircle } from 'react-icons/bi';
import { useAuth } from '../hooks';
import { UserInfo } from './UserInfo';
import { AuthContext } from "../context/AuthContext"
import { useContext } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export const HeaderLoggedPanel = () => {
    const auth = useAuth();
    const {user} = useContext(AuthContext)
    
    const handleLogout = async () => {
        await updateDoc(doc(db, 'users', user!.id), {
            online: false
        })
        auth.signOut();
    }

    return(
        <div className='d-flex align-items-center'>
            {user && <UserInfo user={user} />}
            <button onClick={handleLogout} className="ms-4 nav-btn d-flex align-items-center"><BiLogOutCircle className='me-2'/> Logout</button>
        </div>
    )
}