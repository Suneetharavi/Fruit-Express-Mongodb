require('dotenv').config()
// Load express
const express = require('express');
// Create our express app
const app = express();
const fruits = require('./models/fruits');
const Fruit = require('./models/fruit')
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//Gives View Engine
app.set('view engine','jsx')
//Initializes the view Engine
app.engine('jsx',require('express-react-views').createEngine())
//Parse URLencoded responses [req.body*]
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


//Intercept reqRes process and manage dataflow.
app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});
// ---------------------------------[Middleware]


// Define a "root" route directly on app

app.get('/', function(req, res) {
    res.send(`<h1>Welcome to our Fruits Space</h1>
    <a href ="/fruits">Fruits</a>`);
  });


// app.get('/fruits', function (req, res) {
//   res.render('Index', {
//     fruits: fruits })
// });
// ----------------------------------[Index (R)]
app.get('/fruits', (req, res)=>{
  Fruit.find({}, (error, allFruits)=>{
    console.log("ALL_FRUITS:", allFruits)
    fruits: allFruits
    res.render('Index',{
        fruits: allFruits
    })
  });
});
// --------------------------------------[New]
app.get('/fruits/new',(req,res) => {
  res.render('New')
})
// ----------------------------------[POST (C)]
app.post('/fruits',(req,res)=>{
  if(req.body.readyToEat === 'on'){ 
      req.body.readyToEat = true; 
  } else { 
      req.body.readyToEat = false; 
  }
  Fruit.create(req.body,(err, createdFruit)=>{
      console.log("Created Fruit: ",req.body)
      console.log(err)
  })
  res.redirect('/fruits')
  // ---> Add New Fruit to Existing DataSet
})

// --------------------------------------[Edit]
app.get('/fruits/:id/edit', (req, res)=>{
  Fruit.findById(req.params.id, (err, foundFruit)=>{ 
    if(!err){
      res.render(
        'Edit',
      {
        fruit: foundFruit 
      }
    );
  } else {
    res.send({ msg: err.message })
  }
  });
});

// -----------------------------------------------[PUT/PATCH (U)]
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit)=>{
       console.log(updatedFruit)
        res.redirect(`/fruits/${req.params.id}`);
    });
});

// --------------------------------------[Delete (D)]
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id,(err, data)=>{
        res.redirect('/fruits')
    })
});


app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/fruits');
    })
});


// ----------------------------------[Index]
app.get('/fruits/:id', (req,res)=>{
  Fruit.findById(req.params.id, (err, foundFruit)=>{
      res.render('Show',{
          fruit: foundFruit
      })
  });
})
// ----------------------------------[Show]




// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function () {
  console.log('Listening on port 3000');
});