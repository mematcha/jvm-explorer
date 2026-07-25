package com.jvmexplorer.execution;

import java.util.List;

public record ExecutionResult(
        boolean success,
        String stdout,
        String stderr,
        int exitCode,
        long durationMs,
        List<String> errors) {
}
