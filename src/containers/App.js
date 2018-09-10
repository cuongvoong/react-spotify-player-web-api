import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store";
import "./App.css";
import Player from "./Player";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Player />
        </div>
      </Provider>
    );
  }
}

export default App;
