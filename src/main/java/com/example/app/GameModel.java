package com.example.app;
    
public class GameModel{
    private String p1Name;
    private String p2Name;
    private String p3Name;
    private String p4Name;

    public GameModel(String p1Name,String p2Name,String p3Name,String p4Name){
            this.p1Name = p1Name;
            this.p2Name = p2Name;
            this.p3Name = p3Name;
            this.p4Name = p4Name;
    }


    /**
     * @return String return the p1Name
     */
    public String getP1Name() {
        return p1Name;
    }

    /**
     * @param p1Name the p1Name to set
     */
    public void setP1Name(String p1Name) {
        this.p1Name = p1Name;
    }

    /**
     * @return String return the p2Name
     */
    public String getP2Name() {
        return p2Name;
    }

    /**
     * @param p2Name the p2Name to set
     */
    public void setP2Name(String p2Name) {
        this.p2Name = p2Name;
    }

    /**
     * @return String return the p3Name
     */
    public String getP3Name() {
        return p3Name;
    }

    /**
     * @param p3Name the p3Name to set
     */
    public void setP3Name(String p3Name) {
        this.p3Name = p3Name;
    }

    /**
     * @return String return the p4Name
     */
    public String getP4Name() {
        return p4Name;
    }

    /**
     * @param p4Name the p4Name to set
     */
    public void setP4Name(String p4Name) {
        this.p4Name = p4Name;
    }

}