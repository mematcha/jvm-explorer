package com.jvmexplorer.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "snippets")
public class Snippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String code;

    @Column(name = "is_public")
    private boolean isPublic;

    @Column(name = "share_id", unique = true)
    private String shareId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Snippet() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getTitle() { return title; }
    public String getCode() { return code; }
    public boolean isPublic() { return isPublic; }
    public String getShareId() { return shareId; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setTitle(String title) { this.title = title; }
    public void setCode(String code) { this.code = code; }
    public void setPublic(boolean aPublic) { isPublic = aPublic; }
    public void setShareId(String shareId) { this.shareId = shareId; }
}
