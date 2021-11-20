import * as React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Items } from "../../types";
import { GET, PUT, DELETE } from "../services/api";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";

const Edit = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState<Items>({});

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

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItem(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("temp", file);

        const TOKEN = localStorage.getItem("token");

        try {
            const res = await fetch("/uploads", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                },
                body: data
            });
            const uploadres = await res.json();

            if (uploadres.image_url) {
                setItem({ ...item, image_url: uploadres.image_url });
            }
        } catch (error) {
            console.log({ error });
            toast.error(error.message || error);
            toast.error("There was an error uploading the file");
        }
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await PUT(`/api/items/${id}`, { ...item });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            nav(`/listing/${id}`);
        } catch (error) {
            toast.error(error.message || error);
            return;
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (confirm(`This action is IRREVERSIBLE. To continue deletion, press 'OK'`)) {
            try {
                const res = await DELETE(`/api/items/${id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                toast.success(data.message);
                nav("/profile");
            } catch (error) {
                toast.error(error.message || error);
                return;
            }
        }
    };

    return (
        <div>
            <h1 className="display-1 text-center text-dark">Editing "{item.name}"</h1>
            <form className="bg-info shadow rounded-3 p-3">
                <label className="my-1 text-dark">Name</label>
                <input
                    value={item?.name || ""}
                    onChange={handleFormUpdate}
                    name="name"
                    type="text"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">Description ({item?.description?.length || 0}/256)</label>
                <textarea
                    value={item?.description || ""}
                    style={{ resize: "none" }}
                    maxLength={256}
                    onChange={handleFormUpdate}
                    name="description"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">
                    {item.image_url ? "Current " : "Select an "}Image{" "}
                    <span>
                        {item.image_url && (
                            <a target="_blank" className="my-1 text-dark" href={item.image_url}>
                                <em>{item.image_url}</em>
                            </a>
                        )}
                    </span>
                </label>
                <input
                    placeholder="Select another image if you'd like to replace the current one"
                    onChange={handleFileUpload}
                    name="image_url"
                    type="file"
                    className="my-1 bg-light form-control"
                />
                <label className="my-1 text-dark">Purchase Price</label>
                <input
                    value={item?.purchase_price || ""}
                    onChange={handleFormUpdate}
                    name="purchase_price"
                    type="number"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">Purchase date (formatted YYYY-MM-DD)</label>

                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.purchase_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, purchase_date: date })}
                    className="my-1 form-control"
                />

                <label className="my-1 text-dark">Purchase Location</label>
                <input
                    value={item?.purchase_location || ""}
                    onChange={handleFormUpdate}
                    name="purchase_location"
                    type="text"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">Listing date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.listing_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, listing_date: date })}
                    className="my-1 form-control"
                />
                <label className="my-1 text-dark">Listing price</label>

                <input
                    value={item?.listing_price || ""}
                    onChange={handleFormUpdate}
                    name="listing_price"
                    type="number"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">
                    Your listing links (separated by space, comma, semicolon, or newline) ({item.listing_links?.length || 0}/256)
                </label>
                <textarea
                    value={item.listing_links || ""}
                    onChange={handleFormUpdate}
                    name="listing_links"
                    className="my-1 text-dark form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="my-1 text-dark">
                    Comparable listing links (separated by space, comma, semicolon, or newline) ({item.comp_listings?.length || 0}/256)
                </label>
                <textarea
                    value={item.comp_listings || ""}
                    onChange={handleFormUpdate}
                    name="comp_listings"
                    className="my-1 text-dark form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="my-1 text-dark">Sold date</label>
                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.sold_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, sold_date: date })}
                    className="my-1 form-control"
                />
                <div className="my-1 mt-3 form-check form-switch">
                    <input
                        className={`form-check-input ${item.is_sold ? "bg-success" : "bg-light"}`}
                        type="checkbox"
                        onChange={() => setItem({ ...item, is_sold: !item.is_sold })}
                        checked={item?.is_sold || false}
                    />
                    <label className="my-1 form-check-label text-dark">
                        Currently {item.is_sold ? "sold" : "active"}, mark as ({item.is_sold ? "active" : "sold"})?
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button onClick={handleUpdate} className="my-1 btn rounded-pill bg-success text-light mx-1 mt-3">
                        Save edits
                    </button>

                    <button onClick={handleDelete} className="my-1 btn rounded-pill bg-danger text-white mx-1 mt-3">
                        Delete?
                    </button>

                    <button onClick={() => nav("/profile")} className="my-1 btn mx-1 rounded-pill bg-dark text-light mt-3">
                        Listings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
