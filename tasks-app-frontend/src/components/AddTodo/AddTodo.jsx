import React from 'react';
import './addTodo.css';

export const AddTodo = () => {
    return (
        <div>
            <input className="input-todo" type="text" />
            <button className="add-todo" type="button">
                Add Todo
            </button>
        </div>
    );
};
