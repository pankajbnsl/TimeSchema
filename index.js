// to require the express library for setting up the express server
const express = require('express');
const git = require('git');
// to set the port
const port = 8000;

// to import the database
const db = require('./config/mongoose');

//to import the Schema for the todo task
const Time = require('./models/time_scheme');


const path = require('path');
const { query } = require('express');
const { remove } = require('./models/time_scheme');


// using express app
const app = express();

// to set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// using static files
app.use(express.static('scripts'));

// using the encrypted data
app.use(express.urlencoded());

// using for set the month
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let idcap;
var todoList = [
    {
        task : 'Bring Vegitables',
        date : 'july 5,2020',
        cat : 'personal'
    },
    {
        task : 'Bring Vegitables',
        date : 'july 5,2020',
        cat : 'work'

    },
    {
        task : 'Bring Vegitables',
        date : 'july 5,2020',
        cat : 'school'

    },
    {
        task : 'Bring Vegitables',
        date : 'july 5,2020',
        cat : 'personal'

    }
];

//to render home.ejs
app.get('/', function(req, res){
    Time.find({}, function(err, tasks){
        if(err){
            console.log("unable to fetch data from db");
        }
        return res.render('home', {
            title: 'Time Scheme',
            todo: tasks
        });
    })
});

//   now creating new tasks
app.post('/create-task', function(req, res){
    list = req.body.date.split('-');
    month = months[list[1]-1];
    day = list[2];
    year = list[0];
    finaldate = month+' '+day+','+year;
    Time.create({
        task: req.body.task,
        date: finaldate,
        category: req.body.categories
    }, function(err, newTime){
        if(err){
            console.log('error in creating task');
            return;
        }
        console.log('**********************', newTime);
        return res.redirect('/');
    })

});

// using deleting all the task
app.post('/delete_all_tasks/', function(req, res){
    let query = Time.find({});
    Time.remove(query, function(err, obj){
        if(err){
            console.log('err');
            return;
        }
        return res.redirect('/');
    });
});

// using deleting the single task
app.get('/remove-contact/', function(req,res){
    let id = req.query.id;
    Time.findByIdAndDelete(id, function(err){
      if(err){
          console.log('Error in deleting an object from db');
          return;
      }
      return res.redirect('/');
    });
});
app.get('/capture_id/', function(req, res){
    idcap = req.query.id;
    console.log(idcap);
    return;
})
app.post('/edit-task', function(req, res){
    let id = idcap;
    // formatting date
        list = req.body.dateedit.split('-');
        month = months[list[1]-1];
        day = list[2];
        year = list[0];
        finaldateup = month+' '+day+','+year;
        // mongodb query for updation
        let updates = {
            task: req.body.descedit,
            category: req.body.categories,
            date: finaldateup
        }
        // main mongodb command to update with the help of query
        Time.findByIdAndUpdate(id, updates, function(err, result){
            if(err){
                // error handling
                console.log('error in updating task');
                return;
            }
            // returning response
            console.log("****************", result, req.body);
            return res.redirect('/');
        });
})
// app to listen and run on the assigned port number on local host
app.listen(port, function(err){
    if(err){
        console.log('eroor in running the server', err);
    }
    console.log(__dirname);
    console.log('my express server is up and running on port: ', port);
});