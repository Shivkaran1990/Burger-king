import React, { Component } from 'react';
import './App.css';
import cls from './App.module.css';
import Radium, { StyleRoot } from 'radium';
import Person from '../components/Persons/Person';
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
 constructor(props)
 {
   super(props);
   console.log("App constructor called");
 }

 static getDerivedStateFromProps(props, state)
 {
  console.log("App getDrivedStateFromProps called");
  return state;
 }


 static componentDidMount()
 {
  console.log("App componentDidMount called");
 
 }
 componentWillUnmount()
 {
  console.log("App componentWillUnmount called");
 }

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 30 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    counter:0,
    showCockpit:true,
    auth: false
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons,counter:this.state.counter+1 } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }
  loginHandler=()=>{
    this.setState({auth : true})
  }
  render () {
    console.log("App render method  called");
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          <Person persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.auth}
          />
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = [];
    if ( this.state.persons.length <= 2 ) {
      classes.push( 'red' ); // classes = ['red']
    }
    if ( this.state.persons.length <= 1 ) {
      classes.push( 'bold' ); // classes = ['red', 'bold']
    }

    return (
      <StyleRoot>
        <Aux>
          <button onClick={()=>{this.setState({showCockpit:false});}}>remove cockpit</button>
          <AuthContext.Provider value={{authenticated:this.state.auth,
          login:this.loginHandler}}>
          {this.state.showCockpit ?<Cockpit title={this.props.title} showPersons={this.state.showPersons}
            personLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
        /> :null}
          {persons}
          </AuthContext.Provider>
    
        
        </Aux>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(Radium( App) ,cls.App);
