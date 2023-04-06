import { useContext } from "react";
import { TypeUser } from "../types";
import { Avatar } from "./Avatar";
import { AuthContext } from "../context/AuthContext";

export const UserInfo = ({user}: {user: TypeUser}) => {
    const {avatarUrlList} = useContext(AuthContext);
    const {avatar} = user;
    const targetAvatar = avatarUrlList.find(item => item.name === avatar)

    return(
        <div className={`user-info d-flex align-items-center ${user.online ? '' : 'offline'}`}>
            {
                avatar ? <Avatar avatarUrl={targetAvatar!.url} /> : <div className="no-avatar">{user!.username[0].toUpperCase()}</div>
            }
            <p className="ms-2">{user!.username}</p>
        </div>    
    )
}