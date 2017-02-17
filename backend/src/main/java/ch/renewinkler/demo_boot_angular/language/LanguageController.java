package ch.renewinkler.demo_boot_angular.language;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/language")
public class LanguageController {

    @Autowired
    LanguageService service;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public List<Language> findAll() {
        return service.findAll();
    }
}
