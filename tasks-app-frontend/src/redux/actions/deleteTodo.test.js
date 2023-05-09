import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
} from './types';
import {
    deleteTodo,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} from './deleteTodo';

const mockStore = configureMockStore([thunk]);

describe('Todo Actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('should create a DELETE_TODO_REQUEST action', () => {
        const expectedAction = { type: DELETE_TODO_REQUEST };
        expect(deleteTodoRequest()).toEqual(expectedAction);
    });

    it('should create a DELETE_TODO_SUCCESS action', () => {
        const todo = { id: 1, text: 'Test Todo' };
        const expectedAction = { type: DELETE_TODO_SUCCESS, todo };
        expect(deleteTodoSuccess(todo)).toEqual(expectedAction);
    });

    it('should create a DELETE_TODO_FAILURE action', () => {
        const error = 'Test Error';
        const expectedAction = { type: DELETE_TODO_FAILURE, error };
        expect(deleteTodoFailure(error)).toEqual(expectedAction);
    });

    it('should dispatch DELETE_TODO_REQUEST and DELETE_TODO_SUCCESS actions on successful todo deletion', () => {
        const todo = { idTask: 1 };
        const expectedActions = [
            { type: DELETE_TODO_REQUEST },
            { type: DELETE_TODO_SUCCESS, todo },
        ];
        const store = mockStore({ todos: [] });

        moxios.stubRequest(`${process.env.REACT_APP_API_URL}/${todo.idTask}`, {
            status: 200,
        });

        return store.dispatch(deleteTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch DELETE_TODO_REQUEST and DELETE_TODO_FAILURE actions on failed todo deletion', () => {
        const todo = { idTask: 1 };
        const error = new Error('Request failed with status code 400');
        const expectedActions = [
            { type: DELETE_TODO_REQUEST },
            { type: DELETE_TODO_FAILURE, error },
        ];
        const store = mockStore({ todos: [] });

        moxios.stubRequest(`${process.env.REACT_APP_API_URL}/${todo.idTask}`, {
            status: 400,
            response: { error },
        });

        return store.dispatch(deleteTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
