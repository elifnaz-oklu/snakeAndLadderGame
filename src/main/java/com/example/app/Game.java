package com.example.app;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class Game {

    private static AtomicInteger nextId = new AtomicInteger(0);
    private Player playerTurn;
    private int id;
    private ArrayList<Player> players = new ArrayList<Player>();
    private ArrayList<Snake> snakes = new ArrayList<Snake>();
    private ArrayList<Ladder> ladders = new ArrayList<Ladder>();
    private Timestamp createdAt ;
    private String status;
    
    // Game object has all components like snakes and ladder placements
    public Game(String p1Name,String p2Name,String p3Name, String p4Name) {
        this.id = getNextId();
        Player p1 = new Player(p1Name, 1);
        players.add(p1);
        Player p2 = new Player(p2Name, 1);
        players.add(p2);
        Player p3 = new Player(p3Name, 1);
        players.add(p3);
        Player p4 = new Player(p4Name, 1);
        players.add(p4);

        Snake s1 = new Snake(16,6);
        snakes.add(s1);
        Snake s2 = new Snake(49,11);
        snakes.add(s2);
        Snake s3 = new Snake(46,25);
        snakes.add(s3);
        Snake s4 = new Snake(62,19);
        snakes.add(s4);
        Snake s5 = new Snake(64,60);
        snakes.add(s5);
        Snake s6 = new Snake(74,53);
        snakes.add(s6);
        Snake s7 = new Snake(89,68);
        snakes.add(s7);
        Snake s8 = new Snake(92,88);
        snakes.add(s8);
        Snake s9 = new Snake(95,75);
        snakes.add(s9);
        Snake s10 = new Snake(99,80);
        snakes.add(s10);

        Ladder l1 = new Ladder(2,38);
        ladders.add(l1);
        Ladder l2 = new Ladder(7,14);
        ladders.add(l2);
        Ladder l3 = new Ladder(15,26);
        ladders.add(l3);
        Ladder l4 = new Ladder(8,31);
        ladders.add(l4);
        Ladder l5 = new Ladder(21,42);
        ladders.add(l5);
        Ladder l6 = new Ladder(36,44);
        ladders.add(l6);
        Ladder l7 = new Ladder(28,84);
        ladders.add(l7);
        Ladder l8 = new Ladder(51,67);
        ladders.add(l8);
        Ladder l9 = new Ladder(78,98);
        ladders.add(l9);
        Ladder l10 = new Ladder(87,94);
        ladders.add(l10);
        Ladder l11 = new Ladder(71,91);
        ladders.add(l11);
        createdAt = new Timestamp(System.currentTimeMillis());
        status = "started";
        playerTurn = p1;
    }

    public void setPlayerTurn(String playerName) {
        for (Player player : players) {
            if(player.getName().contentEquals(playerName)){
                this.playerTurn=player;
            }
        }
    }

    public void setPlayerTurn(Player player) {
        this.playerTurn=player;       
    }

    public Player getPlayerTurn() {
        return playerTurn;
    }
    //generating game id
    private static int getNextId() {
        return nextId.incrementAndGet();
    }

    /**
     * @return ArrayList<Player> return the players
     */
    public ArrayList<Player> getPlayers() {
        return players;
    }

    /**
     * @param players the players to set
     */
    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }

    /**
     * @return ArrayList<Snake> return the snakes
     */
    public ArrayList<Snake> getSnakes() {
        return snakes;
    }

    /**
     * @param snakes the snakes to set
     */
    public void setSnakes(ArrayList<Snake> snakes) {
        this.snakes = snakes;
    }

    /**
     * @return Timestamp return the createdAt
     */
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    /**
     * @return int return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @return ArrayList<Ladder> return the ladders
     */
    public ArrayList<Ladder> getLadders() {
        return ladders;
    }

    /**
     * @param ladders the ladders to set
     */
    public void setLadders(ArrayList<Ladder> ladders) {
        this.ladders = ladders;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

}