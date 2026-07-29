import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashbroad from "./pages/Dashbroad";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import TaskManage from "./pages/TaskManage";
import UserMange from "./pages/UserMange";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<Dashbroad />} />
            <Route path="user" element={<UserMange />} />
            <Route path="task" element={<TaskManage />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
