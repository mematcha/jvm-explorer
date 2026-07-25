package com.jvmexplorer.instrumentation;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InstrumentationServiceTest {

    @Autowired
    private InstrumentationService instrumentationService;

    @Test
    void shouldCaptureHeapSnapshot() {
        var snapshot = instrumentationService.captureSnapshot();
        assertNotNull(snapshot);
        assertNotNull(snapshot.heap());
        assertTrue(snapshot.heap().usedBytes() > 0);
        assertNotNull(snapshot.heap().pools());
        assertFalse(snapshot.heap().pools().isEmpty());
    }

    @Test
    void shouldCaptureThreadSnapshot() {
        var snapshot = instrumentationService.captureSnapshot();
        assertNotNull(snapshot.threads());
        assertFalse(snapshot.threads().isEmpty());

        var mainThread = snapshot.threads().stream()
                .filter(t -> t.name().equals("main"))
                .findFirst();
        assertTrue(mainThread.isPresent());
        assertEquals("RUNNABLE", mainThread.get().state());
    }

    @Test
    void shouldCaptureGcSnapshot() {
        var snapshot = instrumentationService.captureSnapshot();
        assertNotNull(snapshot.gc());
        assertTrue(snapshot.gc().collectionCount() >= 0);
        assertNotNull(snapshot.gc().recentGCs());
    }

    @Test
    void shouldCaptureClassLoaderSnapshot() {
        var snapshot = instrumentationService.captureSnapshot();
        assertNotNull(snapshot.classLoaders());
        assertFalse(snapshot.classLoaders().isEmpty());
    }

    @Test
    void shouldCaptureJitSnapshot() {
        var snapshot = instrumentationService.captureSnapshot();
        assertNotNull(snapshot.jit());
        assertTrue(snapshot.jit().totalCompilationTimeMs() >= 0);
    }

    @Test
    void snapshotShouldHaveTimestamp() {
        var snapshot = instrumentationService.captureSnapshot();
        assertTrue(snapshot.timestamp() > 0);
    }
}
