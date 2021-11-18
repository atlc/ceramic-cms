import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Items } from "../../types";
import { POST } from "../services/api";
import { useNavigate } from "react-router";

const Create = () => {
    const nav = useNavigate();
    const [form, setForm] = useState<Items>({});

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!form.name || !form.description || !form.purchase_price || !form.listing_price || !form.listing_links) {
            toast.error("Missing some fields!");
            return;
        }

        try {
            const res = await POST("/api/items", { ...form });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            nav(`/listing/${data.id}`);
        } catch (error) {
            toast.error(error.message || error);
            return;
        }
    };

    return (
        <div>
            <h1 className="display-1 text-center text-primary">Create Item</h1>
            <form className="bg-secondary shadow rounded-3 p-3">
                <label className="text-info">
                    Name <span className="text-danger">{form.name ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="name" type="text" className="text-info form-control" />
                <label className="text-info">
                    Description ({form?.description?.length || 0}/256)<span className="text-danger">{form.description ? "" : "*"}</span>
                </label>
                <textarea
                    style={{ resize: "none" }}
                    maxLength={256}
                    onChange={handleFormUpdate}
                    name="description"
                    className="text-info form-control"
                />
                <label className="text-info">Image (URL just for now, upload coming soon)</label>
                <input onChange={handleFormUpdate} name="image_url" type="text" className="text-info form-control" />
                <label className="text-info">
                    Purchase Price <span className="text-danger">{form.purchase_price ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="purchase_price" type="number" className="text-info form-control" />
                <label className="text-info">Purchase date (formatted YYYY-MM-DD)</label>
                <input onChange={handleFormUpdate} name="purchase_date" type="text" className="text-info form-control" />
                <label className="text-info">Purchase Location</label>
                <input onChange={handleFormUpdate} name="purchase_location" type="text" className="text-info form-control" />
                <label className="text-info">Listing date (formatted YYYY-MM-DD)</label>
                <input onChange={handleFormUpdate} name="listing_date" type="text" className="text-info form-control" />
                <label className="text-info">
                    Listing price <span className="text-danger">{form.listing_price ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="listing_price" type="number" className="text-info form-control" />
                <label className="text-info">
                    Listing link <span className="text-danger">{form.listing_links ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="listing_links" type="text" className="text-info form-control" />
                <label className="text-info">Comparable listings</label>
                <input onChange={handleFormUpdate} name="comp_listings" type="text" className="text-info form-control" />
                <button
                    onClick={handleSubmit}
                    className="btn rounded-pill bg-info text-light mt-3"
                    disabled={!form.name || !form.description || !form.purchase_price || !form.listing_price || !form.listing_links}>
                    {form.name && form.description && form.purchase_price && form.listing_price && form.listing_links
                        ? "Create it!"
                        : "Some required fields are missing"}
                </button>
            </form>
        </div>
    );
};

export default Create;
