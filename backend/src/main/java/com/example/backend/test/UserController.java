// UserController.java
package com.example.backend.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.User;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userRepository.createUser(
            user.getUsername(), 
            user.getPassword(), 
            user.getCountry(), 
            user.getPostalCode(), 
            user.getCity(), 
            user.getFname(), 
            user.getLname(), 
            user.getAddress()
        );
        return ResponseEntity.ok(user);
    }
}
