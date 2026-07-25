package com.jvmexplorer.auth;

import com.jvmexplorer.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private JwtUtil jwtUtil;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil("test-secret-key-that-is-long-enough-for-hmac-sha256", 3600000);
        authService = new AuthService(userRepository, passwordEncoder, jwtUtil);
    }

    @Test
    void shouldGenerateValidToken() {
        var token = jwtUtil.generateToken("testuser");
        assertNotNull(token);
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void shouldRejectInvalidToken() {
        assertFalse(jwtUtil.validateToken("invalid-token"));
    }

    @Test
    void shouldExtractUsernameFromToken() {
        var token = jwtUtil.generateToken("testuser");
        assertEquals("testuser", jwtUtil.extractUsername(token));
    }

    @Test
    void shouldRejectExpiredToken() {
        var shortJwt = new JwtUtil("test-secret-key-that-is-long-enough-for-hmac-sha256", -1);
        var token = shortJwt.generateToken("testuser");
        assertFalse(shortJwt.validateToken(token));
    }

    @Test
    void passwordEncoderShouldMatch() {
        var encoded = passwordEncoder.encode("password123");
        assertTrue(passwordEncoder.matches("password123", encoded));
        assertFalse(passwordEncoder.matches("wrong", encoded));
    }
}
