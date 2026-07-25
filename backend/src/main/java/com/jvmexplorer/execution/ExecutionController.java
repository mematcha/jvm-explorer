package com.jvmexplorer.execution;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/execute")
public class ExecutionController {

    private final ExecutionService executionService;

    public ExecutionController(ExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping
    public ResponseEntity<ExecutionResult> execute(@RequestBody ExecutionRequest request) {
        var result = executionService.execute(
                request.className(), request.sourceCode(), request.args());
        return ResponseEntity.ok(result);
    }
}
