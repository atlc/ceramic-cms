import { Request } from "express";

export interface Items {
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
}

export interface Users {
    id?: string;
    email?: string;
    name?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Payload {
    id?: string;
    name?: string;
    email?: string;
}

export interface ReqUser extends Request {
    user?: Users;
}
