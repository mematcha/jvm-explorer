package com.jvmexplorer.ws;

import com.jvmexplorer.instrumentation.InstrumentationService;
import com.jvmexplorer.instrumentation.JvmSnapshot;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class VisualizationEngine {

    private static final Logger log = LoggerFactory.getLogger(VisualizationEngine.class);

    private final SimpMessagingTemplate messaging;
    private final InstrumentationService instrumentation;
    private volatile boolean streaming = false;
    private volatile String sessionId;

    public VisualizationEngine(SimpMessagingTemplate messaging,
                                InstrumentationService instrumentation) {
        this.messaging = messaging;
        this.instrumentation = instrumentation;
    }

    public void startStreaming(String sessionId) {
        this.streaming = true;
        this.sessionId = sessionId;
        log.info("Started visualization streaming for session: {}", sessionId);
    }

    public void stopStreaming() {
        this.streaming = false;
        this.sessionId = null;
        log.info("Stopped visualization streaming");
    }

    @Scheduled(fixedRate = 500)
    public void streamSnapshot() {
        if (!streaming) return;

        try {
            var snapshot = instrumentation.captureSnapshot();
            messaging.convertAndSend("/topic/visualization",
                    new WsMessage("jvm_snapshot", snapshot));
        } catch (Exception e) {
            log.error("Failed to stream snapshot", e);
        }
    }

    public void sendCompilationResult(String sessionId, Object result) {
        messaging.convertAndSendToUser(sessionId, "/queue/compilation",
                new WsMessage("compilation_result", result));
    }

    public void sendExecutionResult(String sessionId, Object result) {
        messaging.convertAndSendToUser(sessionId, "/queue/execution",
                new WsMessage("execution_result", result));
    }
}
