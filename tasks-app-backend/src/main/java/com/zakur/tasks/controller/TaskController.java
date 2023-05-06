package com.zakur.tasks.controller;

import com.zakur.tasks.dto.TaskDTO;
import com.zakur.tasks.model.Task;
import com.zakur.tasks.service.ITaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final ITaskService service;

    @Qualifier("taskMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> findAll() throws Exception {
        List<TaskDTO> list = service.findAll().stream().map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> create(@Valid @RequestBody TaskDTO dto) throws Exception {
        Task obj = service.save(convertToEntity(dto));
        return new ResponseEntity<>(convertToDto(obj), HttpStatus.CREATED);
    }
    private TaskDTO convertToDto(Task task) {
        return mapper.map(task, TaskDTO.class);
    }

    private Task convertToEntity(TaskDTO taskDTO) {
        return mapper.map(taskDTO, Task.class);
    }
}
