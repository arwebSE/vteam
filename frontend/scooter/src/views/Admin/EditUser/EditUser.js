import withAuth from "../../../util/withAuth";
import "./style.css";
import UserEdit from "../../../components/UserEdit";

function EditUser() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4"></div>
                </div>
                <UserEdit />
            </div>
        </div>
    );
}

export default withAuth(EditUser);
