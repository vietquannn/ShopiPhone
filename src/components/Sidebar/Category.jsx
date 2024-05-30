import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filters-slice";
import { categorySelector } from "../../redux-toolkit/selector";

const categories = [
    "All", "iPhone X", "iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"
];

function Category() {
    const dispatch = useDispatch();
    const category = useSelector(categorySelector);

    const handleCategoryChange = (cat) => {
        dispatch(filtersSlice.actions.setCategory(cat));
    };

    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5 className="mb-3">Category</h5>
            <div className="list-group">
                {categories.map((cat, index) => (
                    <label 
                        key={cat}
                        className={`list-group-item list-group-item-action ${cat === category ? 'active' : ''}`}
                    >
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            name="category"
                            id={`cat_${index}`}
                            value={cat}
                            checked={cat === category}
                            onChange={() => handleCategoryChange(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Category;