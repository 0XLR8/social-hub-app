import {getAuth} from "firebase/auth";
import {app} from './firebaseConfig';

export const useAuth = () => {
    const auth = getAuth(app)

    return auth;
}