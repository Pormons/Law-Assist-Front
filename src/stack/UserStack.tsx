import { Route, Routes } from "react-router-dom";
import Chats from "../pages/User/Chats";
import Lawyers from "../pages/User/Lawyers";
import Settings from "../pages/User/Settings";
import FAQ from "../pages/User/FAQ";
import Lawyer from "../pages/User/Lawyer";
import UserBar from "../components/UserBar";
import LawyerChat from "../pages/User/LawyerChat";

export default function UserStack() {
  return (
    <div>
      <UserBar />
      <div className="sm:ml-64">
          <div className="flex md:flex-grow">
            <Routes>
              <Route path="/Chats/*" element={<Chats />} />
              <Route path="/Lawyers" element={<Lawyers />} />
              <Route path="/Lawyers/:id" element={<Lawyer />} />
              <Route path="/Lawyers/:id/Chats" element={<LawyerChat />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/FAQ" element={<FAQ />} />
            </Routes>
          </div>
      </div>
    </div>
  );
}
