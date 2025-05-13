const pokemonNumber = document.querySelector('.pokemon_num');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage= document.querySelector('.pokemon_img');
const form= document.querySelector('.form');
const input= document.querySelector('.input_search');

const buttonPrev= document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');

let searchPokemon = 1;
//busca os dados do pokemon na API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if(APIResponse.status ==200){
   
    const data = APIResponse.json();
    return data
}
}
//renderizar dados na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando ...";
    
    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default'];
    searchPokemon = data.id;
    }else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :('
        pokemonNumber.innerHTML = '';
    }}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click',()=>{
    if(searchPokemon > 1){searchPokemon -=1;
    renderPokemon(searchPokemon);}
});
buttonNext.addEventListener('click',()=>{
    searchPokemon +=1;
    renderPokemon(searchPokemon);
   });

renderPokemon(searchPokemon);
