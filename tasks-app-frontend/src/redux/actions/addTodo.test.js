import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from './types';
import {
    addTodoRequest,
    addTodoSuccess,
    addTodoFailure,
    addTodo,
} from './addTodo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    it('should create an action to add todo request', () => {
        const expectedAction = {
            type: ADD_TODO_REQUEST,
        };
        expect(addTodoRequest()).toEqual(expectedAction);
    });

    it('should create an action to add todo success', () => {
        const todo = {
            id: 1,
            descriptionTask: 'Sample todo',
            completedTask: false,
        };
        const expectedAction = {
            type: ADD_TODO_SUCCESS,
            todo,
        };
        expect(addTodoSuccess(todo)).toEqual(expectedAction);
    });

    it('should create an action to add todo failure', () => {
        const error = 'Error while adding todo';
        const expectedAction = {
            type: ADD_TODO_FAILURE,
            error,
        };
        expect(addTodoFailure(error)).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('creates ADD_TODO_SUCCESS after successfully adding todo', () => {
        const todo = {
            descriptionTask: 'Sample todo',
            completedTask: false,
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: todo,
            });
        });

        const expectedActions = [
            { type: ADD_TODO_REQUEST },
            { type: ADD_TODO_SUCCESS, todo },
        ];

        const store = mockStore({ todos: [] });

        return store.dispatch(addTodo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates ADD_TODO_FAILURE after failing to add todo', () => {
        const error = 'Error while adding todo';

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(error);
        });

        const expectedActions = [
            { type: ADD_TODO_REQUEST },
            { type: ADD_TODO_FAILURE, error },
        ];

        const store = mockStore({ todos: [] });

        return store.dispatch(addTodo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
