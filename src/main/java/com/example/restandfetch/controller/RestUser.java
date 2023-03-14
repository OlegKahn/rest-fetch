package com.example.restandfetch.controller;

import com.example.restandfetch.model.User;
import com.example.restandfetch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestUser {

    @Autowired
    UserService userService;

    @GetMapping("/users/{id}")
    public User getUserFromId(@PathVariable("id") Long id){
        return userService.getUser(id);
    }
}
