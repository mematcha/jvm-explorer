package com.jvmexplorer.compilation;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CompilationServiceTest {

    @Autowired
    private CompilationService compilationService;

    @Test
    void shouldCompileValidJavaCode() {
        var result = compilationService.compile("HelloWorld",
                "public class HelloWorld { " +
                "  public static void main(String[] args) { " +
                "    System.out.println(\"test\"); " +
                "  } " +
                "}");

        assertTrue(result.success());
        assertTrue(result.classBytes().containsKey("HelloWorld"));
        assertTrue(result.errors().isEmpty());
        assertTrue(result.classBytes().get("HelloWorld").length > 0);
    }

    @Test
    void shouldFailOnSyntaxError() {
        var result = compilationService.compile("Broken",
                "public class Broken { broken syntax }");

        assertFalse(result.success());
        assertFalse(result.errors().isEmpty());
    }

    @Test
    void shouldFailOnMissingClass() {
        var result = compilationService.compile("MissingClass",
                "public class WrongName {}");

        assertFalse(result.success());
    }

    @Test
    void shouldCacheCompiledClasses() {
        var code = "public class CacheTest { " +
                   "  public static void main(String[] args) {} " +
                   "}";

        compilationService.compile("CacheTest", code);
        var cached = compilationService.getCachedBytes("CacheTest");
        assertNotNull(cached);
        assertTrue(cached.containsKey("CacheTest"));
    }
}
