import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import { Filter } from './components/Filter/Filter';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

function App() {
    return (
        <Container>
            <h1>Todo App</h1>
            <Filter />
            <AddTodo />
            <TodoList />
        </Container>
    );
}
export default App;
