package com.jvmexplorer.instrumentation;

import java.util.List;

public record GcSnapshot(
        long collectionCount,
        long collectionTimeMs,
        List<GcInfo> recentGCs) {

    public record GcInfo(String name, long count, long timeMs, boolean isConcurrent) {}
}
