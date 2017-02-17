package ch.renewinkler.demo_boot_angular.language;

import org.springframework.data.jpa.repository.JpaRepository;

interface LanguageRepository extends JpaRepository<Language, Long> {
}
