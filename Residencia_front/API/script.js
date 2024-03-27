const characterId = document.getElementById('characterId')
const btnGo = document.getElementById('btn-go')
const content = document.getElementById('content')
const image = document.getElementById('img')


const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data)=>{
        return data;
    });

    return result;
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'image', 'episode']
const buildResult = (result) => {

    return keys.map((key) => document.getElementById(key))
    .map((element) => {
        if(element.checked && typeof(result[element.name]) != 'object'){
            const newElement = document.createElement('p');
            newElement.innerHTML =`${element.name} : ${result[element.name]}`;
            content.appendChild(newElement);
        }
    });

}

btnGo.addEventListener('click', async (event) =>{
    event.preventDefault();
    if(characterId.value === ''){
        return content.innerHTML = "O Id do personagem está vazia.";
    }
    const result = await fetchApi(characterId.value);
    if(content.firstChild === null){
        image.src =  `${result.image}`;
        buildResult(result)
        // content.textContent = `${JSON.stringify(buildResult(result), undefined, 2)}`;
    }else{
        content.innerHTML = '';
        image.src =  `${result.image}`;
        buildResult(result)
    }


});

