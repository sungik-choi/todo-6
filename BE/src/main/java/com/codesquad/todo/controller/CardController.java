package com.codesquad.todo.controller;

import com.codesquad.todo.domain.*;
import com.codesquad.todo.dto.CardDto;
import com.codesquad.todo.exeption.NotFoundData;
import com.codesquad.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class CardController {

  @Autowired
  TodoService todoService;

  @PostMapping("/column/{columnId}/card")
  public ResponseEntity<ApiResponse> createCard(@PathVariable Long columnId, @RequestBody @Valid Card card,  @RequestAttribute User user) {
    CardDto newCard = todoService.createCard(columnId, card, user);
    return new ResponseEntity<>(new ApiResponse("SUCCESS", newCard), HttpStatus.OK);
  }

  @PutMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> updateCard(@PathVariable int cardId, Card card) {
    return null;
  }

  @GetMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> moveCard(@RequestParam int source,
                                              @RequestParam int destination,
                                              @PathVariable int cardId)
  {
    return null;
  }

  @DeleteMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> deleteCard(@PathVariable int cardId) {
    return null;
  }
}
