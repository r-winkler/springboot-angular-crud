package ch.renewinkler.demo_boot_angular.language;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/language")
public class LanguageController {

    @Autowired
    LanguageService service;

    @GetMapping(produces = "application/json")
    public List<Language> findAll() {
        return service.findAll();
    }

    @PutMapping(value = "/clear")
    public void clearCache() {
        service.clearCache();
    }
}
