package com.example.restandfetch.dao;

import com.example.restandfetch.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleDao extends JpaRepository<Role, Long> {

    Optional<Role> findRoleByRole(String role);
}
