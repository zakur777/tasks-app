import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from './fetchTodos';
import * as types from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchTodos', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        const responseData = {
            todos: [
                { idTask: 1, descriptionTask: 'Buy milk' },
                { idTask: 2, descriptionTask: 'Walk the dog' },
                { idTask: 3, descriptionTask: 'Do laundry' },
            ],
        };

        moxios.stubRequest(process.env.REACT_APP_API_URL, {
            status: 200,
            response: responseData,
        });

        const expectedActions = [
            { type: types.FETCH_TODOS_REQUEST },
            { type: types.FETCH_TODOS_SUCCESS, todos: responseData },
        ];

        const store = mockStore({ todos: [] });

        return store.dispatch(actions.fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates FETCH_TODOS_FAILURE when fetching todos has failed', () => {
        const error = new Error('Request failed with status code 500');

        moxios.stubRequest(process.env.REACT_APP_API_URL, {
            status: 500,
            response: error,
        });

        const expectedActions = [
            { type: types.FETCH_TODOS_REQUEST },
            { type: types.FETCH_TODOS_FAILURE, error },
        ];

        const store = mockStore({ todos: [] });

        return store.dispatch(actions.fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
