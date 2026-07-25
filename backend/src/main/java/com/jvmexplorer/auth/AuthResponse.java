package com.jvmexplorer.auth;

public record AuthResponse(String token, String username, String email) {}
