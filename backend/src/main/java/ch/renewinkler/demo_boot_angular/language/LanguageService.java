package ch.renewinkler.demo_boot_angular.language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageService {

    @Autowired
    LanguageRepository repository;

    public List<Language> findAll() {
        return repository.findAll();
    }
}
