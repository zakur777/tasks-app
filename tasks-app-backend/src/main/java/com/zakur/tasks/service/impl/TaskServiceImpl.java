package com.zakur.tasks.service.impl;

import com.zakur.tasks.model.Task;
import com.zakur.tasks.repository.IGenericRepository;
import com.zakur.tasks.repository.ITaskRepository;
import com.zakur.tasks.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl extends CrudImpl<Task, Integer> implements ITaskService {

    private final ITaskRepository repository;
    @Override
    protected IGenericRepository<Task, Integer> getRepository() {
        return repository;
    }
}
