package com.zakur.tasks.repository;

import com.zakur.tasks.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class TaskJpaRepositoryTest {

    @Autowired
    private ITaskRepository repository;

    LocalDateTime NOW = LocalDateTime.now();

    @Test
    void findByIdTest() {
        Optional<Task> task = repository.findById(1);
        assertTrue(task.isPresent());
        assertEquals("Comprar pan para la once", task.orElseThrow().getDescription());
    }

    @Test
    void testFindByIdThrowExceptionTest() {
        Optional<Task> task = repository.findById(10);
        assertThrows(NoSuchElementException.class, task::orElseThrow);
        assertFalse(task.isPresent());
    }

    @Test
    void testFindAllTest() {
        List<Task> cuentas = repository.findAll();
        assertFalse(cuentas.isEmpty());
        assertEquals(9, cuentas.size());
    }

    @Test
    void testSaveTest() {
        // Given
        Task task_1 = new Task(1, "Task 1", NOW, true);

        // When
        Task task = repository.save(task_1);

        // Then
        assertEquals("Task 1", task.getDescription());
        assertTrue(task.isCompleted());
    }

    @Test
    void testUpdateTest() {
        // Given
        Task task_1 = new Task(1, "Task 1", NOW, true);

        // When
        Task task = repository.save(task_1);

        // Then
        assertEquals("Task 1", task.getDescription());
        assertTrue(task.isCompleted());


        // When
        task.setDescription("Task 1 updated");
        Task taskUpdated = repository.save(task);

        // Then
        assertEquals("Task 1 updated", task.getDescription());
        assertTrue(task.isCompleted());

    }

    @Test
    void testDelete() {
        Task task = repository.findById(2).orElseThrow();
        assertEquals("Dar comida a mi gato", task.getDescription());

        repository.delete(task);

        assertThrows(NoSuchElementException.class, () -> {
            repository.findById(2).orElseThrow();
        });
        assertEquals(8, repository.findAll().size());
    }
}
