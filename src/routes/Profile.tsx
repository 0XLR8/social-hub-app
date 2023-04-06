import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from 'react';
import { ProfileAvatar } from "../components/ProfileAvatar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const Profile = () => {
    const {user, avatarUrlList, setAvatarUrlList, setUser} = useContext(AuthContext);
    const {username, email} = user!;
    const [profileUsername, setProfileUsername] = useState<string>(username);
    const [profileEmail, setProfileUsernameEmail] = useState<string>(email);

    const handleAvatarSelect = (id: number) => {
        const newAvatarList = avatarUrlList.map(item => {
            if(item.id === id){
                item.isActive = !item.isActive;
            } else {
                item.isActive = false;
            }
            return item;
        })
        setAvatarUrlList(newAvatarList);
    }

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const avatarIndex = avatarUrlList.findIndex(item => item.isActive);
            const avatarName = avatarIndex < 0 ? null : avatarUrlList[avatarIndex].name;

            await updateDoc(doc(db, 'users', user!.id), {
                username: profileUsername,
                email: profileEmail,
                avatar: avatarName
            }).then(res => setUser({
                username: profileUsername,
                avatar: avatarName,
                email: profileEmail,
                id: user!.id,
                online: user!.online
            }))
        }
        catch(er){
            console.log(er);
        }
    }

    return(
        <form className="profile flex-grow-1" onSubmit={handleProfileUpdate}>
            <div className="item">
                <label>Username </label>
                <input type='text' value={profileUsername} onChange={(e) => setProfileUsername(e.target.value)} />
            </div>
            <div className="item">
                <label>Email </label>
                <input type='text' value={profileEmail} onChange={(e) => setProfileUsernameEmail(e.target.value)} />
            </div>
            <div className="item">
                <label>Avatar </label>
                <div className="avatar-list d-flex">
                    {avatarUrlList.length && avatarUrlList.map(item => <ProfileAvatar key={item.id} avatar={item} handleAvatarSelect={handleAvatarSelect} />)}
                </div>
            </div>
            <button className="profile-btn d-block ms-auto mt-5">Save</button>
        </form>
    )
}