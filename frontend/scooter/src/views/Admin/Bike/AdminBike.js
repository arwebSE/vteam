import withAuth from "../../../util/withAuth";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../../logo.png";
import MarkMap from "../../../components/Bike/markLocationMap";
function AdminBike() {

    return (
        <div className="flex flex-col w-full mt-12 pt-10">
            <Link
                to="/admin"
                className="m-2 w-fit cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
                Back
            </Link>
            <MarkMap />
        </div>
    );
}

export default AdminBike;