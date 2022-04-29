package com.example.app;
    
public class MoveModel{
    private String name;
    private int dice;

    public MoveModel(String name,int dice){
            this.name = name;
            this.dice = dice;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return int return the dice
     */
    public int getDice() {
        return dice;
    }

    /**
     * @param dice the dice to set
     */
    public void setDice(int dice) {
        this.dice = dice;
    }

}