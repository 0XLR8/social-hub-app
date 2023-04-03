import { Avatar } from "./Avatar";

type TypeProfileAvatar = {
    avatar: {
        id: number;
        url: string;
        isActive: boolean;
    };
    handleAvatarSelect: (id: number) => void; 
}

export const ProfileAvatar = ({avatar, handleAvatarSelect}: TypeProfileAvatar) => {

    return(
        <div className={`profile-avatar ${avatar.isActive ? 'active' : ''}`} onClick={() => handleAvatarSelect(avatar.id)}>
            <Avatar avatarUrl={avatar.url} />
        </div>
    )
}