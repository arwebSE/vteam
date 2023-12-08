import { Link } from "react-router-dom";
import withAuth from "../../../util/withAuth";
import "./style.css";
import UserEdit from "../../../components/UserEdit";

function EditUser() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <Link
                            to="/admin/user"
                            className="cursor-pointer rounded hover:bg-blue-500 text-lg p-3 bg-blue-400 text-white shadow hover:shadow-md transition duration-300 ease-in-out"
                        >
                            Back
                        </Link>
                        <h1 className="text-2xl font-bold ">Edit Users</h1>
                    </div>
                    <p className="rounded p-3 w-3/4 bg-blue-200 text-center text-sm text-gray-800 mb-4 shadow">
                        Fill in the info that you want to save and press save
                        when done
                    </p>
                </div>
                <UserEdit />
            </div>
        </div>
    );
}

export default withAuth(EditUser);
