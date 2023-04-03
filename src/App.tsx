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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { TypeUser } from "./types";

export const App = () => {
    const [logged, setLogged] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(true);
    const [user, setUser] = useState<TypeUser | null>(null);
    const auth = useAuth();

    useEffect(() => {
        setPending(true);
        auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const snapShot = await getDocs(collection(db, 'users'));
                snapShot.forEach(doc => {
					if(doc.id === userAuth.uid){
						setUser({
                            id: userAuth.uid,
                            avatar: doc.data().avatar, 
                            username: doc.data().username,
                            email: doc.data().email
                        });
					}
				}) 
                setLogged(true);
            } else {
                setLogged(false);
            }
            setPending(false);
        })

    }, [auth])

    return(
        <AuthContext.Provider value={{
            logged,
            pending,
            user,
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