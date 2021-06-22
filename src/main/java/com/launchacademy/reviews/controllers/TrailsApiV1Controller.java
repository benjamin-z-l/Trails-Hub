package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.Trail;
import com.launchacademy.reviews.services.TrailService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/trails")
public class TrailsApiV1Controller {
  private TrailService trailService;

  @Autowired
  public TrailsApiV1Controller(TrailService trailService) {
    this.trailService = trailService;
  }

  @GetMapping
  public Map<String, Iterable<Trail>> getAllTrails(){
    Map<String, Iterable<Trail>> trailMap = new HashMap<>();
    trailMap.put("trails", trailService.findAll());
    return trailMap;
  }
}
