package com.jvmexplorer.instrumentation;

public record MemoryPoolSnapshot(
        String name,
        String type,
        long used,
        long max,
        long committed) {
}
