import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { GET } from "../services/api";
import { toast } from "react-toastify";
import ItemCard from "../components/ItemCard";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});

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
            <ItemCard {...item} />
        </div>
    );
};

export default ItemDetails;
