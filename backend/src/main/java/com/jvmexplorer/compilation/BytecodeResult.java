package com.jvmexplorer.compilation;

import java.util.List;

public record BytecodeResult(
        boolean success,
        List<BytecodeClass> classes,
        List<String> errors) {
}
