package com.jvmexplorer.compilation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bytecode")
public class BytecodeController {

    private final CompilationService compilationService;
    private final BytecodeService bytecodeService;

    public BytecodeController(CompilationService compilationService,
                               BytecodeService bytecodeService) {
        this.compilationService = compilationService;
        this.bytecodeService = bytecodeService;
    }

    @PostMapping
    public ResponseEntity<BytecodeResult> disassemble(@RequestBody CompileRequest request) {
        var compileResult = compilationService.compile(request.className(), request.sourceCode());
        if (!compileResult.success()) {
            return ResponseEntity.ok(new BytecodeResult(false, List.of(), compileResult.errors()));
        }
        var bytecodeResult = bytecodeService.disassemble(compileResult.classBytes());
        return ResponseEntity.ok(bytecodeResult);
    }
}
