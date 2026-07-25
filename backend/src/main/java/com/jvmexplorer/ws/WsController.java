package com.jvmexplorer.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Controller
public class WsController {

    private static final Logger log = LoggerFactory.getLogger(WsController.class);
    private final VisualizationEngine visualizationEngine;

    public WsController(VisualizationEngine visualizationEngine) {
        this.visualizationEngine = visualizationEngine;
    }

    @MessageMapping("/visualization.start")
    public void startVisualization(@Payload WsMessage message,
                                    SimpMessageHeaderAccessor headerAccessor) {
        var sessionId = headerAccessor.getSessionId();
        visualizationEngine.startStreaming(sessionId);
        log.info("Client {} started visualization", sessionId);
    }

    @MessageMapping("/visualization.stop")
    public void stopVisualization() {
        visualizationEngine.stopStreaming();
    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        visualizationEngine.stopStreaming();
        log.info("Client {} disconnected", event.getSessionId());
    }
}
