package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService; // Use service instead of repository

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully!";
    }
}
