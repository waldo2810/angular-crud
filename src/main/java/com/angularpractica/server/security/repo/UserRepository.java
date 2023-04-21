package com.angularpractica.server.security.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.angularpractica.server.security.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
}