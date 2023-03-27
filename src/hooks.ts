import {getAuth} from "firebase/auth";
import {app} from '../firebaseConfig.js';

export const useAuth = () => {
    const auth = getAuth(app)

    return auth;
}