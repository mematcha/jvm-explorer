package com.jvmexplorer.execution;

import com.jvmexplorer.compilation.CompilationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;

@Service
public class ExecutionService {

    private static final Logger log = LoggerFactory.getLogger(ExecutionService.class);
    private static final Path SANDBOX_DIR = Path.of("/tmp/jvm-sandbox");
    private static final long DEFAULT_TIMEOUT_MS = 30_000;

    private final CompilationService compilationService;

    public ExecutionService(CompilationService compilationService) {
        this.compilationService = compilationService;
    }

    public ExecutionResult execute(String className, String sourceCode, String[] args) {
        var start = System.currentTimeMillis();
        var errors = new ArrayList<String>();

        try {
            var compileResult = compilationService.compile(className, sourceCode);
            if (!compileResult.success()) {
                return new ExecutionResult(false, "", "", -1, 0, compileResult.errors());
            }

            Files.createDirectories(SANDBOX_DIR);
            var classDir = SANDBOX_DIR.resolve(UUID.randomUUID().toString());
            Files.createDirectories(classDir);

            for (var entry : compileResult.classBytes().entrySet()) {
                var classFile = classDir.resolve(entry.getKey().replace('.', '/') + ".class");
                Files.createDirectories(classFile.getParent());
                Files.write(classFile, entry.getValue());
            }

            var process = new ProcessBuilder("java", "-cp", classDir.toString(), className)
                    .redirectErrorStream(false)
                    .start();

            var stdout = new StringBuilder();
            var stderr = new StringBuilder();

            try (var reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                reader.lines().forEach(l -> stdout.append(l).append("\n"));
            }
            try (var reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
                reader.lines().forEach(l -> stderr.append(l).append("\n"));
            }

            boolean finished = process.waitFor(DEFAULT_TIMEOUT_MS, TimeUnit.MILLISECONDS);
            if (!finished) {
                process.destroyForcibly();
                var duration = System.currentTimeMillis() - start;
                return new ExecutionResult(false, stdout.toString(), stderr.toString(), -1, duration,
                        List.of("Execution timed out after " + DEFAULT_TIMEOUT_MS + "ms"));
            }

            var duration = System.currentTimeMillis() - start;
            int exitCode = process.exitValue();
            boolean success = exitCode == 0;

            deleteDirectory(classDir);
            return new ExecutionResult(success, stdout.toString(), stderr.toString(), exitCode, duration, errors);

        } catch (Exception e) {
            var duration = System.currentTimeMillis() - start;
            return new ExecutionResult(false, "", e.getMessage(), -1, duration,
                    List.of(e.getMessage()));
        }
    }

    private void deleteDirectory(Path dir) throws IOException {
        try (var files = Files.walk(dir)) {
            files.sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        }
    }
}
