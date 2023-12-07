import "./style.css";
import boi from "../../boi.png";
import Map from "../../components/Map";
import User from "../../components/User";
import Bikes from "../../components/Bikes";

function Login() {

    return (
        <div>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-4xl pl-10 text-center font-bold text-gray-900 mb-6">Scooter Simulator</h1>
                <img src={boi} alt="boi" className="scooter mx-auto h-16 md:h-20 lg:h-24 w-auto mb-6" />
            </div>
            <div className="flex p-3 flex-col items-center justify-center bg-stone-100">
                <Map />
                <User />
                <Bikes />
            </div>
        </div>
    );

}

export default Login;
