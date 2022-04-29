package com.example.app;

public class Ladder {

    private int ladderStart;
    private int ladderEnd; 

    public Ladder(int ladderStart, int ladderEnd) {
        this.ladderStart = ladderStart;
        this.ladderEnd = ladderEnd;
    }

    public int getLadderStart() {
        return ladderStart;
    }

    public void setLadderStart(int ladderStart) {
        this.ladderStart = ladderStart;
    }

    public int getLadderEnd() {
        return ladderEnd;
    }

    public void setLadderEnd(int ladderEnd) {
        this.ladderEnd = ladderEnd;
    }

}