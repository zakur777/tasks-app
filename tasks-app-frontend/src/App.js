import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import TodoList from './components/TodoList/TodoList';

export function App() {
    return (
        <Container>
            <h1>Task's App</h1>
            <TodoList />
        </Container>
    );
}
export default App;
