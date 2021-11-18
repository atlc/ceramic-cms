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

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!item.name || !item.description || !item.purchase_price || !item.listing_price || !item.listing_links) {
            toast.error("Missing some fields!");
            return;
        }

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

        if (prompt(`This action is IRREVERSIBLE. To delete, please copy the ID into the box\n\n${id}\n\n`) == id) {
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

    console.info({ item });

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
                <label className="text-info">Image (URL just for now, upload coming soon)</label>
                <input
                    value={item?.image_url || ""}
                    onChange={handleFormUpdate}
                    name="image_url"
                    type="text"
                    className="text-info form-control"
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
                    Listing link <span className="text-danger">{item.listing_links ? "" : "*"}</span>
                </label>
                <input
                    value={item?.listing_links || ""}
                    onChange={handleFormUpdate}
                    name="listing_links"
                    type="text"
                    className="text-info form-control"
                />
                <label className="text-info">Comparable listing links ({item?.comp_listings?.length || 0}/256)</label>
                <textarea
                    value={item?.comp_listings || ""}
                    onChange={handleFormUpdate}
                    name="comp_listings"
                    className="text-info form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
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

                <button
                    onClick={handleUpdate}
                    className="btn rounded-pill bg-info text-light mx-1 mt-3"
                    disabled={!item.name || !item.description || !item.purchase_price || !item.listing_price || !item.listing_links}>
                    {item.name && item.description && item.purchase_price && item.listing_price && item.listing_links
                        ? "Save edits"
                        : "Some required fields are missing"}
                </button>

                <button onClick={handleDelete} className="btn rounded-pill bg-danger text-white mx-1 mt-3">
                    Delete?
                </button>
            </form>
        </div>
    );
};

export default Edit;
