import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
} from '../actions/types';

const initialState = {
    todos: [],
    isLoading: false,
    error: null,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
        case ADD_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.todos,
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: [...state.todos, action.todo],
            };
        case FETCH_TODOS_FAILURE:
        case ADD_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                todos: [],
            };
        default:
            return state;
    }
};

export default todoReducer;
