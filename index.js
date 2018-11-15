#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const progress = require('progress');
const axios = require('axios')

// Attribution des commandes à "Commander"

program
    .version('1.0.0')
    .option('-a, --allcharacters', 'Show all characters and associated ID ')
    .option('-p, --characters', 'Search characters by ID or name')
    .option('-c, --comics', 'Show comics')
    .option('-s, --series', 'Show series')

program.parse(process.argv)

// Requêtes API Marvel, pour récuperer selon la commande : les personnages, les comics, les séries.
const questions = [
    {
      type : 'input',
      name : 'personnages',
      message : "Entrer l'ID ou le nom exact du personnage recherché :"
    }
  ];

if (program.characters) {
    inquirer
    .prompt(questions).then(answers =>
        
        axios.get('https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
            .then((responseCharacters) => {
                const characters = responseCharacters.data.data.results
                        
                characters.forEach(element => {
                    
                    if (Object.values(answers) == element.id) {
                        
                        let bar = new progress('Téléchargement \: :percent', { total: 100 });
                        let timer = setInterval(function () {
                        bar.tick();
                            if (bar.complete) {
                                console.log("Personnage : " + element.name)
                                console.log("Description : " + element.description)
                                console.log("Comics disponible : " + element.comics.available)
                                clearInterval(timer);
                            }
                        }, 100);

                    }

                    else if (Object.values(answers) == element.name) {
                        
                        let bar = new progress('Téléchargement \: :percent', { total: 100 });
                        let timer = setInterval(function () {
                        bar.tick();
                            if (bar.complete) {
                                console.log("ID : " + element.id + "| Personnage : " + element.name)
                                console.log("Description : " + element.description)
                                console.log("Comics disponible : " + element.comics.available)
                                clearInterval(timer);
                            }
                        }, 100);
                    }

                });
                
            })
            .catch(function (error) {
                console.log(error);
            })
)

} else if (program.allcharacters) {
        
        axios.get('https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
            .then((responseCharacters) => {
                
                const allcharacters = responseCharacters.data.data.results
                
                let bar = new progress('Téléchargement \: :percent', { total: 100 });  
                    let timer = setInterval(function () {
                    bar.tick();
                        if (bar.complete) {
                            console.log(characters_array)
                            clearInterval(timer);
                        }
                    }, 100);
                
                characters_array = []

                allcharacters.forEach(element => {
                    
                    characters_array.push("ID : " + element.id + " | Personnage : "+ element.name)

                });
                
            })
            .catch(function (error) {
                console.log(error);
            })

} else if (program.comics) {

    axios.get('https://gateway.marvel.com:443/v1/public/comics?orderBy=title&limit=100&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
    .then((responseComics) => {
        const comics = responseComics.data.data.results
        comics_array = []

        let bar = new progress('Téléchargement \: :percent', { total: 100 });  
                    let timer = setInterval(function () {
                    bar.tick();
                        if (bar.complete) {
                            console.log(comics_array)
                            clearInterval(timer);
                        }
                    }, 100);

        comics.forEach((element) => {
            comics_array.push("ID : " + element.id + " | " + element.title)
        }); 
    })
    .catch(function (error) {
        console.log(error);
    });

} else if (program.series) {

    axios.get('https://gateway.marvel.com:443/v1/public/series?orderBy=title&limit=100&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
    .then((responseSeries) => {
        const series = responseSeries.data.data.results
        series.forEach((element) => {
        series_array = [element.title] 
        console.log('Séries : ' + series_array)
        }); 
    })
    .catch(function (error) {
        console.log(error);
    });

} else {
    program.help()
}

// Interface Inquirer





    
    
    
