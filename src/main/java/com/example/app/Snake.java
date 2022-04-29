package com.example.app;

public class Snake {

    private int snakeMouth;
    private int snakeTail; 

    public Snake(int snakeMouth, int snakeTail) {
        this.snakeMouth = snakeMouth;
        this.snakeTail = snakeTail;
    }

    public int getSnakeMouth() {
        return snakeMouth;
    }

    public void setSnakeMouth(int snakeMouth) {
        this.snakeMouth = snakeMouth;
    }

    public int getSnakeTail() {
        return snakeTail;
    }

    public void setSnakeTail(int snakeTail) {
        this.snakeTail = snakeTail;
    }

}