import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
    updateTodoRequest,
    updateTodoSuccess,
    updateTodoFailure,
    updateTodo,
} from './updateTodo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('updateTodo', () => {
    let store;

    beforeEach(() => {
        moxios.install();
        store = mockStore({});
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('creates UPDATE_TODO_SUCCESS when updating todo has been done', async () => {
        const todo = {
            idTask: 1,
            descriptionTask: 'Test todo',
            completedTask: false,
        };
        const response = {
            status: 200,
            data: todo,
        };

        moxios.stubRequest(`${process.env.REACT_APP_API_URL}/${todo.idTask}`, {
            method: 'put',
            data: todo,
            response,
        });

        const expectedActions = [
            updateTodoRequest(),
            updateTodoSuccess(response),
        ];

        await store.dispatch(updateTodo(todo));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates UPDATE_TODO_FAILURE when api returns an error', async () => {
        const todo = {
            idTask: 1,
            descriptionTask: 'Test todo',
            completedTask: false,
        };
        const error = new Error('Request failed with status code 500');

        moxios.stubRequest(`${process.env.REACT_APP_API_URL}/${todo.idTask}`, {
            method: 'put',
            data: todo,
            status: 500,
            response: error,
        });

        const expectedActions = [updateTodoRequest(), updateTodoFailure(error)];

        await store.dispatch(updateTodo(todo));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
