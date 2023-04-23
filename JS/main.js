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
let URL = "https://pokeapi.co/api/v2/pokemon/";

// SLIDER DINAMICO
let sliderPokemons = [658,448,778,6,197,700,445,384,282,94]
for (let i = 0; i <= sliderPokemons.length; i++) {
    fetch(URL + sliderPokemons[i])
        .then((response) => response.json())
        .then(data => slider(data))
}
let containerSlider = document.getElementById("mySwiper");

function slider(pokemon) {
    const sliders = document.createElement("swiper-slide");
    const { types } = pokemon;
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    sliders.innerHTML = `
            <img src="${pokemon.sprites.front_default}" style="background: radial-gradient(${colorTwo} 33%, ${colorOne} 33%) 0% 0% / 5px 5px" alt="pokemon ${pokemon.name}">
    `;

    containerSlider.append(sliders)
}
// CREACION DE LAS CARDS
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}
const listaPokemon = document.querySelector("#all-pokemons");
const botonesList = document.querySelectorAll(".btn-pokemon");
function mostrarPokemon(pokemon) {

    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let stats = pokemon.stats.map((stat) => `<p class="${stat.stat.name}">${stat.stat.name}</p>\n<p class="${stat.base_stat}">${stat.base_stat}</p>`);
    stats = stats.join('');

    const { types } = pokemon;
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;


    const div = document.createElement("div");
    div.classList.add("poke-card");
    div.innerHTML = `
    <div class="img-container">
    <img src="${pokemon.sprites.front_default}" style="background: radial-gradient(${colorTwo} 33%, ${colorOne} 33%) 0% 0% / 5px 5px" alt="pokemon ${pokemon.name}">
    </div>

    <p class="poke-name">N° ${pokemon.id} ${pokemon.name}</p>

    <div class="type-container">
        ${tipos}
    </div>

    <div class="stats-container">
        ${stats}
    </div>
    `;

    listaPokemon.append(div);
}

botonesList.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))

// BOTON BUSCAR
function pokeNotFound(err){
    valueNotFound = false;
    Swal.fire({
        icon: 'error',
        title: 'Pokemon Not Found!',
        text: 'Make Sure You Write Well'
      })
}
const searchPokemon = event => {
    event.preventDefault();
    listaPokemon.innerHTML = "";
    const { value } = event.target.search;

    fetch(URL + `${value.toLowerCase()}`)
        .then((response) => response.json())
        .then(data => {
                mostrarPokemon(data);
        })
        .catch(err => pokeNotFound(err))
}