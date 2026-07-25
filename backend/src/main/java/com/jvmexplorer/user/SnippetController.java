package com.jvmexplorer.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    private final SnippetRepository snippetRepository;

    public SnippetController(SnippetRepository snippetRepository) {
        this.snippetRepository = snippetRepository;
    }

    @PostMapping
    public ResponseEntity<Snippet> share(@RequestBody ShareRequest request,
                                          Authentication auth) {
        var snippet = new Snippet();
        snippet.setUserId(Long.parseLong(auth.getName()));
        snippet.setTitle(request.title());
        snippet.setCode(request.code());
        snippet.setPublic(request.isPublic());
        snippet.setShareId(UUID.randomUUID().toString().substring(0, 8));

        var saved = snippetRepository.save(snippet);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/public")
    public ResponseEntity<List<Snippet>> getPublic() {
        return ResponseEntity.ok(snippetRepository.findByIsPublicTrueOrderByCreatedAtDesc());
    }

    @GetMapping("/share/{shareId}")
    public ResponseEntity<Snippet> getByShareId(@PathVariable String shareId) {
        return snippetRepository.findByShareId(shareId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Snippet>> getMine(Authentication auth) {
        return ResponseEntity.ok(
                snippetRepository.findByUserIdOrderByCreatedAtDesc(Long.parseLong(auth.getName())));
    }
}
