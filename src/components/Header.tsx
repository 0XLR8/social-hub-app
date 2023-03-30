import { BiLogOutCircle } from 'react-icons/bi';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks';
import { useContext } from 'react';

export const Header = () => {
    const auth = useAuth();
    const {logged} = useContext(AuthContext);

    const handleLogout = () => {
        auth.signOut();
    }

    return(
        <div className="nav-bar d-flex align-items-center justify-content-between py-4 px-5">
            <h1>Social<span>Hub</span></h1>
            {logged && <button onClick={handleLogout} className="nav-btn d-flex align-items-center"><BiLogOutCircle className='me-2'/> Logout</button>}
        </div>
    )
}