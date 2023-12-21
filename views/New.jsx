import React from 'react'

function New() {
  return (
    <div>
        
        <h1>Create  a New Fruit</h1>

        <form action ='/fruits' method='POST'>

          Name: <input type='text' name='name'></input>

          color: <input type='text' name='color'></input>

          {/* Is Ready to Eat: <input type="checkbox" name='readytoEat'/> */}

          Is Ready to Eat: <input  style={{margin:"1em"}}type="checkbox" name="readyToEat" /><br/>

          <input type='submit' value='Create Fruit'/>

        </form>

        

    </div>
  )
}

export default New