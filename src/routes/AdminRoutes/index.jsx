import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.roles?.[0]?.name;

    if (!user || role !== "ROLE_ADMIN") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default AdminRoute;