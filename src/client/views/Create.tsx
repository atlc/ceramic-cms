import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Items } from "../../types";
import { POST } from "../services/api";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";

const Create = () => {
    const nav = useNavigate();
    const [form, setForm] = useState<Items>({});

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
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
                setForm({ ...form, image_url: uploadres.image_url });
            }
        } catch (error) {
            console.log({ error });
            toast.error(error.message || error);
            toast.error("There was an error uploading the file");
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!form.name || !form.description || !form.purchase_price || !form.listing_price) {
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
                    Listing Name <span className="text-danger">{form.name ? "" : "*"}</span>
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
                <label className="text-info">Image</label>
                {!form.image_url && <input onChange={handleFileUpload} name="image_url" type="file" className="bg-light form-control" />}
                {form.image_url && (
                    <div>
                        <a target="_blank" className="text-info" href={form.image_url}>
                            <em>{form.image_url}</em>
                        </a>
                    </div>
                )}
                <label className="text-info">
                    Purchase Price <span className="text-danger">{form.purchase_price ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="purchase_price" type="number" className="text-info form-control" />
                <label className="text-info">Purchase date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={form?.purchase_date}
                    onChange={(date: Date) => setForm({ ...form, purchase_date: date })}
                    className="form-control"
                />

                <label className="text-info">Purchase Location</label>
                <input onChange={handleFormUpdate} name="purchase_location" type="text" className="text-info form-control" />
                <label className="text-info">Listing date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={form?.listing_date}
                    onChange={(date: Date) => setForm({ ...form, listing_date: date })}
                    className="form-control"
                />
                <label className="text-info">
                    Listing price <span className="text-danger">{form.listing_price ? "" : "*"}</span>
                </label>
                <input onChange={handleFormUpdate} name="listing_price" type="number" className="text-info form-control" />
                <label className="text-info">
                    Your listing links (separated by space, comma, semicolon, or newline) ({form.listing_links?.length || 0}/256)
                </label>
                <textarea
                    value={form.listing_links || ""}
                    onChange={handleFormUpdate}
                    name="listing_links"
                    className="text-info form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="text-info">
                    Comparable listing links (separated by space, comma, semicolon, or newline) ({form.comp_listings?.length || 0}/256)
                </label>
                <textarea
                    value={form.comp_listings || ""}
                    onChange={handleFormUpdate}
                    name="comp_listings"
                    className="text-info form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
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
