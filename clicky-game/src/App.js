//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import cat from "./cats.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    cat,
    clickedCat: [],
    score: 0
  };

//when you click on a card ... the cat is taken out of the array
  imageClick = event => {
    const currentCat = event.target.alt;
    const CatAlreadyClicked =
      this.state.clickedCat.indexOf(currentCat) > -1;

//if you click on a cat that has already been selected, the game is reset and cards reordered
    if (CatAlreadyClicked) {
      this.setState({
        cat: this.state.cat.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedCat: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available cat, your score is increased and cards reordered
    } else {
      this.setState(
        {
          cat: this.state.cat.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedCat: this.state.clickedCat.concat(
            currentCat
          ),
          score: this.state.score + 1
        },
//if you get all 12 cats corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              cat: this.state.cat.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedCat: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.cat.map(cat => (
            <FriendCard
              imageClick={this.imageClick}
              id={cat.id}
              key={cat.id}
              image={cat.image}
            />
          ))}
        </div>


      </div>
    );
  }
}
export default App;