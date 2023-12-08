import { Link } from "react-router-dom";
import withAuth from "../../../util/withAuth";
import "./style.css";
import UserEdit from "../../../components/UserEdit";

function EditUser() {
    return (
        <div>
            <div className="flex flex-col items-center h-1.6 pt-16">
                <div className="w-11/12 flex flex-row items-center p-1 gap-10">
                    <Link
                        to="/admin/user"
                        className="cursor-pointer rounded hover:bg-slate-100 text-lg p-2 bg-gray-400"
                    >
                        Back
                    </Link>
                    <h1 className="text-2xl font-bold ">Edit Users</h1>
                </div>
                <p className="rounded p-2 w-11/12 m-2 bg-gray-400 text-center text-sm text-gray-600">
                    Fill the info that you want to save and press save when done
                </p>
                <UserEdit />
            </div>
        </div>
    );
}

export default EditUser;
