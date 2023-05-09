import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../../redux/actions/updateTodo';
import { deleteTodo } from '../../redux/actions/deleteTodo';

import './todoItem.css';

export const TodoItem = ({ updateTodo, todo, deleteTodo }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(todo.descriptionTask);
    const spanRef = useRef(null);

    const handleUpdateTodo = (todo) => {
        updateTodo({
            ...todo,
            completedTask: !todo.completedTask
        });
    };

    const handleDeleteTodo = (todo) => {
        deleteTodo(todo);
    };

    useEffect(() => {
        if (isEditing && spanRef.current) {
            spanRef.current.focus();
        }
    }, [isEditing]);

    

    return (
        <li id='todo-item-id' className="todo-item">
            <span
                ref={spanRef} 
                style={{ textDecoration: todo.completedTask ? 'line-through' : 'none' }} 
                contentEditable={isEditing}
                onInput={e => setUpdatedDescription(e.target.innerText)}
                onBlur={() => {
                    updateTodo({
                        ...todo,
                        descriptionTask: updatedDescription
                    });
                    setIsEditing(false);
                }}
                suppressContentEditableWarning={true}
            >
                {todo.descriptionTask}
            </span>
            <input type="checkbox" checked={todo.completedTask}  onChange={() => handleUpdateTodo(todo)}/>
            <button type="button" onClick={() => handleDeleteTodo(todo)}>Delete</button>
            <button className='blue' type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </li>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        updateTodo: todo => dispatch(updateTodo(todo)),
        deleteTodo: todo => dispatch(deleteTodo(todo))
    };
};

export default connect(null, mapDispatchToProps)(TodoItem);
