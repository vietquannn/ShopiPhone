import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filters-slice";
import { recommendedSelector } from "../../redux-toolkit/selector";

const recommendedList = [
    { value: 'All', name: 'All Products' },
    { value: 'iPhone', name: 'iPhone' },
    { value: 'iPhone S / R', name: 'iPhone S / R' },
    { value: 'iPhone Mini', name: 'iPhone Mini' },
    { value: 'iPhone Pro', name: 'iPhone Pro' },
    { value: 'iPhone Plus', name: 'iPhone Plus' },
    { value: 'iPhone Pro Max', name: 'iPhone Pro Max' }
];

function Recommended() {
    const dispatch = useDispatch();
    const recommended = useSelector(recommendedSelector);

    const handleRecommendedClick = (value) => {
        dispatch(filtersSlice.actions.setRecommended(value));
    };

    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5 className="mb-3">Range</h5>
            <div className="btn-group">
                {recommendedList.map(recmd => (
                    <button
                        key={recmd.value}
                        className={`btn btn-sm btn-outline-secondary ${recmd.value === recommended ? 'active' : ''}`}
                        type="button"
                        onClick={() => handleRecommendedClick(recmd.value)}
                    >
                        {recmd.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Recommended;