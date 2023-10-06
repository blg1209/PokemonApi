import express from "express";
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const apiKey = "5937a4b2-9de4-40b3-aa65-1efe54ff7a59";
const config = { headers:{ "X-Api-Key": apiKey} };
const baseURL = "https://api.pokemontcg.io/v2/";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) =>{
    res.render('index.ejs')

})

app.get('/get-random', async (req, res) =>{
    try{
        const result = await axios.get(baseURL + "cards", config)
        var ranNum = Math.floor(Math.random() * result.data.data.length);
        var ranPokemon = result.data.data[ranNum];
        console.log(ranPokemon)
        res.render('index.ejs', { content: ranPokemon });
    }
    catch(error){
        console.log('API not working')
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });