import React from 'react';
import Nav from "./Nav"

export default function schedule(props) {
  console.log(props.token)

  return (
   <div>
          <Nav/>
          <h1> i am the schedule</h1>
          <h1>{props.token}</h1>

   </div>
  );
}
