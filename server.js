require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const expressLayout = require('express-ejs-layouts'); 
const cookieParser = require('cookie-parser');






const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port = process.env.PORT || 3000;

// express static folder:-  css, js and imgs
app.use(express.static('public'));

app.use(cookieParser());




// template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//routes
app.use('/', require('./routes/index'))


//error
app.get('*', (req, res) => {
    const data = {
        title: "Error page",
        css: "error.css"
    }
    res.status(404).render('404', data);
});



server.listen(port, ()=>{
    console.log(`Listening on ${port} port..`);
});

