package com.jvmexplorer.curriculum;

import java.util.List;

public record CurriculumResponse(
    String moduleId,
    String level,
    String title,
    String description,
    int sortOrder,
    List<LessonResponse> lessons
) {
    public static CurriculumResponse from(CurriculumModule module) {
        var lessons = module.getLessons().stream()
            .map(LessonResponse::from)
            .toList();
        return new CurriculumResponse(
            module.getModuleId(), module.getLevel(),
            module.getTitle(), module.getDescription(),
            module.getSortOrder(), lessons);
    }
}

record LessonResponse(
    String lessonId,
    String title,
    String description,
    String code,
    String[] concepts,
    CheckpointResponse checkpoint
) {
    static LessonResponse from(Lesson lesson) {
        var concepts = lesson.getConcepts() != null
            ? lesson.getConcepts().split(",")
            : new String[0];
        CheckpointResponse cp = null;
        if (lesson.getCheckpointJson() != null && !lesson.getCheckpointJson().isBlank()) {
            var parts = lesson.getCheckpointJson().split("\\|", 4);
            if (parts.length == 4) {
                cp = new CheckpointResponse(parts[0], parts[1].split(","),
                    Integer.parseInt(parts[2]), parts[3]);
            }
        }
        return new LessonResponse(lesson.getLessonId(), lesson.getTitle(),
            lesson.getDescription(), lesson.getCode(), concepts, cp);
    }
}

record CheckpointResponse(
    String question,
    String[] options,
    int correctIndex,
    String explanation
) {}
