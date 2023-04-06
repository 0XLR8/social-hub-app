import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sign } from "./routes/Sign";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Dashboard } from "./routes/Dashboard";
import { Profile } from "./routes/Profile";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks";
import { AuthContext } from "./context/AuthContext";
import { SideNav } from "./components/SideNav";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { AvatarUrlList, TypeUser } from "./types";
import { getAvatarRef } from './utils';
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export const App = () => {
    const [logged, setLogged] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(true);
    const [user, setUser] = useState<TypeUser | null>(null);
    const [avatarUrlList, setAvatarUrlList] = useState<AvatarUrlList>([]);
    const auth = useAuth();

    window.addEventListener('beforeunload', async () => {
        if(auth.currentUser){
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                online: false
            })
        }
    })

    useEffect(() => {
        setPending(true);
        auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const avatarList = await listAll(ref(getStorage(), 'user-icons'));
                const urlPromises = avatarList.items.map(item => 
                    getDownloadURL(getAvatarRef(item.name))
                )
                const avatarUrls = await Promise.all(urlPromises);
                const buildAvatar: AvatarUrlList = avatarUrls.map((item, index) => {
                    return {
                        id: index + 1,
                        name: avatarList.items[index].name,
                        url: item,
                        isActive: false
                    }
                })

                const snapShot = await getDocs(collection(db, 'users'));
                snapShot.forEach(doc => {
					if(doc.id === userAuth.uid){
						setUser({
                            id: userAuth.uid,
                            avatar: doc.data().avatar, 
                            username: doc.data().username,
                            email: doc.data().email,
                            online: doc.data().online
                        });
                        buildAvatar.forEach(item => {
                            if(doc.data().avatar === item.name){
                                item.isActive = true;
                            }
                        })
					}
				}) 
                setAvatarUrlList(buildAvatar);

                await updateDoc(doc(db, 'users', userAuth.uid), {
                    online: true
                })
                setLogged(true);
            } else {
                setLogged(false);
            }
            setPending(false);
        })

    }, [auth])

    console.log(avatarUrlList);

    return(
        <AuthContext.Provider value={{
            logged,
            pending,
            user,
            avatarUrlList,
            setAvatarUrlList,
            setUser
        }}>
            <Router>
                <div className="main d-flex flex-column">
                    <Header />
                    <div className='flex-grow-1 d-flex'>
                        {logged && <SideNav />}
                        <Routes>
                            <Route path='/sign' element={<Sign />} />
                            <Route element={<PrivateRoute />}>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='*' element={<Navigate to='/dashboard' />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}