package com.jvmexplorer.compilation;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CompilationService {

    private final InMemoryJavaCompiler compiler = new InMemoryJavaCompiler();
    private final Map<String, Map<String, byte[]>> cache = new ConcurrentHashMap<>();

    public CompilationResult compile(String className, String sourceCode) {
        var result = compiler.compile(className, sourceCode);
        if (result.success()) {
            cache.put(className, result.classBytes());
        }
        return result;
    }

    public Map<String, byte[]> getCachedBytes(String className) {
        return cache.get(className);
    }
}
