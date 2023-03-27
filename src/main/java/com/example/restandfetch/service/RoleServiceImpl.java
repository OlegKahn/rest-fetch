package com.example.restandfetch.service;

import com.example.restandfetch.dao.RoleDao;
import com.example.restandfetch.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    RoleDao roleDao;


    @Override
    public Role findOrCreate(String role) {
        if (roleDao.findRoleByRole(role).isPresent()) {
            return roleDao.findRoleByRole(role).get();
        } else {
            return roleDao.save(new Role(role));
        }
    }


}
