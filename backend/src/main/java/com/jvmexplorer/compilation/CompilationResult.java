package com.jvmexplorer.compilation;

import java.util.List;
import java.util.Map;

public record CompilationResult(
        boolean success,
        Map<String, byte[]> classBytes,
        List<String> errors,
        List<String> warnings) {
}
