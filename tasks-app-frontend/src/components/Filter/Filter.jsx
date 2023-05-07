import React from 'react';
import { Button } from '../Button/Button';
import './filter.css';

export const Filter = () => {
    return (
        <div className="filter">
            <Button className="filter-button" value="All" />
            <Button className="filter-button" value="Active" />
            <Button className="filter-button" value="Completed" />
        </div>
    );
};
