package com.example.app;

public class Move {

    private int dice;
    private String playerName;
    private int gameId;

    public Move(int gameId,String playerName,int dice) {
        this.dice = dice;
        this.playerName = playerName;
        this.gameId = gameId;
    }

    public int getDice() {
        return dice;
    }

    public void setDice(int dice) {
        this.dice = dice;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    /**
     * @return int return the gameId
     */
    public int getGameId() {
        return gameId;
    }

    /**
     * @param gameId the gameId to set
     */
    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

}