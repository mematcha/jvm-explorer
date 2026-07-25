package com.jvmexplorer.instrumentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instrumentation")
public class InstrumentationController {

    private final InstrumentationService instrumentationService;

    public InstrumentationController(InstrumentationService instrumentationService) {
        this.instrumentationService = instrumentationService;
    }

    @GetMapping("/snapshot")
    public ResponseEntity<JvmSnapshot> snapshot() {
        return ResponseEntity.ok(instrumentationService.captureSnapshot());
    }
}
