import React,{useEffect,useRef,useContext} from 'react';
import classes from './Cockpit.module.css'
import AuthContext from '../../context/auth-context';

const Cockpit=(props)=>{

   const toggleBtnRef=useRef(null);
   const authContext=useContext(AuthContext);
  console.log(authContext.authenticated  +" form cockpit");

    useEffect(()=>{
    console.log("useEffect from  cockpit");
    // const timeer=setTimeout(() => {
    //     alert("fuck hard this bitch");  
    // }, 1000);
    toggleBtnRef.current.click();
    return ()=>{
        //clearTimeout(timeer);
        console.log("clean up work is happening in Cockpit useEffect");
    }
    },[]);

    useEffect(()=>{
        console.log("useEffect from  cockpit 2 nd wala");
        return ()=>{
            console.log("clean up work is happening in Cockpit useEffect 2nd wala");
        }
    })

    let assignedClasses=[];
    let btnClass='';
    
    if(props.showPersons)
    {
        btnClass=classes.Red;
    }
    if(props.personLength<=2)
    {
        assignedClasses.push(classes.red);
    }
    
    if(props.personLength<=1)
    {
        assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join( ' ' )}>This is really working!</p>
          <button className={btnClass} ref={toggleBtnRef}
            onClick={props.clicked}>Toggle Persons</button>
      
            <button  onClick={authContext.login}>Login </button>
           
        </div>
    );
}

export default React.memo(Cockpit);