package com.bookmate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador para servir páginas HTML estáticas
 * Maneja el enrutamiento de las vistas principales de BookMate
 * 
 * @author Equipo BookMate
 * @version 1.0.0
 */
@Controller
public class StaticController {

    /**
     * Página principal (Landing Page)
     */
    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    /**
     * Catálogo de libros
     */
    @GetMapping("/catalog")
    public String catalog() {
        return "forward:/catalog.html";
    }

    /**
     * Detalles de libro
     */
    @GetMapping("/details")
    public String details() {
        return "forward:/details.html";
    }

    /**
     * Biblioteca personal
     */
    @GetMapping("/library")
    public String library() {
        return "forward:/library.html";
    }

    /**
     * Acerca de
     */
    @GetMapping("/about")
    public String about() {
        return "forward:/about.html";
    }

    /**
     * Panel de administración
     */
    @GetMapping("/admin")
    public String admin() {
        return "forward:/admin.html";
    }

    /**
     * Página de debug de autenticación
     */
    @GetMapping("/debug-auth")
    public String debugAuth() {
        return "forward:/debug-auth.html";
    }
}





