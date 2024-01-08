import React, { useState, useEffect } from "react";
import { Marker, Popup} from "react-leaflet";
import bikeModel from "../../models/bikeModel";
import { useNavigate } from "react-router-dom";
import icons from "../MapIcons";

export default function MarkLocationMap() {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const updateBikes = async () => {
      setBikes(await bikeModel.getAllAvailable());
    };
    updateBikes();
  }, []);

  const handleMarkerDoubleClick = (scooterId) => {
    navigate("/user/rent/bike/" + scooterId);
  };

  return (
    <>
      {bikes.map((bike) =>
        bike.lat && bike.lon ? (
          <Marker
            key={bike.scooterId}
            position={[bike.lat, bike.lon]}
            icon={icons.bikeIcon}
            eventHandlers={{
              dblclick: () => handleMarkerDoubleClick(bike.scooterId),
            }}
          >
            <Popup>Scooter: {bike.scooterId}</Popup>
          </Marker>
        ) : null
      )}
    </>
  );
};
