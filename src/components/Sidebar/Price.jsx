import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filters-slice";
import { priceSelector } from "../../redux-toolkit/selector";

const prices = [
    { value: '0,0', name: "All" },
    { value: '0,50', name: "$0-$50" },
    { value: '50,100', name: "$50-$100" },
    { value: '100,150', name: "$100-$150" },
    { value: '150,150', name: "Over $150" }
];

function Price() {
    const dispatch = useDispatch();
    const currentPrice = useSelector(priceSelector);

    const handlePriceChange = (value) => {
        dispatch(filtersSlice.actions.setPrice(value));
    };

    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5 className="mb-3">Price</h5>
            <div className="list-group">
                {prices.map((price, index) => (
                    <label 
                        key={price.value}
                        className={`list-group-item list-group-item-action ${price.value === currentPrice ? 'active' : ''}`}
                    >
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            name="price"
                            id={`price_${index}`}
                            value={price.value}
                            checked={price.value === currentPrice}
                            onChange={() => handlePriceChange(price.value)}
                        />
                        {price.name}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Price;