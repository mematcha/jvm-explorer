package com.jvmexplorer.execution;

import java.nio.file.Path;

public record ExecutionRequest(
        String className,
        String sourceCode,
        String[] args,
        long timeoutMs) {
}
