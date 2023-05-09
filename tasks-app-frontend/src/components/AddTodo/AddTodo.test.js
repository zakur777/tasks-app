import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { AddTodo } from './AddTodo';
import { Provider } from 'react-redux';
import store from './../../redux/store/index';

describe('AddTodo component', () => {
    test('renders todo input and add button', () => {
        const { getByPlaceholderText, getByText } = render(<AddTodo />);
        expect(getByPlaceholderText('Add Todo...')).toBeInTheDocument();
        expect(getByText('Add Todo')).toBeInTheDocument();
    });

    test('displays error message if todo input is less than 3 characters', async () => {
        const { getByPlaceholderText, getByText, findByText } = render(
            <AddTodo />
        );
        const input = getByPlaceholderText('Add Todo...');
        const button = getByText('Add Todo');
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.click(button);
        const errorMessage = await findByText('Must be at least 3 characters');
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays error message if todo input is more than 100 characters', async () => {
        const { getByPlaceholderText, getByText, findByText } = render(
            <AddTodo />
        );
        const input = getByPlaceholderText('Add Todo...');
        const button = getByText('Add Todo');
        fireEvent.change(input, { target: { value: 'a'.repeat(101) } });
        fireEvent.click(button);
        const errorMessage = await findByText('Must be 100 characters or less');
        expect(errorMessage).toBeInTheDocument();
    });
});
