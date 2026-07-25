CREATE TABLE snippets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    project_id BIGINT REFERENCES projects(id),
    title VARCHAR(200) NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(20) NOT NULL DEFAULT 'java',
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_snippets_user_id ON snippets(user_id);
CREATE INDEX idx_snippets_project_id ON snippets(project_id);
CREATE INDEX idx_snippets_public ON snippets(is_public) WHERE is_public = true;
