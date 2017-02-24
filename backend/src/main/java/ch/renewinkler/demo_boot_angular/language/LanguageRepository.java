package ch.renewinkler.demo_boot_angular.language;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface LanguageRepository extends JpaRepository<Language, Long> {

    String LANGUAGE_CACHE = "languages";

    @Cacheable(LANGUAGE_CACHE)
    List<Language> findAll();
}
