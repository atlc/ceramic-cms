import * as React from "react";
import { Items } from "../../types";
import { format } from "../services/date_display";

const ItemCard = ({ isPreview, item }: ItemCardProps) => {
    const {
        name,
        description,
        image_url,
        purchase_price,
        purchase_date,
        purchase_location,
        listing_price,
        listing_date,
        listing_links,
        comp_listings,
        is_sold,
        created_at,
        updated_at
    } = item;
    return (
        <div className="card p-2 mb-2 shadow-lg">
            {image_url && <img style={{ maxHeight: "35vh", objectFit: "contain" }} src={image_url} />}
            <div className="card-header bg-white">
                <h6 className="display-6 text-center">
                    {name} <span className="text-muted">({is_sold ? "sold" : "active"})</span>
                </h6>
            </div>
            <div className="card-body">
                <p className="lead">
                    <em>
                        {isPreview ? (
                            <>
                                {description.substring(0, 20)}
                                <strong>...</strong>
                            </>
                        ) : (
                            description
                        )}
                    </em>
                </p>
                <p>
                    Purchased for ${purchase_price}
                    {purchase_location && ` at ${purchase_location}`}
                    {purchase_date && ` on ${format(purchase_date)}`}
                </p>
                {!isPreview && (
                    <>
                        <p>
                            Listed for ${listing_price}
                            {listing_date && ` on ${format(listing_date)}`}
                        </p>
                        {/* Accounting for MULTIPLE links being left, separated by newline, comma, space, or semicolon */}
                        {listing_links &&
                            listing_links
                                .split(/\n|,|;|\s/g)
                                .filter(s => s)
                                .map((link, i) => (
                                    <p key={`listing-link-${i}`}>
                                        Listed at:{" "}
                                        <a className="link-info" href={link.includes("http") ? link : `http://${link}`} target="_blank">
                                            {link.includes("http") ? link : `http://${link}`}
                                        </a>{" "}
                                    </p>
                                ))}

                        {comp_listings &&
                            comp_listings
                                .split(/\n|,|;|\s/g)
                                .filter(s => s)
                                .map((link, i) => (
                                    <p key={`comp-listing-link-${i}`}>
                                        Comparable listing at:{" "}
                                        <a className="link-info" href={link.includes("http") ? link : `http://${link}`} target="_blank">
                                            {link.includes("http") ? link : `http://${link}`}
                                        </a>{" "}
                                    </p>
                                ))}
                    </>
                )}
                {!isPreview && (
                    <div className="card-footer">
                        {updated_at ? `Last updated on ${format(updated_at)}` : `Created on ${format(created_at)}`}
                    </div>
                )}
            </div>
        </div>
    );
};

/*
{
    id?: string;
    name?: string;
    description?: string;
    image_url?: string;
    purchase_price?: number;
    purchase_date?: Date;
    purchase_location?: string;
    listing_price?: number;
    listing_date?: Date;
    listing_links?: string;
    comp_listings?: string;
    user_id?: Users["id"];
    created_at?: Date;
    updated_at?: Date;
    is_sold?: boolean;
}*/

interface ItemCardProps {
    item: Items;
    isPreview?: boolean;
}

export default ItemCard;
