import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

   
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.roles?.[0]?.name;

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/login");
    };

    return (
        <div className={styles.sidebar}>
            <ul className="nav flex-column">

               
                <li className="nav-item">
                    <div className={styles.logo}>
                        <i className="bi bi-app"></i>
                        Task Manager
                    </div>
                </li>

              
                <li className="nav-item">
                    <div className={styles.navlink} onClick={() => navigate("/dashboard")}>
                        <i className="bi bi-grid-fill"></i>
                        Dashboard
                    </div>
                </li>

          
                <li className="nav-item">
                    <div className={styles.navlink} onClick={() => navigate("/dashboard")}>
                        <i className="bi bi-calendar2"></i>
                        Tasks
                    </div>
                </li>

               
                {role === "ROLE_ADMIN" && (
                    <li className="nav-item">
                        <div className={styles.navlink} onClick={() => navigate("/createtask")}>
                            <i className="bi bi-calendar2-plus"></i>
                            Create Task
                        </div>
                    </li>
                )}

             
                {role === "ROLE_ADMIN" && (
                    <li className="nav-item">
                        <div className={styles.navlink} onClick={() => navigate("/users")}>
                            <i className="bi bi-people"></i>
                            Users
                        </div>
                    </li>
                )}

              
                <li className="nav-item">
                    <button className={styles.logout} onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        Logout
                    </button>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;