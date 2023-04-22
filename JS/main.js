function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res)=>res.json())
        .then((data) => {
            createPokemon(data)
        })
}
//CREACION DE POKEMONES
function fetchPokemons(numbers) {
    for (let i = 1; i <= numbers+1; i++) {
        fetchPokemon(i);
    }
}
const typeColors = {
    electric: '#E4CE53',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#E898AA',
    default: '#2A1A1F',
};

function createPokemon(pokemon) {
    const { types } = pokemon;
    setCardColor(types);

    const cardContainer = document.getElementById("card-container");

    const card = document.createElement("div");
    card.classList.add("poke-card")
  
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    // background pokemons
    types.forEach(type => {
        sprite.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        sprite.style.backgroundSize = `5px 5px`;
    })

    spriteContainer.appendChild(sprite);

    const name = document.createElement("p");
    name.classList.add("poke-name");
    name.textContent = `N° ${pokemon.id} ${pokemon.name}`;

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("type-container");
    
    // Types of pokemons
    types.forEach(type => {
        const typeCard = document.createElement("p");
        typeCard.textContent = type.type.name;
        typeCard.style.color =  `${typeColors[type.type.name]}`;
        typeCard.style.border = `1px dashed ${qqtypeColors[type.type.name]}`;
        typeContainer.appendChild(typeCard);
    })


    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    pokemon.stats.forEach(stat => {
        const statElementName = document.createElement("div");
        const statElemntAmout = document.createElement("div");
        statElementName.textContent = stat.stat.name
        statElemntAmout.textContent = stat.base_stat

        statsContainer.appendChild(statElementName);
        statsContainer.appendChild(statElemntAmout);

    });
  
    card.appendChild(spriteContainer);
    card.appendChild(name);
    card.appendChild(typeContainer);
    card.appendChild(statsContainer);
  
  
    cardContainer.appendChild(card);
}
// Definicion de colores
let colorOne;
let colorTwo;
function setCardColor(types) {
    colorOne = typeColors[types[0].type.name];
    colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
}
fetchPokemons(50)