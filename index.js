#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const progress = require('progress')
const urljoin = require('url-join');
const axios = require('axios')

// Attribution des commandes à "Commander"

program
    .version('1.0.0')
    .option('-p, --characters', 'Search characters by name and show ID and Description')
    .option('-c, --comics', 'Show comics')
    .option('-s, --series', 'Show series')

program.parse(process.argv)

// Requêtes API Marvel, pour récuperer selon la commande : les personnages, les comics, les séries.

const question_characters_name = [
    {
      type : 'input',
      name : 'personnages',
      message : "Entrer l'ID ou le nom exact du personnage recherché :"
    }
  ];

const question_comics_name = [
    {
      type : 'input',
      name : 'comics',
      message : "Le comic commence par :"
    }
  ];

if (program.characters) {
    
    inquirer
    .prompt(question_characters_name).then(answers => {
        
        url = 'characters?name=' + Object.values(answers)
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public', url, '&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')

        axios.get(fullUrl)
        .then((responseCharacters) => {
            
            const characters = responseCharacters.data.data.results
                    
            characters.forEach(element => {
                        
                if (Object.values(answers) == element.name) {
                    
                    let bar = new progress('Téléchargement \: :percent', { total: 100 });
                    let timer = setInterval(function () {
                    bar.tick();
                        if (bar.complete) {
                            console.log("\nID : " + element.id + " | Personnage : " + element.name)
                            console.log("\nDescription : " + element.description)
                            console.log("\nComics disponible : " + element.comics.available)
                            clearInterval(timer);
                        }
                    }, 100);
                }

            });
            
        })
        .catch(function (error) {
            console.log(error);
        })
})

} else if (program.comics) {
    
    inquirer
    .prompt(question_comics_name).then(answers => {
        
        url = 'comics?titleStartsWith=' + Object.values(answers)
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public', url, '&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')

        axios.get(fullUrl)
        .then((responseComics) => {

            const comics = responseComics.data.data.results
                    
            comics.forEach(element => {
                
                console.log("\nID : " + element.id + " | Comics : " + element.title)

            });
            
        })
        .catch(function (error) {
            console.log(error);
        })
})

} else {
    program.help()
}





    
    
    
