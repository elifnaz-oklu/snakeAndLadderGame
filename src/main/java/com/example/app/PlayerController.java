package com.example.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PlayerController {

    @PutMapping("/updatePosition")
    public int setPosition(@RequestBody PlayerModel playerModel) {
        for (Player player : GameController.createdGame.getPlayers()) {
            if(player.getName().contentEquals(playerModel.getName())){
                player.setPosition(playerModel.getPosition());
                player.snakeBite();
                player.ladderUp();
                return player.getPosition();
            }  
        } 
        return 0;
    }

    @GetMapping("/resetPositions")
    public Boolean resetPosition() {
        for (Player player : GameController.createdGame.getPlayers()) {
            {
                player.setPosition(1);
                GameController.createdGame.setPlayerTurn(GameController.createdGame.getPlayers().get(0));
            }  
        }
        
        return true;
    }
}