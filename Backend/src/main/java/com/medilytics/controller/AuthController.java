package com.medilytics.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.medilytics.model.User;
import com.medilytics.payload.JwtResponse;
import com.medilytics.payload.LoginRequest;
import com.medilytics.repository.UserRepository;
import com.medilytics.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }



    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("token");

            // Verify token with Firebase Admin SDK
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String name = decodedToken.getName();

            
            return ResponseEntity.ok(Map.of(
                    "uid", uid,
                    "email", email,
                    "name", name,
                    "message", "Google login verified successfully"
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid Firebase token");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(new JwtResponse(token, user.getUsername()));
    }

}
