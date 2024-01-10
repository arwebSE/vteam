import AddMoneyToUser from "../../../../components/User/AddMoneyToUser";
import withAuth from "../../../../util/withAuth";

import "./style.css";
//import logo from "../../logo.png";

function ProfileAddMoney() {
    return (
        <div className="flex justify-center items-center w-full mt-20">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                    </div>
                </div>
                <AddMoneyToUser />
            </div>
        </div>
    );
}

export default withAuth(ProfileAddMoney);

<div className="flex mt-20">
            {/* Side Panel*/}
            <div className="w-1/6 p-4 bg-white h-screen">
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    Add money
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
                    Add money to profile!
                </h1>
                <AddMoneyToUser />
            </div>
        </div>