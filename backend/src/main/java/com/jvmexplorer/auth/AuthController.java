package com.jvmexplorer.auth;

import com.jvmexplorer.user.User;
import com.jvmexplorer.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader) {
        var token = authHeader.replace("Bearer ", "");
        var username = jwtUtil.extractUsername(token);
        return userRepository.findByUsername(username)
            .map(user -> ResponseEntity.ok(new MeResponse(user.getUsername(), user.getEmail())))
            .orElse(ResponseEntity.notFound().build());
    }

    record MeResponse(String username, String email) {}
}
