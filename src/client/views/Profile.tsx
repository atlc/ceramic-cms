import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Items } from "../../types";
import ItemCard from "../components/ItemCard";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<{ [key: string]: string | number }>({});
    const [items, setItems] = useState<Items[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showSold, setShowSold] = useState(false);

    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If someone is coming from the login or registration page, assigning to LocalStorage
        // then immediately reading it doesn't work asynchronously. So in order to avoid that pitfall,
        // send the token via state if being rerouted from the login page and evaluate that here instead.
        const TOKEN = localStorage.getItem("token") || location?.state?.token;

        fetch("/api/items/profile", { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(res => res.json())
            .then(user => setUserInfo(user));

        fetch("/api/items", { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(res => res.json())
            .then(items => {
                setItems(items);
                setHasLoaded(true);
            });
    }, []);

    return (
        <div>
            <div className="row">
                <h6 className="display-6">Welcome{userInfo?.name ? `, ${userInfo?.name}` : ""}!</h6>
            </div>
            <h1 className="lead text-center">
                Your listings:{" "}
                <span className="mx-2 my-1 btn rounded-pill btn-dark" onClick={() => setShowSold(!showSold)}>
                    Showing {showSold ? "sold" : "active"}
                </span>
            </h1>

            <div className="row">
                {!hasLoaded && <h3 className="display-3">Loading...</h3>}
                {hasLoaded &&
                    (!items.length ? (
                        <h3 className="display-3">No listings found.</h3>
                    ) : (
                        items.map(
                            item =>
                                item.is_sold == showSold && (
                                    <div className="my-2" key={item.id} onClick={() => nav(`/listing/${item.id}`)}>
                                        <ItemCard item={item} isPreview key={item.id} />{" "}
                                    </div>
                                )
                        )
                    ))}
            </div>
        </div>
    );
};

export default Profile;
