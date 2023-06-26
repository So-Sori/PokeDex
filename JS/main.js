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
let next = document.getElementById("btn-next");
let previous = document.getElementById("btn-previous");
let containerBtn = document.querySelector(".container-btn");
let upBtn = document.querySelector(".bxs-chevron-up-circle");

let scrollY = window.scrollY;
window.addEventListener("scroll",()=>{
    scrollY = window.scrollY;
    if (scrollY >= 2216) {
        upBtn.style.visibility = "visible";
    }else{
        upBtn.style.visibility = "hidden";
    }
})
upBtn.addEventListener("click",()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
})
//PAGINACION
let offset = 1;
let limit = 11;
next.addEventListener("click",()=>{
      if (offset !== 1281) {
        offset += 12;
        const link = document.getElementById(next.getAttribute("data-link"));
        link.scrollIntoView({behavior:"smooth"});
        removeChildNodes(listaPokemon);
        fetchPokemons(offset,limit);
      }
});
previous.addEventListener("click",()=>{
    if (offset !== 1) {
        offset -= 12;
        const link = document.getElementById(next.getAttribute("data-link"));
        link.scrollIntoView({behavior:"smooth"});
        removeChildNodes(listaPokemon);
        fetchPokemons(offset,limit);
    }
});
// CREACION DE LAS CARDS
function fetchPokemon(i) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            showPokemon(data)
        })
}
function fetchPokemons(offset,limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }  
}
const listaPokemon = document.getElementById("all-pokemons");
const botonesList = document.querySelectorAll(".btn-pokemon");

function showPokemon(pokemon) {

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
    if(botonId === "ver-todos") {
        fetchPokemons(offset,limit);
        containerBtn.style.display = "block";
    }

    for (let i = 1; i <= 1281; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        showPokemon(data);
                        containerBtn.style.display = "none";
                }

            })
    }
}))

// BOTON BUSCAR
function pokeNotFound(err){
    valueNotFound = false;
    Swal.fire({
        icon: 'error',
        title: `Pokemon Not Found!`,
        text: 'Make Sure You Write Well'
      })
}
const searchPokemon = event => {
    event.preventDefault();
    listaPokemon.innerHTML = "";
    const { value } = event.target.search;
    
    if (value === "") {
        fetchPokemons(offset,limit);
        return;
    }
    fetch(URL + `${value.toLowerCase()}`)
    .then((response) => response.json())
    .then(data => {
        listaPokemon.innerHTML = "";
        showPokemon(data);
        containerBtn.style.display = "none";
            })
            .catch(err => pokeNotFound(err))
}
function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset,limit);
