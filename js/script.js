const pokemonName = document.querySelector('.pokemon__name');

const pokemonNumber = document.querySelector('.pokemon__number');

const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');

const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');

const buttonNext = document.querySelector('.btn-next');

let searchPokeomn = 1;



const fetchPokemon = async (pokemon) =>{

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIresponse.status == 200){

        const data = await APIresponse.json();

        return data;
    }

  
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.onerror = () => {
            pokemonImage.src = data['sprites']['front_default'];
        }
        searchPokeomn = data.id
        // console.log(data)

    }else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
} )


buttonNext.addEventListener('click', () =>{
    searchPokeomn += 1;
    renderPokemon(searchPokeomn);    
} )

buttonPrev.addEventListener('click', () =>{ 
    if(searchPokeomn){
        searchPokeomn -= 1;
        renderPokemon(searchPokeomn);   
    }
} )




renderPokemon(searchPokeomn)