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
            <h1 className="display-1 text-center text-info">Editing "{item.name}"</h1>
            <form className="bg-secondary shadow rounded-3 p-3">
                <label className="text-info">
                    Name <span className="text-danger">{item.name ? "" : "*"}</span>
                </label>
                <input value={item?.name || ""} onChange={handleFormUpdate} name="name" type="text" className="text-info form-control" />
                <label className="text-info">
                    Description ({item?.description?.length || 0}/256)<span className="text-danger">{item.description ? "" : "*"}</span>
                </label>
                <textarea
                    value={item?.description || ""}
                    style={{ resize: "none" }}
                    maxLength={256}
                    onChange={handleFormUpdate}
                    name="description"
                    className="text-info form-control"
                />
                <label className="text-info">
                    {item.image_url ? "Current " : "Select an "}Image{" "}
                    <span>
                        {item.image_url && (
                            <a target="_blank" className="text-info" href={item.image_url}>
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
                    className="bg-light form-control"
                />
                <label className="text-info">
                    Purchase Price <span className="text-danger">{item.purchase_price ? "" : "*"}</span>
                </label>
                <input
                    value={item?.purchase_price || ""}
                    onChange={handleFormUpdate}
                    name="purchase_price"
                    type="number"
                    className="text-info form-control"
                />
                <label className="text-info">Purchase date (formatted YYYY-MM-DD)</label>

                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.purchase_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, purchase_date: date })}
                    className="form-control"
                />

                <label className="text-info">Purchase Location</label>
                <input
                    value={item?.purchase_location || ""}
                    onChange={handleFormUpdate}
                    name="purchase_location"
                    type="text"
                    className="text-info form-control"
                />
                <label className="text-info">Listing date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.listing_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, listing_date: date })}
                    className="form-control"
                />
                <label className="text-info">
                    Listing price <span className="text-danger">{item.listing_price ? "" : "*"}</span>
                </label>

                <input
                    value={item?.listing_price || ""}
                    onChange={handleFormUpdate}
                    name="listing_price"
                    type="number"
                    className="text-info form-control"
                />
                <label className="text-info">
                    Your listing links (separated by space, comma, semicolon, or newline) ({item.listing_links?.length || 0}/256)
                </label>
                <textarea
                    value={item.listing_links || ""}
                    onChange={handleFormUpdate}
                    name="listing_links"
                    className="text-info form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="text-info">
                    Comparable listing links (separated by space, comma, semicolon, or newline) ({item.comp_listings?.length || 0}/256)
                </label>
                <textarea
                    value={item.comp_listings || ""}
                    onChange={handleFormUpdate}
                    name="comp_listings"
                    className="text-info form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="text-info">Sold date</label>
                <DatePicker
                    todayButton="Today"
                    selected={new Date(item?.sold_date || Date.now())}
                    onChange={(date: Date) => setItem({ ...item, sold_date: date })}
                    className="form-control"
                />
                <div className="mt-3 form-check form-switch">
                    <input
                        className={`form-check-input ${item.is_sold ? "bg-info" : "bg-light"}`}
                        type="checkbox"
                        onChange={() => setItem({ ...item, is_sold: !item.is_sold })}
                        checked={item?.is_sold || false}
                    />
                    <label className="form-check-label text-info">
                        Currently {item.is_sold ? "sold" : "active"}, mark as ({item.is_sold ? "active" : "sold"})?
                    </label>
                </div>

                <button onClick={handleUpdate} className="btn rounded-pill bg-info text-light mx-1 mt-3">
                    Save edits
                </button>

                <button onClick={handleDelete} className="btn rounded-pill bg-danger text-white mx-1 mt-3">
                    Delete?
                </button>

                <button onClick={() => nav("/profile")} className="btn mx-1 rounded-pill bg-dark text-light mt-3">
                    Listings
                </button>
            </form>
        </div>
    );
};

export default Edit;
