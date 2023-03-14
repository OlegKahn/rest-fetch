package com.example.restandfetch.controller;

import com.example.restandfetch.dao.UserDao;
import com.example.restandfetch.model.User;
import com.example.restandfetch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserDao userDao;

    @GetMapping
    public String mainPage(ModelMap modelMap) {
        String currentUserName = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            currentUserName = authentication.getName();
        }
        User user = userDao.findByUsername(currentUserName).get();
        modelMap.addAttribute("user", user);
        return "user_page";
    }
}