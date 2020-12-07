const express = require('express');
const geocode = require('./utils/geocode')


const hbs = require('hbs'); 
const path = require('path');

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

 

const app = express();
const port =  process.env.PORT || 3000;



//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory 
app.use(express.static(publicDirectoryPath));


app.get('/about', (req,res) => {
    
  
    res.render('about', {

        title:'About',
        name: 'Gizem'

    });

});


app.get('/help', (req,res) => {
    
  
    res.render('help', {

        title:'Help',
        name: 'You need help?'

    });

});


app.get('', (req,res) => {
    
    res.render('index', {

        title:'Weather',
        name: 'Gizem'

    });

});

app.get('/weather', (req,res) => {
    

    if(!req.query.address){
        return res.send({
            error:'Adress must be provided'
        });
    }

    geocode.geocode(req.query.address, (error,{latitude,longtitude,location}={}) => {

 

        if(error){
            return res.send({error});
        }
      
        geocode.forecast(latitude,longtitude, (error, forecastData) => {
    
            if(error){
                return res.send({error});
            }
            
            res.send({

                forecast: forecastData,
                location,
                address:req.query.address

            });
           
        });
       
    
        
    });
 


})


app.get('/products', (req,res) => {

    if(!req.query.search) {
        return res.send({

            error:'You must provide a search term!'

        });
    }

 
    res.send({
        product:[]
    });
    

})


app.get('/help/*', (req,res) => {
    
    res.send('Help article not found!');

})

//app.com
//app.com/ehlp


app.get('*', (req,res) => {

    res.render('error', {

        title:'About',
        name: 'Gizem'

    });


})

app.listen(port, () => {

    console.log('Server is up on port 3000.');

});
