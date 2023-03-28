import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sign } from "./routes/Sign";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Dashboard } from "./routes/Dashboard";
import { Profile } from "./routes/Profile";

export const App = () => {
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path='/sign' element={<Sign />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<Navigate to='/dashboard' />} />
                </Route>
            </Routes>
        </Router>
    )
}