import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Lawyers from "../pages/Admin/Lawyers"
import Users from "../pages/Admin/Users";
import Settings from "../pages/Admin/Settings";
import AdminBar from "../components/AdminBar";


export default function AdminStack()
{
    return (
        <div>
        <AdminBar />
        <div className="ml-[64px] md:ml-64">
            <div className="flex md:flex-grow">
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Lawyers" element={<Lawyers />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Settings" element={<Settings />} />
              </Routes>
            </div>
        </div>
      </div>
    )
}