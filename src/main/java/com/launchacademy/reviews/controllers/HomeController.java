package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/trails", "/trails/{id}", "/trails/new", "/trails/{id}/edit", "/trails/{id}/reviews/new"})
  public String forward() {
    return "forward:/";
  }
}