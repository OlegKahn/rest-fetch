package com.example.restandfetch.controller;

import com.example.restandfetch.model.Role;
import com.example.restandfetch.model.User;
import com.example.restandfetch.service.RoleService;
import com.example.restandfetch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAdmin {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> showAllUsers() {
        return userService.listUsers();
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<Role> roles = user.getRoles().stream().map(role -> roleService.findOrCreate(role.getRole()))
                .toList();
        user.setRoles(roles);
        user.setIsActive(true);
        userService.add(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        user.setIsActive(true);
        if (user.getPassword().isEmpty()) {
            user.setPassword(userService.getUser(user.getId()).getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        if (user.getRoles().isEmpty()) {
            user.setRoles(userService.getUser(user.getId()).getRoles());
        } else {
            List<Role> roles = user.getRoles().stream().map(role -> roleService.findOrCreate(role.getRole()))
                    .toList();
            user.setRoles(roles);
        }
        userService.add(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return "deleted " + id;
    }
}
