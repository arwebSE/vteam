import { useState, useEffect } from "react";
import userModel from "../../models/userModel";

export default function UserData({ id }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await userModel.getUser(id);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Return the user data
  return userData;
}
