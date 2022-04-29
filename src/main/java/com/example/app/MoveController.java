package com.example.app;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MoveController {
    
    Move m;

    @PostMapping("/addMove")
    public Move addMove(@RequestBody MoveModel moveModel) {
        m = new Move(GameController.createdGame.getId(),moveModel.getName(),moveModel.getDice());
        CollectedData.moves.add(m);
        return m;
    }
}