package com.jvmexplorer.instrumentation;

import org.springframework.stereotype.Service;

import java.lang.management.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InstrumentationService {

    private final MemoryMXBean memoryMX = ManagementFactory.getMemoryMXBean();
    private final ThreadMXBean threadMX = ManagementFactory.getThreadMXBean();
    private final ClassLoadingMXBean classLoadingMX = ManagementFactory.getClassLoadingMXBean();
    private final List<GarbageCollectorMXBean> gcMXBeans = ManagementFactory.getGarbageCollectorMXBeans();
    private final CompilationMXBean compilationMX = ManagementFactory.getCompilationMXBean();
    private final List<MemoryPoolMXBean> poolMXBeans = ManagementFactory.getMemoryPoolMXBeans();

    public JvmSnapshot captureSnapshot() {
        return new JvmSnapshot(
                captureHeap(),
                captureThreads(),
                captureClassLoaders(),
                captureGC(),
                captureJIT(),
                System.currentTimeMillis());
    }

    private HeapSnapshot captureHeap() {
        var heap = memoryMX.getHeapMemoryUsage();
        var nonHeap = memoryMX.getNonHeapMemoryUsage();
        var pools = poolMXBeans.stream()
                .map(p -> new MemoryPoolSnapshot(
                        p.getName(),
                        p.getType().name(),
                        p.getUsage().getUsed(),
                        p.getUsage().getMax(),
                        p.getUsage().getCommitted()))
                .toList();
        return new HeapSnapshot(
                heap.getUsed(),
                heap.getMax(),
                heap.getCommitted(),
                memoryMX.getObjectPendingFinalizationCount(),
                pools);
    }

    private List<ThreadSnapshot> captureThreads() {
        return Arrays.stream(threadMX.dumpAllThreads(true, true))
                .map(info -> {
                    var stack = Arrays.stream(info.getStackTrace())
                            .map(StackTraceElement::toString)
                            .collect(Collectors.joining("\n"));
                    var lock = info.getLockInfo() != null
                            ? info.getLockInfo().toString() : "";
                    return new ThreadSnapshot(
                            info.getThreadId(),
                            info.getThreadName(),
                            info.getThreadState().name(),
                            stack,
                            false,
                            lock);
                })
                .toList();
    }

    private List<ClassLoaderSnapshot> captureClassLoaders() {
        var snapshots = new ArrayList<ClassLoaderSnapshot>();

        snapshots.add(new ClassLoaderSnapshot(
                "Bootstrap", true, classLoadingMX.getLoadedClassCount(),
                classLoadingMX.getUnloadedClassCount(), List.of()));

        snapshots.add(new ClassLoaderSnapshot(
                "Platform", true, classLoadingMX.getLoadedClassCount(),
                classLoadingMX.getUnloadedClassCount(), List.of()));

        snapshots.add(new ClassLoaderSnapshot(
                "Application", true, classLoadingMX.getLoadedClassCount(),
                classLoadingMX.getUnloadedClassCount(), List.of()));

        return snapshots;
    }

    private GcSnapshot captureGC() {
        var totalCount = gcMXBeans.stream().mapToLong(GarbageCollectorMXBean::getCollectionCount).sum();
        var totalTime = gcMXBeans.stream().mapToLong(GarbageCollectorMXBean::getCollectionTime).sum();
        var gcInfos = gcMXBeans.stream()
                .map(gc -> new GcSnapshot.GcInfo(
                        gc.getName(), gc.getCollectionCount(), gc.getCollectionTime(), false))
                .toList();
        return new GcSnapshot(totalCount, totalTime, gcInfos);
    }

    private JitSnapshot captureJIT() {
        return new JitSnapshot(
                compilationMX.getTotalCompilationTime(),
                compilationMX.isCompilationTimeMonitoringSupported(),
                compilationMX.getName());
    }
}
