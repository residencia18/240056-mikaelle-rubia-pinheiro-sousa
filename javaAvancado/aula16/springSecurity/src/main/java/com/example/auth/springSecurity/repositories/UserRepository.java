package com.example.auth.springSecurity.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.auth.springSecurity.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByLogin(String login);
}