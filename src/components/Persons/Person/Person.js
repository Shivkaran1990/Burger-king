import Radium from 'radium';
import React, { PureComponent } from 'react';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

import cls from './Person.module.css';
import AuthContext from '../../../context/auth-context';

class Person extends PureComponent
{
constructor(props){
    super(props);
    this.inputElementRef=React.createRef();
}

static contextType=AuthContext;

componentDidMount(){
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
}

  render(){
    console.log("Person H1 constructor called");
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }; 
    return (
             
        //<div className="Person" style={style}>
        <Aux>

    {this.context.authenticated ?<p>Authenticated</p>:<a>login in please</a>}

            <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input type="text"
            //ref={(inputEle)=>{this.inputElement=inputEle}}
            ref={this.inputElementRef}
             onChange={this.props.changed} 
             value={this.props.name} />
      
        </Aux>
             // </div>
    )
  }  
}

Person.propTypes={
    click:PropTypes.func,
    name:PropTypes.string,
    age:PropTypes.number,
    change:PropTypes.func
}

export default withClass(Person,cls.Person);