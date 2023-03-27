package com.example.restandfetch.service;


import com.example.restandfetch.model.User;
import java.util.List;

public interface UserService {

    void add(User user);

    List<User> listUsers();

    void delete(Long id);

    User getUser(Long id);
}
