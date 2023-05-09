import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';

describe('TodoItem', () => {
    const todo = { id: 1, descriptionTask: 'Todo 1', completedTask: false };
    const updateTodoMock = jest.fn();
    const deleteTodoMock = jest.fn();

    beforeEach(() => {
        updateTodoMock.mockClear();
        deleteTodoMock.mockClear();
    });

    test('renders span with todo description', () => {
        render(<TodoItem todo={todo} />);
        const todoDescription = screen.getByText(todo.descriptionTask);
        expect(todoDescription).toBeInTheDocument();
    });

    test('calls updateTodo when checkbox is clicked', () => {
        render(<TodoItem todo={todo} updateTodo={updateTodoMock} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(updateTodoMock).toHaveBeenCalledWith({
            ...todo,
            completedTask: true,
        });
    });

    test('calls deleteTodo when delete button is clicked', () => {
        render(<TodoItem todo={todo} deleteTodo={deleteTodoMock} />);
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);
        expect(deleteTodoMock).toHaveBeenCalledWith(todo);
    });

    test('sets isEditing state to true when edit button is clicked', () => {
        render(<TodoItem todo={todo} />);
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);
        const todoDescription = screen.getByText(todo.descriptionTask);
        expect(todoDescription).toHaveAttribute('contentEditable');
        expect(todoDescription).toHaveFocus();
    });
});
