import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../slices/filters-slice";
import { colorSelector } from "../../redux-toolkit/selector";

const colors = [
    "All", "Black", "Pink", "Gold", "Blue", "Green", "White", "Red"
];

function Colors() {
    const dispatch = useDispatch();
    const currentColor = useSelector(colorSelector);

    const handleColorChange = (color) => {
        dispatch(filtersSlice.actions.setColor(color));
    };

    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5 className="mb-3">Colors</h5>
            <div className="list-group">
                {colors.map((color, index) => (
                    <label 
                        key={color}
                        className={`list-group-item list-group-item-action d-flex align-items-center ${color === currentColor ? 'active' : ''}`}
                    >
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            name="color"
                            id={`color_${index}`}
                            value={color}
                            checked={color === currentColor}
                            onChange={() => handleColorChange(color)}
                            style={color === 'All' ? { backgroundImage: 'linear-gradient(to right, red, green)' } : color !== 'White' ? { backgroundColor: color } : {}}
                        />
                        <span className={`badge rounded-circle me-2`} 
                            style={{ 
                                backgroundColor: color !== 'White' ? color.toLowerCase() : '#fff', 
                                border: '1px solid #000', 
                                width: '20px', 
                                height: '20px' 
                            }} 
                        ></span>
                        {color}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Colors;