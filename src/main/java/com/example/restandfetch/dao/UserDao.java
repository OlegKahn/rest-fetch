package com.example.restandfetch.dao;

import com.example.restandfetch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {

    @Query("select u from User u left join fetch u.roles where u.username = ?1")
    Optional<User> findByUsername(String username);
}
