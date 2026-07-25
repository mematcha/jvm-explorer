package com.jvmexplorer.instrumentation;

public record JitSnapshot(
        long totalCompilationTimeMs,
        boolean isCompilationEnabled,
        String compilerName) {
}
