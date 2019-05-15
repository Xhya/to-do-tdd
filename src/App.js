import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      liste:[]
    }
  }

  ajouterElement = () => {

    if (this.state.input !== "") {
      this.setState({
        liste: [...this.state.liste, this.state.input],
        input: ""
      });
    }

  };

  render () {

    const elements = this.state.liste.map((elem,index) => 
      <div key={index} className='element'>{elem} <button onClick={() => { 
        this.setState( {
          liste: this.state.liste.filter((e, indexToRemove) => index !== indexToRemove )
        });
      }}>X</button></div>
    )

    return (
      <div className="App">
        <h2>ToDoList</h2>
        <div>
          <input
            id='input'
            value={this.state.input}
            onChange= {(input) => this.setState ({ 
              input: input.target.value
            })}
          />
          <div id="valider" onClick={() => this.ajouterElement()}>Valider</div>
        </div>

        <div id='elements'>
          {elements}
        </div>
      
      </div>
    );
  }
}

export default App;
