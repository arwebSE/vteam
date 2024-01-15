import AddMoneyToUser from "../../../../components/User/AddMoneyToUser";
import withAuth from "../../../../util/withAuth";

import "./style.css";

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