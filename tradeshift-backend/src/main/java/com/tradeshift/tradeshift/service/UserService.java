package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    // CRUD for users
    List<User> getAllUsers();
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);

    // Existing methods for AssetController / JWT
    User findByEmail(String email);
    User registerUser(User user);
}
