// UserRepository.java
package com.example.backend.test;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.DTO.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query method to create a new user
    @Modifying
    @Transactional
    @Query("INSERT INTO user(username, password, country, postalCode, city, fname, lname, address) " +
            "VALUES (:username, :password, :country, :postalCode, :city, :fname, :lname, :address)")
    void createUser(String username, String password, String country, String postalCode, String city, String fname, String lname, String address);

    // You can add other custom query methods here if needed
}
