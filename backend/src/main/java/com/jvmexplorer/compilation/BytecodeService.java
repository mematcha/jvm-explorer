package com.jvmexplorer.compilation;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Service
public class BytecodeService {

    public BytecodeResult disassemble(Map<String, byte[]> classBytes) {
        var classes = new ArrayList<BytecodeClass>();
        try {
            var tmpDir = Files.createTempDirectory("bytecode-");
            for (var entry : classBytes.entrySet()) {
                var classFile = tmpDir.resolve(entry.getKey().replace('.', '/') + ".class");
                Files.createDirectories(classFile.getParent());
                Files.write(classFile, entry.getValue());

                var process = new ProcessBuilder("javap", "-c", "-p", "-verbose",
                        classFile.toAbsolutePath().toString())
                        .redirectErrorStream(true)
                        .start();

                var output = new StringBuilder();
                try (var reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                    reader.lines().forEach(l -> output.append(l).append("\n"));
                }
                process.waitFor(10, java.util.concurrent.TimeUnit.SECONDS);

                classes.add(new BytecodeClass(entry.getKey(), output.toString()));
            }
            deleteDirectory(tmpDir);
        } catch (Exception e) {
            return new BytecodeResult(false, classes, List.of(e.getMessage()));
        }
        return new BytecodeResult(true, classes, List.of());
    }

    private void deleteDirectory(Path dir) throws IOException {
        try (var files = Files.walk(dir)) {
            files.sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        }
    }
}
