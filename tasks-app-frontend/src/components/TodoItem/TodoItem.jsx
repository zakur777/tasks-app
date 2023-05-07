import React from 'react';
import './todoItem.css';

export const TodoItem = ({ text }) => {
    return (
        <li className="todo-item">
            <span>{text}</span>
            <input type="checkbox" />
            <button type="button">Delete</button>
        </li>
    );
};
