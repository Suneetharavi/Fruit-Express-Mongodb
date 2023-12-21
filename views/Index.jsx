import React from "react";
function Index({ fruits }) {
  return (
    <>
      <nav>
        <a href="/fruits/new">
          <h1>Create a New Fruit</h1>
        </a>
      </nav>
      <ul>
        <h1>
          {" "}
          {fruits.map((fruit, i) => {
            return (
              <li key={i}
                style={{
                  borderRadius: "22px",
                  margin: "1em",
                  border: " solid grey",
                  textAlign: "center",
                  display:"flex",
                  justifyContent: 'space-evenly'
                }}
              >
                {" "}
                <a href={`/fruits/${fruit.id}`}>{fruit.name} </a>{" "}
                <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE" />
                </form>
                <a href={`/fruits/${fruit._id}/edit`}><button style={{margin:"12px"}}>Edit This Fruit</button></a>
                </div>
              </li>
            );
          })}
        </h1>
      </ul>
    </>
  );
}
export default Index;










// import React from 'react'

// function Index(props) {
//   return (
//     <div>

//       <nav>
//           <a href="/fruits/new">Create a New Fruit</a>
//       </nav>
//       <ul>
//         <h1>
//            {props.fruits.map((fruit, i) => {
//             return <li style={{borderRadius:'22px',margin:'1em',border:' solid grey',textAlign:"center"}}>
//                    <a href={`/fruits/${fruit.id}`}>{fruit.name} </a> </li>
//            })}

//         </h1>        
//       </ul>

      
//     </div>
//   )
// }

// export default Index