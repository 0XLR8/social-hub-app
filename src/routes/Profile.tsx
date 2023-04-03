import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from 'react';
import { getAvatarRef } from "../utils";
import { Loader } from "../components/Loader";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const Profile = () => {
    const {user, setUser} = useContext(AuthContext);
    const {username, email, avatar} = user!;
    const [avatarList, setAvatarList] = useState<{
        id: number,
        url: string,
        isActive: boolean
    }[]>([]);
    const [userAvatarNames, setUserAvatarNames] = useState<string[]>([])
    const [profileUsername, setProfileUsername] = useState<string>(username);
    const [profileEmail, setProfileUsernameEmail] = useState<string>(email);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        const avatarsRef = ref(getStorage(), 'user-icons');

        const getAvatarList = async () => {
            const res = await listAll(avatarsRef);
            setUserAvatarNames(res.items.map(item => item.name));
            const urlPromises = res.items.map(item => 
                getDownloadURL(getAvatarRef(item.name))
            )
            return Promise.all(urlPromises);
        }

        const loadImages = async () => {
            const urls = await getAvatarList();
            const buildAvatar = urls.map((item, index) => {
                return {
                    id: index + 1,
                    url: item,
                    isActive: avatar && item.includes(avatar) ? true : false
                }
            })
            setAvatarList(buildAvatar)
            setPending(false);
        }

        loadImages();
    }, []);

    const handleAvatarSelect = (id: number) => {
        const newAvatarList = avatarList.map(item => {
            if(item.id === id){
                item.isActive = !item.isActive;
            } else {
                item.isActive = false;
            }
            return item;
        })
        setAvatarList(newAvatarList);
    }

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const avatarIndex = avatarList.findIndex(item => item.isActive);
            const avatarName = avatarIndex < 0 ? null : userAvatarNames[avatarIndex];

            await updateDoc(doc(db, 'users', user!.id), {
                username: profileUsername,
                email: profileEmail,
                avatar: avatarName
            }).then(res => setUser({
                username: profileUsername,
                avatar: avatarName,
                email: profileEmail,
                id: user!.id
            }))
        }
        catch(er){
            console.log(er);
        }
    }

    if(pending){
        return <Loader />
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
                    {avatarList.length && avatarList.map(item => <ProfileAvatar key={item.id} avatar={item} handleAvatarSelect={handleAvatarSelect} />)}
                </div>
            </div>
            <button className="profile-btn d-block ms-auto mt-5">Save</button>
        </form>
    )
}