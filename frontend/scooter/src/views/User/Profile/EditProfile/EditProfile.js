import ProfileEdit from "../../../../components/User/ProfileEdit";
import withAuth from "../../../../util/withAuth";

import "./style.css";
//import logo from "../../logo.png";

function EditProfile() {
    return (
        <div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    Edit profile
                </h1>
                <div className="flex flex-col gap-5">
                    <a
                    className="hover:bg-indigo-700 text-center p-5 bg-indigo-600 text-white rounded"
                    href="/user/profile"
                    >
                    Go back
                    </a>
                </div>
            </div>
            {/* Main panel */}
            <div className="w-5/6 p-3 flex flex-col items-center bg-stone-100">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans">
                    Edit profile!
                </h1>
                <ProfileEdit />
            </div>
        </div>
    );
}

export default withAuth(EditProfile);