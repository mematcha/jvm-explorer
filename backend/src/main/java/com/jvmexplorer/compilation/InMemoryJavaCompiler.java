package com.jvmexplorer.compilation;

import javax.tools.*;
import java.io.*;
import java.net.URI;
import java.util.*;

public class InMemoryJavaCompiler {

    private final JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();

    public CompilationResult compile(String className, String sourceCode) {
        var source = new JavaSourceObject(className, sourceCode);
        var classOutput = new ClassOutputManager();

        var diagnosticCollector = new DiagnosticCollector<JavaFileObject>();
        var task = compiler.getTask(null, classOutput, diagnosticCollector, null, null, List.of(source));

        boolean success = task.call();

        var errors = new ArrayList<String>();
        var warnings = new ArrayList<String>();
        for (var diag : diagnosticCollector.getDiagnostics()) {
            var msg = diag.getMessage(null) + " (line " + diag.getLineNumber() + ")";
            if (diag.getKind() == Diagnostic.Kind.ERROR) {
                errors.add(msg);
            } else {
                warnings.add(msg);
            }
        }

        return new CompilationResult(success, classOutput.getClassBytes(), errors, warnings);
    }

    private static class JavaSourceObject extends SimpleJavaFileObject {
        private final String code;

        JavaSourceObject(String className, String code) {
            super(URI.create("string:///" + className.replace('.', '/') + Kind.SOURCE.extension), Kind.SOURCE);
            this.code = code;
        }

        @Override
        public CharSequence getCharContent(boolean ignoreEncodingErrors) {
            return code;
        }
    }

    private static class ClassOutputManager extends ForwardingJavaFileManager<StandardJavaFileManager> {

        private final Map<String, ByteArrayOutputStream> classBytes = new HashMap<>();

        ClassOutputManager() {
            super(ToolProvider.getSystemJavaCompiler().getStandardFileManager(null, null, null));
        }

        @Override
        public JavaFileObject getJavaFileForOutput(Location location, String className,
                                                    JavaFileObject.Kind kind, FileObject sibling) {
            if (kind == JavaFileObject.Kind.CLASS) {
                var baos = new ByteArrayOutputStream();
                classBytes.put(className, baos);
                return new SimpleJavaFileObject(
                        URI.create("bytearray:///" + className.replace('.', '/') + kind.extension),
                        kind) {
                    @Override
                    public OutputStream openOutputStream() {
                        return baos;
                    }
                };
            }
            try {
                return super.getJavaFileForOutput(location, className, kind, sibling);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        Map<String, byte[]> getClassBytes() {
            var result = new HashMap<String, byte[]>();
            classBytes.forEach((name, baos) -> result.put(name, baos.toByteArray()));
            return result;
        }
    }
}
