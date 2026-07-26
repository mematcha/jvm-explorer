package com.jvmexplorer.curriculum;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/curriculum")
public class CurriculumController {

    private final CurriculumModuleRepository moduleRepo;

    public CurriculumController(CurriculumModuleRepository moduleRepo) {
        this.moduleRepo = moduleRepo;
    }

    @GetMapping
    public List<CurriculumResponse> getAll() {
        return moduleRepo.findAllByOrderBySortOrder().stream()
                .map(CurriculumResponse::from)
                .toList();
    }
}
