import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
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
        case UPDATE_TODO_REQUEST:
        case DELETE_TODO_REQUEST:
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
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: state.todos.map((todo) => {
                    if (todo.idTask === action.todo.idTask) {
                        return action.todo;
                    }
                    return todo;
                }),
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: state.todos.filter(
                    (todo) => todo.idTask !== action.todo.idTask
                ),
            };
        case FETCH_TODOS_FAILURE:
        case ADD_TODO_FAILURE:
        case UPDATE_TODO_FAILURE:
        case DELETE_TODO_FAILURE:
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
