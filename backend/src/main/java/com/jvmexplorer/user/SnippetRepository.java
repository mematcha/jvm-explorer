package com.jvmexplorer.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    List<Snippet> findByIsPublicTrueOrderByCreatedAtDesc();
    Optional<Snippet> findByShareId(String shareId);
    List<Snippet> findByUserIdOrderByCreatedAtDesc(Long userId);
}
