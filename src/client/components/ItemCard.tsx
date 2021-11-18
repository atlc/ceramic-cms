import * as React from "react";
import { Items } from "../../types";

const ItemCard = ({ ...item }: Items) => {
    return (
        <div>
            <ul className="list-group shadow-lg">
                {Object.entries(item).map(([key, val]) => (
                    <li key={`${item.id}-li-${key}`} className="list-group-item">
                        {key} - {val}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemCard;
