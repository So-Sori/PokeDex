let amountPokemons = 30;
const typeColors = {
    normal:  "#A8A878",
    fire:  "#F08030",
    water:  "#6890F0",
    grass:  "#78C850",
    electric:  "#F8D030",
    ice:  "#98D8D8",
    fighting:  "#C03028",
    poison:  "#A040A0",
    ground:  "#E0C068",
    flying:  "#A890F0",
    psychic:  "#F85888",
    bug:  "#A8B820",
    rock:  "#B8A038",
    ghost:  "#705898",
    dark:  "#705848",
    dragon:  "#7038F8",
    steel:  "#B8B8D0",
    fairy:  "#F0B6BC",
    default: '#2A1A1F'
};

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res)=>res.json())
        .then((data) => {
            createPokemon(data)
        })
}
//CREACION DE POKEMONES
function fetchPokemons(numbers) {
    for (let i = 1; i <= numbers; i++) {
        fetchPokemon(i);
    }
}

let defaultPokemon = [];
function createPokemon(pokemon) {
    const { types } = pokemon;
    setCardColor(types);

    const cardContainer = document.getElementById("card-container");
    
    const card = document.createElement("div");
    card.classList.add("poke-card");
  
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
        typeCard.style.background =  `${typeColors[type.type.name]}`;
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
  
    defaultPokemon.push(`${pokemon.name}`);
    defaultPokemon.push(`${pokemon.id}`);
    cardContainer.appendChild(card);
}
let valueNotFound = true;
function pokeNotFound(err){
    valueNotFound = false;
    Swal.fire({
        icon: 'error',
        title: 'Pokemon Not Found!',
        text: 'Make Sure You Write Well'
      })
}
function errSearchBtn(){
    Swal.fire({
        icon: 'warning',
        title: 'Existing Pokemon',
        text: 'Check The List Of The 30 First Pokemons'
      })
}
// Definicion de colores
let colorOne;
let colorTwo;
function setCardColor(types) {
    colorOne = typeColors[types[0].type.name];
    colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
}

// Funcionality search botom
const searchPokemon = event => {
    event.preventDefault();
    let userPokemons = [];
    const { value } = event.target.search;

    // Verifying that the pokemon doesn't exist
    if(defaultPokemon.includes(value)){
        errSearchBtn();
        userPokemons.push(`${value}`);
    }
    if(userPokemons.includes(value)){
        errSearchBtn();
    }
    else{
        userPokemons.push(`${value}`);
        valueNotFound = true
        fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            .then(data => data.json())
            .then(response => createPokemon(response))
            .catch(err => pokeNotFound(err))
            if(valueNotFound){
                console.log(valueNotFound);
                Swal.fire({
                    position: 'botom-end',
                    icon: 'success',
                    title: 'Pokemon Added Below',
                    showConfirmButton: false,
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    timer: 3500
                  })
            }
    }

}
fetchPokemons(amountPokemons)