import React from "react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { GET } from "../services/api";
import { toast } from "react-toastify";
import ItemCard from "../components/ItemCard";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        const get_item = async () => {
            try {
                const res = await GET(`/api/items/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setItem(data);
            } catch (error) {
                toast.error(error.message || error);
            }
        };
        get_item();
    }, [id]);

    return (
        <div>
            <h4>Listing {id}</h4>
            <button onClick={() => nav(`/listing/${id}/edit`)} className="btn mx-2 rounded-pill bg-info text-light my-2">
                Edit Listing
            </button>
            <button onClick={() => nav("/profile")} className="btn mx-2 rounded-pill bg-dark text-light my-2">
                Return to Listings
            </button>
            <ItemCard item={item} />
        </div>
    );
};

export default ItemDetails;
