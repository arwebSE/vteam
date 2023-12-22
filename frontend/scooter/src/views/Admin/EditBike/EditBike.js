import { Link } from "react-router-dom";
import withAuth from "../../../util/withAuth";
import "./style.css";
import BikeEdit from "../../../components/Bike/BikeEdit";

// Test WithAuth import
import withAuthMock from "../../../test/Auth.mock";

function EditBike() {
    return (
        <div className="flex justify-center items-center w-full h-screen mt-10">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <Link
                            to="/admin/bike"
                            className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            Back
                        </Link>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600">
                            Edit Users
                        </h1>
                    </div>
                    <div>
                    <BikeEdit />
                    <p className="rounded p-3 w-3/4 text-center text-sm md:text-base lg:text-lg text-gray-700 mb-4 shadow">
                        Fill in the info that you want to save and press save
                        when done
                    </p>
                    </div>
                    <BikeEdit />
                </div>
        </div>
    </div>
    );
}

const exportedComponent = process.env.NODE_ENV === "test" ? withAuthMock(EditBike) : withAuth(EditBike);
export default exportedComponent
