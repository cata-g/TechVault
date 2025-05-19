package com.techvault.platform;

import com.techvault.platform.model.User;
import com.techvault.platform.model.UserRole;
import com.techvault.platform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        PasswordEncoder bcrypt = new BCryptPasswordEncoder();

        if (userRepository.count() == 0) {
            User student = new User("student", bcrypt.encode("student"), UserRole.STUDENT);
            User teacher = new User("teacher", bcrypt.encode("teacher"), UserRole.TEACHER);
            User admin = new User("admin", bcrypt.encode("admin"), UserRole.ADMIN);

            userRepository.save(student);
            userRepository.save(teacher);
            userRepository.save(admin);
        }
    }
}
