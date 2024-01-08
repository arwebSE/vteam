import ProfileEdit from "../../../../components/User/ProfileEdit";
import withAuth from "../../../../util/withAuth";

import "./style.css";
//import logo from "../../logo.png";

function EditProfile() {
    return (

        <div className="flex justify-center items-center w-full h-screen">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                    </div>
                </div>
                <ProfileEdit />
            </div>
        </div>
    );
}

export default withAuth(EditProfile);