import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import './todoList.css';

export const TodoList = () => {
    return (
        <div>
            <ul>
                <TodoItem text="Todo 1" />
                <TodoItem text="Todo 2" />
                <TodoItem text="Todo 3" />
            </ul>
        </div>
    );
};
