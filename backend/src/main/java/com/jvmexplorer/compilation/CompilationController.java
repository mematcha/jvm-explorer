package com.jvmexplorer.compilation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compile")
public class CompilationController {

    private final CompilationService compilationService;

    public CompilationController(CompilationService compilationService) {
        this.compilationService = compilationService;
    }

    @PostMapping
    public ResponseEntity<CompilationResult> compile(@RequestBody CompileRequest request) {
        var result = compilationService.compile(request.className(), request.sourceCode());
        return ResponseEntity.ok(result);
    }
}
