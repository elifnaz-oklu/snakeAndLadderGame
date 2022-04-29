package com.example.app;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GameController {

    static Game createdGame;

    @PostMapping("/createGame")
    public Game createGame(@RequestBody GameModel gameModel) {
        createdGame = new Game(gameModel.getP1Name(),gameModel.getP2Name(),gameModel.getP3Name(),gameModel.getP4Name());
        CollectedData.games.add(createdGame);
        return createdGame;
    }

    @PutMapping("/updateStatus")
    public String setStatus(@RequestBody String status) {
        createdGame.setStatus(status);
         return createdGame.getStatus();
         
    }
}