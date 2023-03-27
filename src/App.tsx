import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sign } from "./routes/Sign";

export const App = () => {
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path='/sign' element={<Sign />} />
            </Routes>
        </Router>
    )
}