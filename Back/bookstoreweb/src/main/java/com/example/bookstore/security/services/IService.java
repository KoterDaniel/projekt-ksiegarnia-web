package com.example.bookstore.security.services;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


public interface IService<T>{
    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);
}
