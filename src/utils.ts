import { getStorage, ref } from "firebase/storage";

export const makeSignError = (code: string) => {
    const index = code.indexOf('/');
    const cleanCode = code.slice(index + 1);

    console.log(cleanCode);

    switch(cleanCode){
        case 'email-already-in-use': 
            return 'The email address is already in use by another account.';
        case 'wrong-password': 
            return 'The password is invalid.';
        case 'invalid-email': 
            return "The email address is badly formatted.";
        case 'user-not-found':
            return 'There is no user record corresponding to this email.';
        case 'weak-password':
            return 'The password must be 6 characters long or more.';
        case 'display-name-used':
            return 'Display name is already used.';
        default:
            return 'An error has occured, please try again later';
    }
}

export const getAvatarRef = (avatar: string) => ref(getStorage(), `user-icons/${avatar}`);