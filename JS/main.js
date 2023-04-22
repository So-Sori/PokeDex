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

function createPokemon(pokemon) {
    const cardContainer = document.getElementById("card-container");

    const card = document.createElement("div");
    card.classList.add("poke-card")
  
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const name = document.createElement("p");
    name.classList.add("poke-name");
    name.textContent = `#${pokemon.id} ${pokemon.name}`;

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("type-container");
  
    const type = document.createElement("p");
    type.textContent = pokemon.types[0].type.name;

    typeContainer.appendChild(type)

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

fetchPokemons(10)