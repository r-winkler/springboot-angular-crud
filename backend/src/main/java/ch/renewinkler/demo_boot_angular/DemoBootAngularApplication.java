package ch.renewinkler.demo_boot_angular;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class DemoBootAngularApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoBootAngularApplication.class, args);
	}
}
