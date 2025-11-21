package com.medilytics.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

   @Bean
   public WebMvcConfigurer corsConfigurer() {
       return new WebMvcConfigurer() {
           @Override
           public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/**") // Allow all endpoints
                       .allowedOrigins(
                                "http://localhost:3000",
                                "https://medilytics.vercel.app"
                        ) // Allow React app origin
                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
                       .allowedHeaders("*") // Allow all headers
                       //.maxAge(3600)
                       .allowCredentials(true); // Allow credentials (if you need it)
           }
       };
   }
}

// package com.medilytics.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.List;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration config = new CorsConfiguration();

//         config.setAllowCredentials(true);
//         config.setAllowedHeaders(List.of("*"));
//         config.setAllowedMethods(List.of("*"));

//         // FIX: use allowedOriginPatterns (NOT allowedOrigins)
//         config.setAllowedOriginPatterns(List.of(
//                 "http://localhost:3000",
//                 "https://medilytics.vercel.app",
//                 "https://*.vercel.app"
//         ));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);

//         return source;
//     }
// }
