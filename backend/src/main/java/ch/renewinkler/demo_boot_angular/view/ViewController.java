package ch.renewinkler.demo_boot_angular.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * We need to provide a redirectUri in app.component.ts as follows:
 * this.oauthService.redirectUri = window.location.origin + "/welcome";
 * Note that the "/welcome" can not be omitted for proper functioning of the oauth-oidc-module.
 * Thus, we have to implement this controller in order to forward the welcome-requests to the index.html, so
 * that this mechanism of the oauth-oidc-module is also working under spring boot.
 *
 * http://stackoverflow.com/questions/38516667/springboot-angular2-how-to-handle-html5-urls
 */
@Controller
public class ViewController {

    @GetMapping({"/welcome"})
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping({"/en"})
    public String indexEnglish() {
        return "forward:/en/index.html";
    }

    @GetMapping({"/es"})
    public String indexSpanish() {
        return "forward:/es/index.html";
    }

    @GetMapping({"/de"})
    public String indexGerman() {
        return "forward:/de/index.html";
    }

    @GetMapping({"/*"})
    public String indexDefault() {
        return indexEnglish();
    }
}
