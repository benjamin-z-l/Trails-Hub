package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptions.InvalidFormDataException;
import com.launchacademy.reviews.exceptions.ReviewNotFoundException;
import com.launchacademy.reviews.exceptions.TrailNotFoundException;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.models.ReviewForm;
import com.launchacademy.reviews.models.Trail;
import com.launchacademy.reviews.services.ReviewFormService;
import com.launchacademy.reviews.services.ReviewService;
import com.launchacademy.reviews.services.TrailService;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/trails")
public class TrailsApiV1Controller {
  private final TrailService trailService;
  private final ReviewFormService reviewFormService;
  private final ReviewService reviewService;

  @Autowired
  public TrailsApiV1Controller(TrailService trailService,
      ReviewFormService reviewFormService, ReviewService reviewService) {
    this.trailService = trailService;
    this.reviewFormService = reviewFormService;
    this.reviewService = reviewService;
  }

  @GetMapping
  public Map<String, Iterable<Trail>> getAllTrails(){
    Map<String, Iterable<Trail>> trailMap = new HashMap<>();
    trailMap.put("trails", trailService.findAll());
    return trailMap;
  }

  @GetMapping("/{id}")
  public Map<String, Trail> getSingleTrail(@PathVariable Integer id) {
    Trail trail = trailService.findById(id)
        .orElseThrow(() -> new TrailNotFoundException(id));
    Map<String, Trail> trailMap = new HashMap<>();
    trailMap.put("trail", trail);
    return trailMap;
  }

  @PostMapping
  public ResponseEntity<Trail> addNewTrail(@RequestBody @Valid Trail trail, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new InvalidFormDataException(bindingResult.getFieldErrors());
    }
    else {
      return new ResponseEntity<>(trailService.save(trail), HttpStatus.OK);
    }
  }

  @PostMapping("/{id}/reviews")
  public ResponseEntity<Review> createReview(@RequestBody @Valid ReviewForm reviewForm, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new InvalidFormDataException(bindingResult.getFieldErrors());
    }
    else {
      return new ResponseEntity<>(reviewFormService.processForm(reviewForm), HttpStatus.OK);
    }
  }

  @PutMapping("/{id}/reviews/{reviewId}")
  public ResponseEntity<Review> editReview(@RequestBody @Valid Review reviewUpdate, BindingResult bindingResult, @PathVariable Integer reviewId) {
    if (bindingResult.hasErrors()) {
      throw new InvalidFormDataException(bindingResult.getFieldErrors());
    }
    else {
      Review review = reviewService.findById(reviewId).orElseThrow(() -> new ReviewNotFoundException(reviewId));
      return new ResponseEntity<>(reviewService.updateReview(review, reviewUpdate), HttpStatus.ACCEPTED);
    }
  }

  @PutMapping("/{id}/edit")
  public ResponseEntity<HttpStatus> updateTrail(@RequestBody @Valid Trail trail, BindingResult bindingResult, @PathVariable Integer id) {
    if (bindingResult.hasErrors()) {
      throw new InvalidFormDataException(bindingResult.getFieldErrors());
    } else {
      trailService.findById(id).orElseThrow(() -> new TrailNotFoundException(id));
      trailService.save(trail);
      return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<HttpStatus> deleteTrail(@PathVariable Integer id) {
    trailService.findById(id).orElseThrow(() -> new TrailNotFoundException(id));
    trailService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/{trailId}/reviews/{id}")
  public ResponseEntity<HttpStatus> deleteReview(@PathVariable Integer id) {
    reviewService.findById(id).orElseThrow(() -> new ReviewNotFoundException(id));
    reviewService.deleteById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}