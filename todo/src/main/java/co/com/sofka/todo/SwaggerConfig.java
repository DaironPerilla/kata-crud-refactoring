package co.com.sofka.todo;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;


/**
 * Clase que genera una interfaz para ver y hacer pruebas basicas
 * con la información de la API, para acceder a esta opción se
 * hace mediante la ruta donde se ejecuto la API y como endpoint se usa
 * "swagger-ui.html"
 * Ejemplo: http://localhost:8080/swagger-ui.html
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket apiDocket() { //RECORDAR CAMBIAR EL PAQUETE BASE AL PAQUETE BO DE CADA UNO
        return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors
                        .basePackage("co.com.sofka.todo.controller"))
                .paths(PathSelectors.any()).build()
                .apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo("Api test Sofka FullStact", "Back-End CRUD", "1.0", "",
                new Contact("Nombre", "Direccion URL", "Email"), "", "",
                Collections.emptyList());
    }
}