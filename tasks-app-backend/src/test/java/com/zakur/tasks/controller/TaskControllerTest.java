package com.zakur.tasks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zakur.tasks.dto.TaskDTO;
import com.zakur.tasks.exception.ModelNotFoundException;
import com.zakur.tasks.model.Task;
import com.zakur.tasks.service.ITaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ITaskService service;

    @MockBean(name = "taskMapper")
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    LocalDateTime NOW = LocalDateTime.now();

    Task TASK_1 = new Task(1, "Task 1", NOW, false);
    Task TASK_2 = new Task(2, "Task 2", NOW, false);
    Task TASK_3 = new Task(3, "Task 3", NOW, false);

    TaskDTO TASKDTO_1 = new TaskDTO(1, "Task 1", NOW, false);
    TaskDTO TASKDTO_2 = new TaskDTO(2, "Task 2", NOW, false);
    TaskDTO TASKDTO_3 = new TaskDTO(3, "Task 3", NOW, false);

    @Test
    public void findAllTasksTest() throws Exception {

        List<Task> tasks = List.of(TASK_1, TASK_2, TASK_3);

        Mockito.when(service.findAll()).thenReturn(tasks);

        Mockito.when(modelMapper.map(TASK_1, TaskDTO.class)).thenReturn(TASKDTO_1);
        Mockito.when(modelMapper.map(TASK_2, TaskDTO.class)).thenReturn(TASKDTO_2);
        Mockito.when(modelMapper.map(TASK_3, TaskDTO.class)).thenReturn(TASKDTO_3);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/tasks")
                        .content(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].descriptionTask", is("Task 2")));
    }

    @Test
    public void findByIdTaskTest() throws Exception{
        int ID = 1;

        Mockito.when(service.findById(any())).thenReturn(TASK_1);
        Mockito.when(modelMapper.map(TASK_1, TaskDTO.class)).thenReturn(TASKDTO_1);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/tasks/" + ID)
                        .content(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.descriptionTask", is("Task 1")));
    }

    @Test
    public void findByIDTaskErrorTest() throws Exception{
        int ID = 2;

        Mockito.when(service.findById(any())).thenThrow(new ModelNotFoundException("TEST"));

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .get("/api/tasks/" + ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(mockRequest)
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ModelNotFoundException));
    }

    @Test
    public void createTaskTest() throws Exception{
        Mockito.when(service.save(any())).thenReturn(TASK_3);
        Mockito.when(modelMapper.map(TASK_3, TaskDTO.class)).thenReturn(TASKDTO_3);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(TASKDTO_3));

        mockMvc.perform(mockRequest)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.descriptionTask", is("Task 3")))
                .andExpect(jsonPath("$.completedTask", is(false)));
    }

    @Test
    public void updateTaskTest() throws Exception{
        int ID = 2;

        Mockito.when(service.update(any(), any())).thenReturn(TASK_2);
        Mockito.when(modelMapper.map(TASK_2, TaskDTO.class)).thenReturn(TASKDTO_2);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .put("/api/tasks/" + ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(TASKDTO_2));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.descriptionTask", is("Task 2")))
                .andExpect(jsonPath("$.completedTask", is(false)));
    }

    @Test
    public void updateTaskErrorTest() throws Exception{
        int ID = 2;

        Mockito.when(service.update(any(), any())).thenThrow(new ModelNotFoundException("TEST"));

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .put("/api/tasks/" + ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(TASKDTO_2));

        mockMvc.perform(mockRequest)
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ModelNotFoundException));
    }

    @Test
    public void deleteTaskTest() throws Exception{
        int ID_CATEGORY = 1;

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/tasks/" + ID_CATEGORY)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNoContent());
    }

    @Test
    public void deleteTaskErrorTest() throws Exception{
        int ID_TASK = 999;

        Mockito.doThrow(new ModelNotFoundException("ID: " + ID_TASK)).when(service).delete(ID_TASK);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/tasks/" + ID_TASK)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ModelNotFoundException));
    }

}