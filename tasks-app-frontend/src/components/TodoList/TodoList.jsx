import {useEffect} from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './todoList.css';
import { connect } from 'react-redux';
import { fetchTodos } from '../../redux/actions/fetchTodos'; 
import AddTodo from '../AddTodo/AddTodo';

export const TodoList = ({todos, isLoading, error, fetchTodos}) => {

    useEffect(() => {
        fetchTodos();
      }, [fetchTodos]);
      

    return (
        <div className='container-todo'>
            <AddTodo />
            {error && <p>Error: {error.message}</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <TodoItem key={todo.idTask} todo={todo} />
                    ))}
                </ul>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        todos: state.todos,
        isLoading: state.isLoading,
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({fetchTodos}, dispatch);
    return {
        fetchTodos: () => dispatch(fetchTodos())
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
