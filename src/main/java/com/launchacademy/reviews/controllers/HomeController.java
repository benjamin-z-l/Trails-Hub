package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/trails", "/trails/{id}"})
  public String forward() {
    return "forward:/";
  }
}