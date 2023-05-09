import todoReducer from '../reducer';
import * as actions from '../actions/types';

describe('todoReducer', () => {
    const initialState = {
        todos: [],
        isLoading: false,
        error: null,
    };

    it('should handle FETCH_TODOS_REQUEST, ADD_TODO_REQUEST, UPDATE_TODO_REQUEST, DELETE_TODO_REQUEST', () => {
        const action = { type: actions.FETCH_TODOS_REQUEST };
        const expectedState = { ...initialState, isLoading: true, error: null };
        expect(todoReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FETCH_TODOS_SUCCESS', () => {
        const todos = [{ idTask: 1, taskName: 'test todo' }];
        const action = { type: actions.FETCH_TODOS_SUCCESS, todos };
        const expectedState = { ...initialState, isLoading: false, todos };
        expect(todoReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_TODO_SUCCESS', () => {
        const todo = { idTask: 1, taskName: 'test todo' };
        const action = { type: actions.ADD_TODO_SUCCESS, todo };
        const expectedState = {
            ...initialState,
            isLoading: false,
            todos: [todo],
        };
        expect(todoReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_TODO_SUCCESS', () => {
        const initialTodos = [
            { idTask: 1, taskName: 'test todo' },
            { idTask: 2, taskName: 'test todo 2' },
        ];
        const updatedTodo = { idTask: 2, taskName: 'test todo 2 updated' };
        const action = { type: actions.UPDATE_TODO_SUCCESS, todo: updatedTodo };
        const expectedState = {
            ...initialState,
            isLoading: false,
            todos: [initialTodos[0], updatedTodo],
        };
        expect(
            todoReducer({ ...initialState, todos: initialTodos }, action)
        ).toEqual(expectedState);
    });

    it('should handle DELETE_TODO_SUCCESS', () => {
        const initialTodos = [{ idTask: 1, taskName: 'test todo' }];
        const action = {
            type: actions.DELETE_TODO_SUCCESS,
            todo: initialTodos[0],
        };
        const expectedState = { ...initialState, isLoading: false, todos: [] };
        expect(
            todoReducer({ ...initialState, todos: initialTodos }, action)
        ).toEqual(expectedState);
    });

    it('should handle FETCH_TODOS_FAILURE, ADD_TODO_FAILURE, UPDATE_TODO_FAILURE, DELETE_TODO_FAILURE', () => {
        const error = 'test error';
        const action = { type: actions.FETCH_TODOS_FAILURE, error };
        const expectedState = {
            ...initialState,
            isLoading: false,
            error,
            todos: [],
        };
        expect(todoReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle default case', () => {
        const action = { type: 'UNKNOWN' };
        expect(todoReducer(initialState, action)).toEqual(initialState);
    });
});
