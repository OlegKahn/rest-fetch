package com.example.restandfetch.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user").setViewName("user_page");
        registry.addViewController("/admin").setViewName("adminExample");
//        registry.addViewController("/example").setViewName("adminExample");
        registry.addViewController("/example2").setViewName("adminEx2");
        registry.addViewController("/login").setViewName("login");
    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/css/**", "/js/**")
//                .addResourceLocations("classpath:/static/css/", "classpath:/static/js/");
//    }
}