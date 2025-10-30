package com.tradeshift.tradeshift.service;

import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // Fetch all users
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Save a new user
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get user by ID
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    @Override
    public User updateUser(Long id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setMobile(updatedUser.getMobile());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }
        return null;
    }

    // Delete user
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Fetch user by email
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    // Register user
    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }
}
