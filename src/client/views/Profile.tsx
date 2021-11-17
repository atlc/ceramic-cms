import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { GET } from "../services/api";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<{ [key: string]: string | number }>({});
    const location = useLocation();

    useEffect(() => {
        if (location?.state?.token) {
            // If someone is coming from the login or registration page, assigning to LocalStorage
            // then immediately reading it doesn't work asynchronously. So in order to avoid that pitfall,
            // send the token via state if being rerouted from the login page and evaluate that here instead.
            fetch("/api/items/profile", {
                headers: { Authorization: `Bearer ${location?.state?.token}` }
            })
                .then(res => res.json())
                .then(user => setUserInfo(user));
        } else {
            fetch("/api/items/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
                .then(res => res.json())
                .then(user => setUserInfo(user));
        }
    }, []);

    return <div>Welcome, {userInfo?.name || ""}</div>;
};

export default Profile;
