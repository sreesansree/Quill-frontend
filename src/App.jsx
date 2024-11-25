import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/login" element={<Signin />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
