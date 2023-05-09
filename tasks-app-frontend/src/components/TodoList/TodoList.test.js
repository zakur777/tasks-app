import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('TodoList component', () => {
    let store;
    let mockProps = {
        todos: [
            {
                idTask: 1,
                descriptionTask: 'Finish project',
                completedTask: false,
            },
        ],
        isLoading: false,
        error: null,
        fetchTodos: jest.fn(),
    };

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    it('renders AddTodo component', () => {
        render(
            <Provider store={store}>
                <TodoList {...mockProps} />
            </Provider>
        );
        expect(screen.getByText('Finish project')).toBeInTheDocument();
    });

    it('renders loading text if loading is true', () => {
        mockProps.isLoading = true;
        render(
            <Provider store={store}>
                <TodoList {...mockProps} />
            </Provider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error message if there is an error', () => {
        const errorMessage = 'Network Error';
        mockProps.error = { message: errorMessage };
        render(
            <Provider store={store}>
                <TodoList {...mockProps} />
            </Provider>
        );
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    // it('renders todo items if there are todos', () => {
    //     render(
    //         <Provider store={store}>
    //             <TodoList {...mockProps} />
    //         </Provider>
    //     );
    //     expect(screen.getAllByRole('listitem')).toHaveLength(
    //         mockProps.todos.length
    //     );
    // });

    it('calls fetchTodos on mount', () => {
        render(
            <Provider store={store}>
                <TodoList {...mockProps} />
            </Provider>
        );
        expect(mockProps.fetchTodos).toHaveBeenCalled();
    });
});
