import { useContext, useEffect, useState } from 'react';
import { OnlineUsersBar } from '../components/OnlineUsersBar';
import { AuthContext } from '../context/AuthContext';
import { collection, onSnapshot } from "firebase/firestore";
import { Loader } from '../components/Loader';
import { db } from '../firebaseConfig';
import { TypeChats, TypeUser } from '../types';
import { ChatSection } from '../components/ChatSection';
import { ChatContext } from '../context/ChatContext';

export const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState<TypeUser[]>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [chatList, setChatList] = useState<TypeChats[]>([]);
    
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
        });

        onSnapshot(collection(db, 'chats'), (docs) => {
            let newChats: TypeChats[] = chatList.length ? chatList : [];
            if(!docs.metadata.hasPendingWrites){
                newChats = [];
                docs.forEach(doc => {
                    newChats.push({
                        id: doc.id,
                        userId: doc.data().userId,
                        content: doc.data().content,
                        timeStamp: doc.data().timeStamp
                    })
                })
                newChats.sort((x, y) => x.timeStamp.seconds - y.timeStamp.seconds);
            }

            setChatList(newChats);
            setPending(false);
        })
    }, [])

    if(pending){
        return <Loader />
    }

    return (
        <ChatContext.Provider value={{
            chatList
        }}>
            <div className='d-flex flex-grow-1'>
                <ChatSection />
                <OnlineUsersBar onlineUsers={onlineUsers} />
            </div>
        </ChatContext.Provider>
    )
}