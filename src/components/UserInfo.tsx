import { useEffect, useState } from "react";
import { TypeUser } from "../types";
import { getDownloadURL } from "firebase/storage";
import { Avatar } from "./Avatar";
import { getAvatarRef } from "../utils";

export const UserInfo = ({user}: {user: TypeUser}) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const {avatar} = user;

    useEffect(() => {
        if(avatar){
            const ref = getAvatarRef(avatar);
            const getUrl = async () => {
                try{
                    const url = await getDownloadURL(ref);
                    setAvatarUrl(url);
                    console.log(url);
                }
                catch(er){
                    console.log(er);
                }
            }
            getUrl();
        }
    }, [avatar])

    return(
        <div className="user-info d-flex align-items-center">
            {
                avatar ? <Avatar avatarUrl={avatarUrl} /> : <div className="no-avatar">{user!.username[0].toUpperCase()}</div>
            }
            <p className="ms-2">{user!.username}</p>
        </div>    
    )
}