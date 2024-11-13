import Mustache from "mustachejs";
const cardTemplate = document.getElementById("cardTemplate").innerHTML
const cardsContainer = document.getElementById("cardsContainer")

const infoTemplate = document.getElementById("infoTemplate").innerHTML
const infoContainer = document.getElementById("infoContainer")

const urlIndex = `https://pokeapi.co/api/v2/pokemon`

fetch(urlIndex)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result) => {
      const resultURL = result.url
      fetch(resultURL)
        .then(result => result.json())
        .then((data) => {

          const pokemon = {
            name: data.name,
            imageUrl: data.sprites.front_default,
            types: data.types.map((atype) => { return atype.type.name}).join(", ")
          }

          const output = Mustache.render(cardTemplate, pokemon)
          cardsContainer.insertAdjacentHTML('beforeend', output)

          const link = document.getElementById(data.name)
          link.addEventListener("click", () => {
            const pokemonInfo = {
              name: data.name,
              imageUrl: data.sprites.front_shiny,
              abilities: data.abilities.map((anAbility) => { return anAbility.ability.name}).join(", ")
            }
            const outputInfo = Mustache.render(infoTemplate, pokemonInfo)
            infoContainer.innerHTML = outputInfo


          })



        })

    })

  })
