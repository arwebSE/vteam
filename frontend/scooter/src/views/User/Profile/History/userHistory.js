import withAuth from "../../../../util/withAuth";
import RentHistory from "../../../../components/User/UserRentHistory";

import "./style.css";
//import logo from "../../logo.png";

function UserHistory() {
    return (
        <div className="flex justify-center items-center w-full mt-20">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                    </div>
                </div>
                <RentHistory />
            </div>
        </div>
    );
}

export default withAuth(UserHistory);
