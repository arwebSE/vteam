import React from "react";
import AddZone from "../../../components/Zone/AddZone";
import ZoneMap from "../../../components/Zone/ZoneMap";
import withAuth from "../../../util/withAuth";

import "./style.css";

function AdminZone() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ZoneMap />
        </div>
    );
}

export default withAuth(AdminZone);