package com.jvmexplorer.instrumentation;

import java.util.List;

public record ClassLoaderSnapshot(
        String name,
        boolean isVisible,
        long loadedClasses,
        long unloadedClasses,
        List<String> classNames) {
}
