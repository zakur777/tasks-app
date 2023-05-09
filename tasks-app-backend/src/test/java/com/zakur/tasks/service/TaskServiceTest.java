package com.zakur.tasks.service;

import com.zakur.tasks.model.Task;
import com.zakur.tasks.repository.ITaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
class TaskServiceTest {

    @MockBean
    private TaskServiceImpl service;

    @MockBean
    private ITaskRepository repository;

    private Task TASK_1;
    private Task TASK_2;
    private Task TASK_3;

    LocalDateTime NOW = LocalDateTime.now();

    @BeforeEach
    public void init(){
        MockitoAnnotations.openMocks(this);

        this.service = new TaskServiceImpl(repository);

        TASK_1 = new Task(1, "Task 1", NOW, true);
        TASK_2 = new Task(2, "Task 2", NOW, true);
        TASK_3 = new Task(3, "Task 3", NOW, true);

        List<Task> tasks = Arrays.asList(TASK_1, TASK_2, TASK_3);
        Mockito.when(repository.findAll()).thenReturn(tasks);
        Mockito.when(repository.findById(any())).thenReturn(Optional.of(TASK_1));
        Mockito.when(repository.save(any())).thenReturn(TASK_1);

    }

    @Test
    public void findAllTasksTest() throws Exception{
        List<Task> response = service.findAll();

        assertNotNull(response);
        assertFalse(response.isEmpty());
        assertEquals(response.size(), 3);
    }

    @Test
    public void findByIdTaskTest() throws Exception{
        Task response = service.findById(1);
        assertNotNull(response);
    }

    @Test
    public void saveTaskTest() throws Exception{
        Task response = service.save(TASK_1);
        assertNotNull(response);
    }

    @Test
    public void updateTaskTest() throws Exception{
        Task response = service.update(TASK_1, any());
        assertNotNull(response);
    }

    @Test
    public void deleteTaskTest() throws Exception{
        repository.deleteById(1);
        repository.deleteById(1);

        verify(repository, times(2)).deleteById(1);
    }

}