import {
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
} from './types';
import axios from 'axios';

export function deleteTodoRequest() {
    return {
        type: DELETE_TODO_REQUEST,
    };
}

export function deleteTodoSuccess(todo) {
    return {
        type: DELETE_TODO_SUCCESS,
        todo,
    };
}

export function deleteTodoFailure(error) {
    return {
        type: DELETE_TODO_FAILURE,
        error,
    };
}

export function deleteTodo(todo) {
    return (dispatch) => {
        dispatch(deleteTodoRequest());
        return axios
            .delete(`${process.env.REACT_APP_API_URL}/${todo.idTask}`)
            .then(() => {
                dispatch(deleteTodoSuccess(todo));
            })
            .catch((error) => {
                dispatch(deleteTodoFailure(error));
            });
    };
}
