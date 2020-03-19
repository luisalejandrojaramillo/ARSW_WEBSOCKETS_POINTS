package edu.eci.arsw.collabpaint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.collabpaint"})
public class CollabPaintApplication {

	@RequestMapping

	public static void main(String[] args) {
		SpringApplication.run(CollabPaintApplication.class, args);
	}
}

