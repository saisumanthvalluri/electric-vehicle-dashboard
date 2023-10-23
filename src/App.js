import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EvDashboard from "./Components/EvDashboard";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import "./App.css";

const App = () => (
    <Router>
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Navigate to="EV-Dashboard" />} />
            <Route path="EV-Dashboard" element={<EvDashboard />} />
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            {/* <Route path="/EV-Dashboard" element={<EvDashboard />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </Router>
);

export default App;
