package com.jvmexplorer.instrumentation;

import java.util.List;

public record HeapSnapshot(
        long usedBytes,
        long maxBytes,
        long committedBytes,
        long pendingFinalization,
        List<MemoryPoolSnapshot> pools) {
}
