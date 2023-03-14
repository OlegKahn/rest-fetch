package com.example.restandfetch.service;


import com.example.restandfetch.dao.UserDao;
import com.example.restandfetch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserDao userDao;


    @Autowired
    ApplicationContext applicationContext;


    @Override
    public void add(User user) {
        userDao.save(user);
    }


    @Override
    public List<User> listUsers() {
        return userDao.findAll();
    }


    @Override
    public void delete(Long id) {
        userDao.deleteById(id);
    }


    @Override
    public User getUser(Long id) {
        User user = null;
        Optional<User> optional = userDao.findById(id);
        if (optional.isPresent()) {
            user = optional.get();
        }
        return user;
    }
}
