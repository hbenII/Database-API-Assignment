// Function that fetches our characters based on the name from the input field
function fetchCharacters() {
  const inputValue = document.getElementById('character-input').value;

  // Using Fetch to get the API characters
  fetch(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      formatCharacters(data.results);
    })
    .catch(error => {
      console.log(error);
    });
}

// Function that fetches characters based on gender from the input field
function fetchCharactersByGender() {
  const inputValue = document.getElementById('gender-input').value;

  // Using Fetch to get the API characters by gender
  fetch(`https://rickandmortyapi.com/api/character/?gender=${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      formatCharacters(data.results);
    })
    .catch(error => {
      console.log(error);
    });
}

// Function that formats the data returned from the character fetch and appends it to the DOM
function formatCharacters(characters) {
  const charDiv = document.getElementById('characters');
  charDiv.innerHTML = '';

  // forEach to iterate over each character
  characters.forEach(character => {
    const characterElement = document.createElement('div');

    // Create an anchor element to make the image clickable
    const anchorElement = document.createElement('a');

    // Create an image element and set its source
    const imageElement = document.createElement('img');
    imageElement.src = character.image;
    imageElement.classList.add('character-img');

    // Create a heading element for the character's name
    const nameElement = document.createElement('h2');
    nameElement.textContent = character.name;

    // Set the href of the anchor element to run a search on the character's ID
    anchorElement.href = '#';
    anchorElement.addEventListener('click', () => {
      fetchCharacterById(character.id, characterElement);
    });

    // Append the image element to the anchor element
    anchorElement.appendChild(imageElement);

    // Append the anchor element and name element to the character element
    characterElement.appendChild(anchorElement);
    characterElement.appendChild(nameElement);

    // Append the character element to the characters div
    charDiv.appendChild(characterElement);
  });
}

// Function to fetch individual character by ID
function fetchCharacterById(id, characterElement) {
  // Using Fetch to get the API character by ID
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(resp => resp.json())
    .then(character => {
      // Create a new element to display the character information
      const infoElement = document.createElement('div');
      infoElement.textContent = `Status: ${character.status}, Species: ${character.species}`;

      // Append the info element to the character element
      characterElement.appendChild(infoElement);
    })
    .catch(error => {
      console.log(error);
    });
}