import Sidebar from "../../components/Sidebar";
import Tasklist from "../../components/TaskList";
import Topbar from "../../components/Topbar";

const DashBoard = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Topbar />
                <div className="p-3">
                    <Tasklist />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;