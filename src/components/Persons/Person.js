import React,{Component} from 'react';
import Person from './Person/Person';
import AuthContext from '../../context/auth-context';

class Persons extends Component{
   // static getDerivedStateFromProps(props,state)
   // {
   //   console.log("getDerivedStateFromProps from Person Render 1");
   //   return state;
   // }

   shouldComponentUpdate(nextProps, nextState){
      console.log("shouldComponentUpdate from Person Render 2");
      if(nextProps.persons!==this.props.persons)
      {
         return true;
      }
      return true;
   }

   getSnapshotBeforeUpdate(prevProps,prevState){
      console.log("getSnapshotBeforeUpdate from Person Render 3");
      return {message : "karan ravidas"};
   }
   componentDidUpdate(prevProps,prevState,snapshots)
   {
      console.log("componentDidUpdate from Person Render 4"); 
      console.log(snapshots); 
   }
   componentWillUnmount()
   {
    console.log("Person componentWillUnmount called");
   }
   render(){

      return this.props.persons.map( ( person, index ) => {
         return <Person
           click={() => this.props.clicked( index )}
           name={person.name}
           age={person.age}
           key={person.id}
           isAuth={this.props.isAuthenticated}
           changed={( event ) => this.props.changed( event, person.id )}/>
        });
      
   }
}

export default Persons;
