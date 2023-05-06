package com.zakur.tasks.service;

import java.util.List;

public interface ICrud<T, ID> {

    T save(T t) throws Exception;

    T update(T t, ID id) throws Exception;

    List<T> findAll() throws Exception;

    T findById(ID id) throws Exception;

    void delete(ID id) throws Exception;
}
