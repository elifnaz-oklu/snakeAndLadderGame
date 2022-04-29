import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import './home.css'
import { Button } from 'antd';


const Home = (props) => {

  const [showDot1, setShowDot1] = React.useState(0);
  const [showDot2, setShowDot2] = React.useState(0);
  const [showDot3, setShowDot3] = React.useState(0);
  const [showDot4, setShowDot4] = React.useState(0);
  const [turns, setTurns] = React.useState(0);
  
  //Can be improved by adding a form to collect input data for player names
  const avatars = [["Blue",showDot1],
  ["Pink",showDot2],
  ["Purple",showDot3],
  ["Orange",showDot4],
  ];

  // function for making call to updatePosition of the player and if game is finished update status
  function movePlayer(playerTurn,position) {
    fetch("/updatePosition", {
      method: "PUT",
      body: JSON.stringify({
          name: playerTurn,
          position: position
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }}).then(async response => {
      try {
       const data = await response.json()
       if(turns%4 === 0){ setShowDot1(data);}
       if(turns%4 === 1){ setShowDot2(data);}
       if(turns%4 === 2){ setShowDot3(data);}
       if(turns%4 === 3){ setShowDot4(data);}
       if(data === 100){ //checking if game is finished
         const message = "Player " + playerTurn+ " won ";
         document.getElementById("message").textContent=message;
         document.getElementById("roll").style.visibility = "hidden";
         document.getElementById("reset").style.visibility = "hidden";
         updateStatus(playerTurn);
         return true;
        }
        return false;
     } catch(error) {
       console.log('Error happened here!')
     }
    })
  }
  // function for recording each game moves
  function addMove(playerTurn,rolledDice) {
    fetch("/addMove", {
      method: "POST",
      body: JSON.stringify({
          name: playerTurn,
          dice: rolledDice
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }}).then(async response => {
      try {
       const data = await response.json();
     } catch(error) {
       console.log('Error happened here!')
     }
    })
  }


  //funtion that triggered by Roll Dice button

  function rollDice() {

    let playerTurn = avatars[turns%4][0];
    let dice1 = Math.floor(Math.random() * 6)+1;;
    let dice2 = Math.floor(Math.random() * 6)+1;;
    let isDouble = false;
    let doubleMsg = "";
    let message;
    let rolledDice = dice1+dice2;
    let position = avatars[turns%4][1]+rolledDice;

    if(dice1 === dice2){
      isDouble = true; doubleMsg = " It's double " + playerTurn + " will roll another dice";
    }
    else{isDouble = false}
    addMove(playerTurn,rolledDice);
    if(position > 100){  //rule checking whether players position is >100
      position = 200 -position;
    }
    const isFinished = movePlayer(playerTurn,position); //boolean for checking game is finished

    if(!isFinished){    

      message = "Player " + playerTurn+ " rolled " + rolledDice + "." + doubleMsg;
      document.getElementById("message").textContent=message;}

    if(!isDouble){ //rule checking if there is double,if there isn't double player turn changes
      setTurns(turns+1);
      playerTurn = avatars[(turns+1)%4][0];
      message = message + " Next Turn is " + playerTurn ;
      document.getElementById("message").textContent=message;

    }
  }

  //funtion that triggered by Reset button

  function resetGame() {
    fetch("/resetPositions");
    setTurns(0);
    setShowDot1(1);
    setShowDot2(1);
    setShowDot3(1);
    setShowDot4(1);
    const message = " Game Reset ";
    document.getElementById("message").textContent=message;
    document.getElementById("roll").disabled = false;
  }

  //funtion for updating Game object status when game is finished by making PUT call

  function updateStatus(playerTurn) {
    fetch("/updateStatus", {
      method: "PUT",
      body: JSON.stringify({
          status: "Game Over. " + playerTurn + " won."
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }}).then(async response => {
      try {
       const data = await response.json();
     } catch(error) {
       console.log('Error happened here!')
     }
    })
  }

  useEffect(() => {
    document.getElementById("roll").style.visibility = "hidden";
    document.getElementById("reset").style.visibility = "hidden";
  }, []);

  //funtion that triggered by createGame button
  function createGame() {
    fetch("/createGame", {
      method: "POST",
      body: JSON.stringify({
        p1Name: avatars[0][0],
        p2Name: avatars[1][0],
        p3Name: avatars[2][0],
        p4Name: avatars[3][0],
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }}).then(async response => {
      try {
       await response.json()
     } catch(error) {
       console.log('Error happened here!')
     }
    })
    setTurns(0);
    setShowDot1(1);
    setShowDot2(1);
    setShowDot3(1);
    setShowDot4(1);
    const message = " Game Created ";
    document.getElementById("message").textContent=message;
    document.getElementById("roll").style.visibility = "visible";
    document.getElementById("reset").style.visibility = "visible";
  }
  //creating game board
  return (
    <div className="home-container">
      <Helmet>
        <title>Snakes and Ladders Game</title>
        <meta property="og:title" content="Snakes and Ladders Game" />
      </Helmet>
      <div className="home-containermenu">
        <Button id="roll"  className="button" onClick={rollDice}><p>Roll Dice</p></Button>
        <Button id="reset" className="button" onClick={resetGame}><p>Reset Game</p></Button>
        <Button className="button" onClick={createGame}><p>Create Game</p></Button>
        <span id="message" className="alert-message"></span>
      </div>
      <div className="home-container001">
        <div className="home-container002">
          <span className='number'>100</span>
          { showDot1===100 ? <Button className="player1"/> : null }
          { showDot2===100 ? <Button className="player2"/> : null }
          { showDot3===100 ? <Button className="player3"/> : null }
          { showDot4===100 ? <Button className="player4"/> : null } 
        </div>
        <div className="home-container003">
          <span className='number'>99</span>
          { showDot1===99 ? <Button className="player1"/> : null }
          { showDot2===99 ? <Button className="player2"/> : null }
          { showDot3===99 ? <Button className="player3"/> : null }
          { showDot4===99 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container004">
          <span className='number'>98</span>
          { showDot1===98 ? <Button className="player1"/> : null }
          { showDot2===98 ? <Button className="player2"/> : null }
          { showDot3===98 ? <Button className="player3"/> : null }
          { showDot4===98 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container005">
          <span className='number'>97</span>
          { showDot1===97 ? <Button className="player1"/> : null }
          { showDot2===97 ? <Button className="player2"/> : null }
          { showDot3===97 ? <Button className="player3"/> : null }
          { showDot4===97 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container006">
          <span className='number'>96</span>
          { showDot1===96 ? <Button className="player1"/> : null }
          { showDot2===96 ? <Button className="player2"/> : null }
          { showDot3===96 ? <Button className="player3"/> : null }
          { showDot4===96 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container007">
          <span className='number'>95</span>
          { showDot1===95 ? <Button className="player1"/> : null }
          { showDot2===95 ? <Button className="player2"/> : null }
          { showDot3===95 ? <Button className="player3"/> : null }
          { showDot4===95 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container008">
          <span className='number'>94</span>
          { showDot1===94 ? <Button className="player1"/> : null }
          { showDot2===94 ? <Button className="player2"/> : null }
          { showDot3===94 ? <Button className="player3"/> : null }
          { showDot4===94 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container009">
          <span className='number'>93</span>
          { showDot1===93 ? <Button className="player1"/> : null }
          { showDot2===93 ? <Button className="player2"/> : null }
          { showDot3===93 ? <Button className="player3"/> : null }
          { showDot4===93 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container010">
          <span className='number'>92</span>
          { showDot1===92 ? <Button className="player1"/> : null }
          { showDot2===92 ? <Button className="player2"/> : null }
          { showDot3===92 ? <Button className="player3"/> : null }
          { showDot4===92 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container011">
          <span className='number'>91</span>
          { showDot1===91 ? <Button className="player1"/> : null }
          { showDot2===91 ? <Button className="player2"/> : null }
          { showDot3===91 ? <Button className="player3"/> : null }
          { showDot4===91 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container012">
        <div className="home-container013">
          <span className='number'>81</span>
          { showDot1===81 ? <Button className="player1"/> : null }
          { showDot2===81 ? <Button className="player2"/> : null }
          { showDot3===81 ? <Button className="player3"/> : null }
          { showDot4===81 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container014">
          <span className='number'>82</span>
          { showDot1===82 ? <Button className="player1"/> : null }
          { showDot2===82 ? <Button className="player2"/> : null }
          { showDot3===82 ? <Button className="player3"/> : null }
          { showDot4===82 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container015">
          <span className='number'>83</span>
          { showDot1===83 ? <Button className="player1"/> : null }
          { showDot2===83 ? <Button className="player2"/> : null }
          { showDot3===83 ? <Button className="player3"/> : null }
          { showDot4===83 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container016">
          <span className='number'>84</span>
          { showDot1===84 ? <Button className="player1"/> : null }
          { showDot2===84 ? <Button className="player2"/> : null }
          { showDot3===84 ? <Button className="player3"/> : null }
          { showDot4===84 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container017">
          <span className='number'>85</span>
          { showDot1===85 ? <Button className="player1"/> : null }
          { showDot2===85 ? <Button className="player2"/> : null }
          { showDot3===85 ? <Button className="player3"/> : null }
          { showDot4===85 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container018">
          <span className='number'>86</span>
          { showDot1===86 ? <Button className="player1"/> : null }
          { showDot2===86 ? <Button className="player2"/> : null }
          { showDot3===86 ? <Button className="player3"/> : null }
          { showDot4===86 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container019">
          <span className='number'>87</span>
          { showDot1===87 ? <Button className="player1"/> : null }
          { showDot2===87 ? <Button className="player2"/> : null }
          { showDot3===87 ? <Button className="player3"/> : null }
          { showDot4===87 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container020">
          <span className='number'>88</span>
          { showDot1===88 ? <Button className="player1"/> : null }
          { showDot2===88 ? <Button className="player2"/> : null }
          { showDot3===88 ? <Button className="player3"/> : null }
          { showDot4===88 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container021">
          <span className='number'>89</span>
          { showDot1===89 ? <Button className="player1"/> : null }
          { showDot2===89 ? <Button className="player2"/> : null }
          { showDot3===89 ? <Button className="player3"/> : null }
          { showDot4===89 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container022">
          <span className='number'>90</span>
          { showDot1===90 ? <Button className="player1"/> : null }
          { showDot2===90 ? <Button className="player2"/> : null }
          { showDot3===90 ? <Button className="player3"/> : null }
          { showDot4===90 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container023">
        <div className="home-container024">
          <span className='number'>80</span>
          { showDot1===80 ? <Button className="player1"/> : null }
          { showDot2===80 ? <Button className="player2"/> : null }
          { showDot3===80 ? <Button className="player3"/> : null }
          { showDot4===80 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container025">
          <span className='number'>79</span>
          { showDot1===79 ? <Button className="player1"/> : null }
          { showDot2===79 ? <Button className="player2"/> : null }
          { showDot3===79 ? <Button className="player3"/> : null }
          { showDot4===79 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container026">
          <span className='number'>78</span>
          { showDot1===78 ? <Button className="player1"/> : null }
          { showDot2===78 ? <Button className="player2"/> : null }
          { showDot3===78 ? <Button className="player3"/> : null }
          { showDot4===78 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container027">
          <span className='number'>77</span>
          { showDot1===77 ? <Button className="player1"/> : null }
          { showDot2===77 ? <Button className="player2"/> : null }
          { showDot3===77 ? <Button className="player3"/> : null }
          { showDot4===77 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container028">
          <span className='number'>76</span>
          { showDot1===76 ? <Button className="player1"/> : null }
          { showDot2===76 ? <Button className="player2"/> : null }
          { showDot3===76 ? <Button className="player3"/> : null }
          { showDot4===76 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container029">
          <span className='number'>75</span>
          { showDot1===75 ? <Button className="player1"/> : null }
          { showDot2===75 ? <Button className="player2"/> : null }
          { showDot3===75 ? <Button className="player3"/> : null }
          { showDot4===75 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container030">
          <span className='number'>74</span>
          { showDot1===74 ? <Button className="player1"/> : null }
          { showDot2===74 ? <Button className="player2"/> : null }
          { showDot3===74 ? <Button className="player3"/> : null }
          { showDot4===74 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container031">
          <span className='number'>73</span>
          { showDot1===73 ? <Button className="player1"/> : null }
          { showDot2===73 ? <Button className="player2"/> : null }
          { showDot3===73 ? <Button className="player3"/> : null }
          { showDot4===73 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container032">
          <span className='number'>72</span>
          { showDot1===72 ? <Button className="player1"/> : null }
          { showDot2===72 ? <Button className="player2"/> : null }
          { showDot3===72 ? <Button className="player3"/> : null }
          { showDot4===72 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container033">
          <span className='number'>71</span>
          { showDot1===71 ? <Button className="player1"/> : null }
          { showDot2===71 ? <Button className="player2"/> : null }
          { showDot3===71 ? <Button className="player3"/> : null }
          { showDot4===71 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container034">
        <div className="home-container035">
          <span className='number'>61</span>
          { showDot1===61 ? <Button className="player1"/> : null }
          { showDot2===61 ? <Button className="player2"/> : null }
          { showDot3===61 ? <Button className="player3"/> : null }
          { showDot4===61 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container036">
          <span className='number'>62</span>
          { showDot1===62 ? <Button className="player1"/> : null }
          { showDot2===62 ? <Button className="player2"/> : null }
          { showDot3===62 ? <Button className="player3"/> : null }
          { showDot4===62 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container037">
          <span className='number'>63</span>
          { showDot1===63 ? <Button className="player1"/> : null }
          { showDot2===63 ? <Button className="player2"/> : null }
          { showDot3===63 ? <Button className="player3"/> : null }
          { showDot4===63 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container038">
          <span className='number'>64</span>
          { showDot1===64 ? <Button className="player1"/> : null }
          { showDot2===64 ? <Button className="player2"/> : null }
          { showDot3===64 ? <Button className="player3"/> : null }
          { showDot4===64 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container039">
          <span className='number'>65</span>
          { showDot1===65 ? <Button className="player1"/> : null }
          { showDot2===65 ? <Button className="player2"/> : null }
          { showDot3===65 ? <Button className="player3"/> : null }
          { showDot4===65 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container040">
          <span className='number'>66</span>
          { showDot1===66 ? <Button className="player1"/> : null }
          { showDot2===66 ? <Button className="player2"/> : null }
          { showDot3===66 ? <Button className="player3"/> : null }
          { showDot4===66 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container041">
          <span className='number'>67</span>
          { showDot1===67 ? <Button className="player1"/> : null }
          { showDot2===67 ? <Button className="player2"/> : null }
          { showDot3===67 ? <Button className="player3"/> : null }
          { showDot4===67 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container042">
        <span className='number'>68</span>
          { showDot1===68 ? <Button className="player1"/> : null }
          { showDot2===68 ? <Button className="player2"/> : null }
          { showDot3===68 ? <Button className="player3"/> : null }
          { showDot4===68 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container043">
          <span className='number'>69</span>
          { showDot1===69 ? <Button className="player1"/> : null }
          { showDot2===69 ? <Button className="player2"/> : null }
          { showDot3===69 ? <Button className="player3"/> : null }
          { showDot4===69 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container044">
          <span className='number'>70</span>
          { showDot1===70 ? <Button className="player1"/> : null }
          { showDot2===70 ? <Button className="player2"/> : null }
          { showDot3===70 ? <Button className="player3"/> : null }
          { showDot4===70 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container045">
        <div className="home-container046">
          <span className='number'>60</span>
          { showDot1===60 ? <Button className="player1"/> : null }
          { showDot2===60 ? <Button className="player2"/> : null }
          { showDot3===60 ? <Button className="player3"/> : null }
          { showDot4===60 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container047">
          <span className='number'>59</span>
          { showDot1===59 ? <Button className="player1"/> : null }
          { showDot2===59 ? <Button className="player2"/> : null }
          { showDot3===59 ? <Button className="player3"/> : null }
          { showDot4===59 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container048">
          <span className='number'>58</span>
          { showDot1===58 ? <Button className="player1"/> : null }
          { showDot2===58 ? <Button className="player2"/> : null }
          { showDot3===58 ? <Button className="player3"/> : null }
          { showDot4===58 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container049">
          <span className='number'>57</span>
          { showDot1===57 ? <Button className="player1"/> : null }
          { showDot2===57 ? <Button className="player2"/> : null }
          { showDot3===57 ? <Button className="player3"/> : null }
          { showDot4===57 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container050">
          <span className='number'>56</span>
          { showDot1===56 ? <Button className="player1"/> : null }
          { showDot2===56 ? <Button className="player2"/> : null }
          { showDot3===56 ? <Button className="player3"/> : null }
          { showDot4===56 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container051">
          <span className='number'>55</span>
          { showDot1===55 ? <Button className="player1"/> : null }
          { showDot2===55 ? <Button className="player2"/> : null }
          { showDot3===55 ? <Button className="player3"/> : null }
          { showDot4===55 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container052">
          <span className='number'>54</span>
          { showDot1===54 ? <Button className="player1"/> : null }
          { showDot2===54 ? <Button className="player2"/> : null }
          { showDot3===54 ? <Button className="player3"/> : null }
          { showDot4===54 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container053">
          <span className='number'>53</span>
          { showDot1===53 ? <Button className="player1"/> : null }
          { showDot2===53 ? <Button className="player2"/> : null }
          { showDot3===53 ? <Button className="player3"/> : null }
          { showDot4===53 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container054">
          <span className='number'>52</span>
          { showDot1===52 ? <Button className="player1"/> : null }
          { showDot2===52 ? <Button className="player2"/> : null }
          { showDot3===52 ? <Button className="player3"/> : null }
          { showDot4===52 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container055">
          <span className='number'>51</span>
          { showDot1===51 ? <Button className="player1"/> : null }
          { showDot2===51 ? <Button className="player2"/> : null }
          { showDot3===51 ? <Button className="player3"/> : null }
          { showDot4===51 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container056">
        <div className="home-container057">
          <span className='number'>41</span>
          { showDot1===41 ? <Button className="player1"/> : null }
          { showDot2===41 ? <Button className="player2"/> : null }
          { showDot3===41 ? <Button className="player3"/> : null }
          { showDot4===41 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container058">
          <span className='number'>42</span>
          { showDot1===42 ? <Button className="player1"/> : null }
          { showDot2===42 ? <Button className="player2"/> : null }
          { showDot3===42 ? <Button className="player3"/> : null }
          { showDot4===42 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container059">
          <span className='number'>43</span>
          { showDot1===43 ? <Button className="player1"/> : null }
          { showDot2===43 ? <Button className="player2"/> : null }
          { showDot3===43 ? <Button className="player3"/> : null }
          { showDot4===43 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container060">
          <span className='number'>44</span>
          { showDot1===44 ? <Button className="player1"/> : null }
          { showDot2===44 ? <Button className="player2"/> : null }
          { showDot3===44 ? <Button className="player3"/> : null }
          { showDot4===44 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container061">
          <span className='number'>45</span>
          { showDot1===45 ? <Button className="player1"/> : null }
          { showDot2===45 ? <Button className="player2"/> : null }
          { showDot3===45 ? <Button className="player3"/> : null }
          { showDot4===45 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container062">
          <span className='number'>46</span>
          { showDot1===46 ? <Button className="player1"/> : null }
          { showDot2===46 ? <Button className="player2"/> : null }
          { showDot3===46 ? <Button className="player3"/> : null }
          { showDot4===46 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container063">
          <span className='number'>47</span>
          { showDot1===47 ? <Button className="player1"/> : null }
          { showDot2===47 ? <Button className="player2"/> : null }
          { showDot3===47 ? <Button className="player3"/> : null }
          { showDot4===47 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container064">
          <span className='number'>48</span>
          { showDot1===48 ? <Button className="player1"/> : null }
          { showDot2===48 ? <Button className="player2"/> : null }
          { showDot3===48 ? <Button className="player3"/> : null }
          { showDot4===48 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container065">
          <span className='number'>49</span>
          { showDot1===49 ? <Button className="player1"/> : null }
          { showDot2===49 ? <Button className="player2"/> : null }
          { showDot3===49 ? <Button className="player3"/> : null }
          { showDot4===49 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container066">
          <span className='number'>50</span>
          { showDot1===50 ? <Button className="player1"/> : null }
          { showDot2===50 ? <Button className="player2"/> : null }
          { showDot3===50 ? <Button className="player3"/> : null }
          { showDot4===50 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container067">
        <div className="home-container068">
          <span className='number'>40</span>
          { showDot1===40 ? <Button className="player1"/> : null }
          { showDot2===40 ? <Button className="player2"/> : null }
          { showDot3===40 ? <Button className="player3"/> : null }
          { showDot4===40 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container069">
          <span className='number'>39</span>
          { showDot1===39 ? <Button className="player1"/> : null }
          { showDot2===39 ? <Button className="player2"/> : null }
          { showDot3===39 ? <Button className="player3"/> : null }
          { showDot4===39 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container070">
          <span className='number'>38</span>
          { showDot1===38 ? <Button className="player1"/> : null }
          { showDot2===38 ? <Button className="player2"/> : null }
          { showDot3===38 ? <Button className="player3"/> : null }
          { showDot4===38 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container071">
          <span className='number'>37</span>
          { showDot1===37 ? <Button className="player1"/> : null }
          { showDot2===37 ? <Button className="player2"/> : null }
          { showDot3===37 ? <Button className="player3"/> : null }
          { showDot4===37 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container072">
          <span className='number'>36</span>
          { showDot1===36 ? <Button className="player1"/> : null }
          { showDot2===36 ? <Button className="player2"/> : null }
          { showDot3===36 ? <Button className="player3"/> : null }
          { showDot4===36 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container073">
          <span className='number'>35</span>
          { showDot1===35 ? <Button className="player1"/> : null }
          { showDot2===35 ? <Button className="player2"/> : null }
          { showDot3===35 ? <Button className="player3"/> : null }
          { showDot4===35 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container074">
          <span className='number'>34</span>
          { showDot1===34 ? <Button className="player1"/> : null }
          { showDot2===34 ? <Button className="player2"/> : null }
          { showDot3===34 ? <Button className="player3"/> : null }
          { showDot4===34 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container075">
          <span className='number'>33</span>
          { showDot1===33 ? <Button className="player1"/> : null }
          { showDot2===33 ? <Button className="player2"/> : null }
          { showDot3===33 ? <Button className="player3"/> : null }
          { showDot4===33 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container076">
          <span className='number'>32</span>
          { showDot1===32 ? <Button className="player1"/> : null }
          { showDot2===32 ? <Button className="player2"/> : null }
          { showDot3===32 ? <Button className="player3"/> : null }
          { showDot4===32 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container077">
          <span className='number'>31</span>
          { showDot1===31 ? <Button className="player1"/> : null }
          { showDot2===31 ? <Button className="player2"/> : null }
          { showDot3===31 ? <Button className="player3"/> : null }
          { showDot4===31 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container078">
        <div className="home-container079">
          <span className='number'>21</span>
          { showDot1===21 ? <Button className="player1"/> : null }
          { showDot2===21 ? <Button className="player2"/> : null }
          { showDot3===21 ? <Button className="player3"/> : null }
          { showDot4===21 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container080">
          <span className='number'>22</span>
          { showDot1===22 ? <Button className="player1"/> : null }
          { showDot2===22 ? <Button className="player2"/> : null }
          { showDot3===22 ? <Button className="player3"/> : null }
          { showDot4===22 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container081">
          <span className='number'>23</span>
          { showDot1===23 ? <Button className="player1"/> : null }
          { showDot2===23 ? <Button className="player2"/> : null }
          { showDot3===23 ? <Button className="player3"/> : null }
          { showDot4===23 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container082">
          <span className='number'>24</span>
          { showDot1===24 ? <Button className="player1"/> : null }
          { showDot2===24 ? <Button className="player2"/> : null }
          { showDot3===24 ? <Button className="player3"/> : null }
          { showDot4===24 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container083">
          <span className='number'>25</span>
          { showDot1===25 ? <Button className="player1"/> : null }
          { showDot2===25 ? <Button className="player2"/> : null }
          { showDot3===25 ? <Button className="player3"/> : null }
          { showDot4===25 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container084">
          <span className='number'>26</span>
          { showDot1===26 ? <Button className="player1"/> : null }
          { showDot2===26 ? <Button className="player2"/> : null }
          { showDot3===26 ? <Button className="player3"/> : null }
          { showDot4===26 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container085">
          <span className='number'>27</span>
          { showDot1===27 ? <Button className="player1"/> : null }
          { showDot2===27 ? <Button className="player2"/> : null }
          { showDot3===27 ? <Button className="player3"/> : null }
          { showDot4===27 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container086">
          <span className='number'>28</span>
          { showDot1===28 ? <Button className="player1"/> : null }
          { showDot2===28 ? <Button className="player2"/> : null }
          { showDot3===28 ? <Button className="player3"/> : null }
          { showDot4===28 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container087">
          <span className='number'>29</span>
          { showDot1===29 ? <Button className="player1"/> : null }
          { showDot2===29 ? <Button className="player2"/> : null }
          { showDot3===29 ? <Button className="player3"/> : null }
          { showDot4===29 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container088">
          <span className='number'>30</span>
          { showDot1===30 ? <Button className="player1"/> : null }
          { showDot2===30 ? <Button className="player2"/> : null }
          { showDot3===30 ? <Button className="player3"/> : null }
          { showDot4===30 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container089">
        <div className="home-container090">
          <span className='number'>20</span>
          { showDot1===20 ? <Button className="player1"/> : null }
          { showDot2===20 ? <Button className="player2"/> : null }
          { showDot3===20 ? <Button className="player3"/> : null }
          { showDot4===20 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container091">
          <span className='number'>19</span>
          { showDot1===19 ? <Button className="player1"/> : null }
          { showDot2===19 ? <Button className="player2"/> : null }
          { showDot3===19 ? <Button className="player3"/> : null }
          { showDot4===19 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container092">
          <span className='number'>18</span>
          { showDot1===18 ? <Button className="player1"/> : null }
          { showDot2===18 ? <Button className="player2"/> : null }
          { showDot3===18 ? <Button className="player3"/> : null }
          { showDot4===18 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container093">
          <span className='number'>17</span>
          { showDot1===17 ? <Button className="player1"/> : null }
          { showDot2===17 ? <Button className="player2"/> : null }
          { showDot3===17 ? <Button className="player3"/> : null }
          { showDot4===17 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container094">
          <span className='number'>16</span>
          { showDot1===16 ? <Button className="player1"/> : null }
          { showDot2===16 ? <Button className="player2"/> : null }
          { showDot3===16 ? <Button className="player3"/> : null }
          { showDot4===16 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container095">
          <span className='number'>15</span>
          { showDot1===15 ? <Button className="player1"/> : null }
          { showDot2===15 ? <Button className="player2"/> : null }
          { showDot3===15 ? <Button className="player3"/> : null }
          { showDot4===15 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container096">
          <span className='number'>14</span>
          { showDot1===14 ? <Button className="player1"/> : null }
          { showDot2===14 ? <Button className="player2"/> : null }
          { showDot3===14 ? <Button className="player3"/> : null }
          { showDot4===14 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container097">
          <span className='number'>13</span>
          { showDot1===13 ? <Button className="player1"/> : null }
          { showDot2===13 ? <Button className="player2"/> : null }
          { showDot3===13 ? <Button className="player3"/> : null }
          { showDot4===13 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container098">
          <span className='number'>12</span>
          { showDot1===12 ? <Button className="player1"/> : null }
          { showDot2===12 ? <Button className="player2"/> : null }
          { showDot3===12 ? <Button className="player3"/> : null }
          { showDot4===12 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container099">
          <span className='number'>11</span>
          { showDot1===11 ? <Button className="player1"/> : null }
          { showDot2===11 ? <Button className="player2"/> : null }
          { showDot3===11 ? <Button className="player3"/> : null }
          { showDot4===11 ? <Button className="player4"/> : null }
        </div>
      </div>
      <div className="home-container100">
        <div className="home-container101">
          <span className='number'>1</span>
          { showDot1===1 ? <Button className="player1"/> : null }
          { showDot2===1 ? <Button className="player2"/> : null }
          { showDot3===1 ? <Button className="player3"/> : null }
          { showDot4===1 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container102">
          <span className='number'>2</span>
          { showDot1===2 ? <Button className="player1"/> : null }
          { showDot2===2 ? <Button className="player2"/> : null }
          { showDot3===2 ? <Button className="player3"/> : null }
          { showDot4===2 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container103">
          <span className='number'>3</span>
          { showDot1===3 ? <Button className="player1"/> : null }
          { showDot2===3 ? <Button className="player2"/> : null }
          { showDot3===3 ? <Button className="player3"/> : null }
          { showDot4===3 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container104">
          <span className='number'>4</span>
          { showDot1===4 ? <Button className="player1"/> : null }
          { showDot2===4 ? <Button className="player2"/> : null }
          { showDot3===4 ? <Button className="player3"/> : null }
          { showDot4===4 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container105">
          <span className='number'>5</span>
          { showDot1===5 ? <Button className="player1"/> : null }
          { showDot2===5 ? <Button className="player2"/> : null }
          { showDot3===5 ? <Button className="player3"/> : null }
          { showDot4===5 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container106">
          <span className='number'>6</span>
          { showDot1===6 ? <Button className="player1"/> : null }
          { showDot2===6 ? <Button className="player2"/> : null }
          { showDot3===6 ? <Button className="player3"/> : null }
          { showDot4===6 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container107">
          <span className='number'>7</span>
          { showDot1===7 ? <Button className="player1"/> : null }
          { showDot2===7 ? <Button className="player2"/> : null }
          { showDot3===7 ? <Button className="player3"/> : null }
          { showDot4===7 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container108">
          <span className='number'>8</span>
          { showDot1===8 ? <Button className="player1"/> : null }
          { showDot2===8 ? <Button className="player2"/> : null }
          { showDot3===8 ? <Button className="player3"/> : null }
          { showDot4===8 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container109">
          <span className='number'>9</span>
          { showDot1===9 ? <Button className="player1"/> : null }
          { showDot2===9 ? <Button className="player2"/> : null }
          { showDot3===9 ? <Button className="player3"/> : null }
          { showDot4===9 ? <Button className="player4"/> : null }
        </div>
        <div className="home-container110">
          <span className='number'>10</span>
          { showDot1===10 ? <Button className="player1"/> : null }
          { showDot2===10 ? <Button className="player2"/> : null }
          { showDot3===10 ? <Button className="player3"/> : null }
          { showDot4===10 ? <Button className="player4"/> : null }
        </div>
      </div>
    </div>
  )
}

export default Home
