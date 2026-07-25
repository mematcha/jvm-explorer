package com.jvmexplorer.instrumentation;

import java.util.List;

public record JvmSnapshot(
        HeapSnapshot heap,
        List<ThreadSnapshot> threads,
        List<ClassLoaderSnapshot> classLoaders,
        GcSnapshot gc,
        JitSnapshot jit,
        long timestamp) {
}
