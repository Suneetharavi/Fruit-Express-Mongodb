import React from 'react'

function Show(props) {
  return (
    <div>
       The  
        <h1>{props.fruit.name}</h1>is 
        <h1 style={{color:`${props.fruit.color}`}}>{props.fruit.color}</h1>
        <h1>{props.fruit.readyToEat? "It is Ready to Eat" : " It needs a bit more time Before its Edible"}</h1>
    
    </div>
  )
}

export default Show