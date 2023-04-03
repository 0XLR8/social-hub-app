import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { HeaderLoggedPanel } from './HeaderLoggedPanel';

export const Header = () => {
    const {logged, pending} = useContext(AuthContext);

    return(
        <div className="header d-flex align-items-center justify-content-between py-4 px-5">
            <h1>Social<span>Hub</span></h1>
            {logged && !pending && <HeaderLoggedPanel />}
        </div>
    )
}