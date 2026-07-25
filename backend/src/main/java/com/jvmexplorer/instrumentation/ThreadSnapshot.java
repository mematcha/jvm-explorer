package com.jvmexplorer.instrumentation;

import java.util.List;

public record ThreadSnapshot(
        long id,
        String name,
        String state,
        String stackTrace,
        boolean isVirtual,
        String lockInfo) {
}
