import React from 'react';

const withClass=(WrapepedComponent,className)=>
{
return props=>(
    <div className={className}>
     <WrapepedComponent {...props}/>
    </div>
)
}

export default withClass;