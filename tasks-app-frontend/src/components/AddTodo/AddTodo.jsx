import React, {useState} from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions/addTodo';

import './addTodo.css';

const AddTodo = ({addTodo}) => {
    const [todo, setTodo] = useState('');

    const handleTodoChange = e => {
        setTodo(e.target.value);
    };

    const handleAddTodo = () => {
        addTodo(todo);
        setTodo('');
    };


    return (
        <div>
            <input className="input-todo" type="text" value={todo} onChange={handleTodoChange} />
            <button className="add-todo" type="button" onClick={handleAddTodo}>
                Add Todo
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => dispatch(addTodo(todo))
    };
};


export default connect(null, mapDispatchToProps)(AddTodo);
