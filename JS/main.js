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


let offset = 1;
let limit = 11;
next.addEventListener("click",()=>{
      if (offset !== 1281) {
        offset += 12;
        const link = document.getElementById(next.getAttribute("data-link"));
        link.scrollIntoView({behavior:"smooth"});
        removeChildNodes(listPokemon);
        fetchPokemonsPagination(offset,limit);
      }
});
previous.addEventListener("click",()=>{
    if (offset !== 1) {
        offset -= 12;
        const link = document.getElementById(next.getAttribute("data-link"));
        link.scrollIntoView({behavior:"smooth"});
        removeChildNodes(listPokemon);
        fetchPokemonsPagination(offset,limit);
    }
});

function fetchPokemon(i) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            listPokemon.innerHTML += showPokemon(data)
        })
}
function fetchPokemonsPagination(offset,limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }  
}
const listPokemon = document.getElementById("all-pokemons");
const btnList = document.querySelectorAll(".btn-pokemon");

function showPokemon(pokemon) {

    let typesPokemon = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    typesPokemon = typesPokemon.join('');

    let stats = pokemon.stats.map((stat) => `<p class="${stat.stat.name}">${stat.stat.name}</p>\n<p class="${stat.base_stat}">${stat.base_stat}</p>`);
    stats = stats.join('');

    const { types } = pokemon;
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    
    const spritePokemon = pokemon.sprites.front_default ? pokemon.sprites.front_default : "IMG/pokeball_black-white.avif";

    const div = document.createElement("div");

    div.innerHTML = `
    <div class="poke-card">
        <div class="img-container">
        <img src="${spritePokemon}" style="background: radial-gradient(${colorTwo} 33%, ${colorOne} 33%) 0% 0% / 5px 5px" alt="pokemon ${pokemon.name}">
        </div>

        <p class="poke-name">N° ${pokemon.id} ${pokemon.name}</p>

        <div class="type-container">
            ${typesPokemon}
        </div>

        <div class="stats-container">
            ${stats}
        </div>
    </div>
    `;

    return div.innerHTML;
}

btnList.forEach(btn => btn.addEventListener("click", (event) => {
    const navBtnId = event.currentTarget.id;
    let loadIcon = document.getElementById("load-icon");

    if(navBtnId === "ver-todos") {
        listPokemon.innerHTML = "";
        fetchPokemonsPagination(offset,limit);
        containerBtn.style.display = "block";
        loadIcon.style.display = "none";
    }
    loaderType(navBtnId);

}))

async function loaderType(navBtnId) {
    let loader = document.getElementById("loader");

    loader.style.display = "block";
    containerBtn.style.display = "none";
    listPokemon.innerHTML = "";
    loader.innerHTML = `    
    <div class="blocked-overlay">
        <div class="container-gif-overlay">
            <div>
                <img src="/IMG/cats-cute.gif" alt="">
            </div>
        </div>
                `;

    let res = await fetch(`https://pokeapi.co/api/v2/type/${navBtnId}/`);
    let data = await res.json();
    for (let i = 0; i <= data.pokemon.length - 1; i++) {
        fetchPokemon(data.pokemon[i].pokemon.name)
    }  
    setInterval(()=>{
        loader.style.display = "none"
    },3500)
}

function inputPokemonNotFound(err){
    valueNotFound = false;
    Swal.fire({
        icon: 'error',
        title: `Pokemon Not Found!`,
        text: 'Make Sure You Write Well'
      })
}
const searchPokemon = event => {
    event.preventDefault();
    listPokemon.innerHTML = "";
    const { value } = event.target.search;
    
    if (value === "") {
        fetchPokemonsPagination(offset,limit);
        containerBtn.style.display = "block";
        return;
    }
    fetch(URL + `${value.toLowerCase()}`)
    .then((response) => response.json())
    .then(data => {
        listPokemon.innerHTML = "";
        listPokemon.innerHTML = showPokemon(data);
        containerBtn.style.display = "none";
            })
    .catch(err => inputPokemonNotFound(err))
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

fetchPokemonsPagination(offset,limit);

