import withAuth from "../../../util/withAuth";
import BikeSelected from "../../../components/Bike/bikeSelectedUser";

import "./style.css";

function RentBike() {
    return (
        <div className="flex justify-center items-center w-full h-screen mt-10">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                    </div>
                </div>
                <BikeSelected />
            </div>
        </div>
    );
}

export default withAuth(RentBike);
