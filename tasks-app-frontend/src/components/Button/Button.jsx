import React from 'react';
import './button.css';

export const Button = ({ value }) => {
    return (
        <button className="filter-button" type="button">
            {value}
        </button>
    );
};
