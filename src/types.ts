export type TypeUser = {
    id: string;
    avatar: string | null;
    email: string;
    username: string;
}

export type TypeAuthContext = {
    logged: boolean;
    pending: boolean;
    user: TypeUser | null;
    setUser: (user: TypeUser | null) => void;
}