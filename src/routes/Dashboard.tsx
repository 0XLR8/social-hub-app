import { useContext, useEffect, useState } from 'react';
import { OnlineUsersBar } from '../components/OnlineUsersBar';
import { AuthContext } from '../context/AuthContext';
import { collection, onSnapshot } from "firebase/firestore";
import { Loader } from '../components/Loader';
import { db } from '../firebaseConfig';
import { TypeUser } from '../types';

export const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState<TypeUser[]>([]);
    const [pending, setPending] = useState(true);
    
    useEffect(() => {
        onSnapshot(collection(db, "users"), (docs) => {
            const newUsers: TypeUser[] = [];
            docs.forEach(doc => {
                if(user!.id !== doc.id){
                    newUsers.push({
                        id: doc.id,
                        email: doc.data().email,
                        username: doc.data().username,
                        avatar: doc.data().avatar,
                        online: doc.data().online
                    });
                }
            });
            newUsers.sort((x,y) => Number(y.online) - Number(x.online))
            setOnlineUsers(newUsers);
            setPending(false);
        });
    }, [])

    
    console.log(true);

    if(pending){
        return <Loader />
    }

    return (
        <div className='d-flex flex-grow-1'>
            <div className='flex-grow-1'>hello</div>
            <OnlineUsersBar onlineUsers={onlineUsers} />
        </div>
    )
}