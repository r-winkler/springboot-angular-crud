package ch.renewinkler.demo_boot_angular.language;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class LanguageService {

    @Autowired
    LanguageRepository repository;

    public List<Language> findAll() {
        return repository.findAll();
    }
}
