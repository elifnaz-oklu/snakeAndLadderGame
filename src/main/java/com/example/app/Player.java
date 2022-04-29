package com.example.app;

import java.util.concurrent.atomic.AtomicInteger;

public class Player {

    private static AtomicInteger nextId = new AtomicInteger(0);
    private int id;
    private String name;
    private int position; 

    public Player(String name, int position) {

        this.id = getNextId();
        this.name = name;
        this.position = position;
    }
    
    //generating player id
    private static int getNextId() {
        return nextId.incrementAndGet();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getId() {
        return id;
    }
    // function for changing position if there is a snake
    public void snakeBite(){
        for(Snake snake : GameController.createdGame.getSnakes()){

            if(snake.getSnakeMouth() == getPosition()){
                setPosition(snake.getSnakeTail());
            }

        }
    }
    
    // function for changing position if there is a ladder
    public void ladderUp(){
        for(Ladder ladder : GameController.createdGame.getLadders()){

            if(ladder.getLadderStart() == getPosition()){
                setPosition(ladder.getLadderEnd());
            }

        }
    }

}