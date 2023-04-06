export type TypeUser = {
    id: string;
    avatar: string | null;
    email: string;
    username: string;
    online: boolean;
}

export type AvatarUrlList = {
    id: number;
    name: string;
    url: string;
    isActive: boolean;
}[]

export type TypeAuthContext = {
    logged: boolean;
    pending: boolean;
    user: TypeUser | null;
    avatarUrlList: AvatarUrlList;
    setAvatarUrlList: (avatarUrlList: AvatarUrlList) => void;
    setUser: (user: TypeUser | null) => void;
}