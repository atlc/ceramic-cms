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
            <h1 className="display-1 text-center text-dark">Create Item</h1>
            <form className="bg-info shadow rounded-3 p-3">
                <label className="my-1 text-dark">Name</label>
                <input onChange={handleFormUpdate} name="name" type="text" className="my-1 text-dark form-control" />
                <label className="my-1 text-dark">Description ({form?.description?.length || 0}/256)</label>
                <textarea
                    style={{ resize: "none" }}
                    maxLength={256}
                    onChange={handleFormUpdate}
                    name="description"
                    className="my-1 text-dark form-control"
                />
                <label className="my-1 text-dark">Image</label>
                {!form.image_url && (
                    <input onChange={handleFileUpload} name="image_url" type="file" className="my-1 bg-light form-control" />
                )}
                {form.image_url && (
                    <div>
                        <a target="_blank" className="my-1 text-dark" href={form.image_url}>
                            <em>{form.image_url}</em>
                        </a>
                    </div>
                )}
                <label className="my-1 text-dark">Purchase Price</label>
                <input onChange={handleFormUpdate} name="purchase_price" type="number" className="my-1 text-dark form-control" />
                {/* <label className="text-dark">Purchase date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={form?.purchase_date}
                    onChange={(date: Date) => setForm({ ...form, purchase_date: date })}
                    className="form-control"
                />

                <label className="text-dark">Purchase Location</label>
                <input onChange={handleFormUpdate} name="purchase_location" type="text" className="text-dark form-control" />
                <label className="text-dark">Listing date (formatted YYYY-MM-DD)</label>
                <DatePicker
                    todayButton="Today"
                    selected={form?.listing_date}
                    onChange={(date: Date) => setForm({ ...form, listing_date: date })}
                    className="form-control"
                />
                <label className="text-dark">Listing price</label>
                <input onChange={handleFormUpdate} name="listing_price" type="number" className="text-dark form-control" />
                <label className="text-dark">
                    Your listing links (separated by space, comma, semicolon, or newline) ({form.listing_links?.length || 0}/256)
                </label>
                <textarea
                    value={form.listing_links || ""}
                    onChange={handleFormUpdate}
                    name="listing_links"
                    className="text-dark form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                />
                <label className="text-dark">
                    Comparable listing links (separated by space, comma, semicolon, or newline) ({form.comp_listings?.length || 0}/256)
                </label>
                <textarea
                    value={form.comp_listings || ""}
                    onChange={handleFormUpdate}
                    name="comp_listings"
                    className="text-dark form-control"
                    style={{ resize: "none" }}
                    maxLength={256}
                /> */}
                <button onClick={handleSubmit} className="btn rounded-pill bg-dark text-light mt-3">
                    Create listing
                </button>
            </form>
        </div>
    );
};

export default Create;
