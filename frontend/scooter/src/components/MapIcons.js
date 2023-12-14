import L from "leaflet";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsScooter } from "react-icons/bs";
import { FaCircleDot } from "react-icons/fa6";

const icons = {
    userIcon: L.divIcon({
        html: renderToString(
            <FaCircleDot style={{ fontSize: "20px", color: "red" }} />
        ),
        className: "my-custom-icon",
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
    }),
    bikeIcon: L.divIcon({
        html: renderToString(
            <BsScooter style={{ fontSize: "40px", color: "green" }} />
        ),
        className: "my-custom-icon",
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    }),
    zoneIcon: L.divIcon({
        html: renderToString(
            <FaMapMarkerAlt style={{ fontSize: "40px", color: "blue" }} />
        ),
        className: "my-custom-icon",
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    }),
    createIcon: L.divIcon({
        html: renderToString(
            <BsScooter style={{ fontSize: "40px", color: "purple" }} />
        ),
        className: "my-custom-icon",
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    })
};

export default icons;