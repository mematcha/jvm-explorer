package com.jvmexplorer.curriculum;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CurriculumModuleRepository extends JpaRepository<CurriculumModule, Long> {
    List<CurriculumModule> findAllByOrderBySortOrder();
    Optional<CurriculumModule> findByModuleId(String moduleId);
    boolean existsByModuleId(String moduleId);
}
