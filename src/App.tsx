import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UserStack from "./stack/UserStack";
import AdminStack from "./stack/AdminStack";
import { RefreshProvider } from "./context/Refresh";

function App() {

  return (
    <>
    <RefreshProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="/Home/*" element={<UserStack />} />
          <Route path="/Admin/*" element={<AdminStack />} />
        </Routes>
      </Router>
    </RefreshProvider>
    </>
  );
}

export default App;
