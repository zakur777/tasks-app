import {
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
} from './types';
import axios from 'axios';

function updateTodoRequest() {
    return {
        type: UPDATE_TODO_REQUEST,
    };
}

function updateTodoSuccess(todo) {
    return {
        type: UPDATE_TODO_SUCCESS,
        todo,
    };
}

function updateTodoFailure(error) {
    return {
        type: UPDATE_TODO_FAILURE,
        error,
    };
}

export function updateTodo(todo) {
    return (dispatch) => {
        dispatch(updateTodoRequest());
        return axios
            .put(`${process.env.REACT_APP_API_URL}/${todo.idTask}`, todo)
            .then((response) => {
                dispatch(updateTodoSuccess(response.data));
            })
            .catch((error) => {
                dispatch(updateTodoFailure(error));
            });
    };
}
