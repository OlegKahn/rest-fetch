package com.example.restandfetch.service;

import com.example.restandfetch.model.Role;

public interface RoleService {

    Role findOrCreate(String role);

}
