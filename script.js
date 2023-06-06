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

// Function to fetch individual character by ID
function fetchCharacterById(id) {
  // Using Fetch to get the API character by ID
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(resp => resp.json());
}

// Function to display character details on a new page
function displayCharacterDetails(character) {
  // Create a new window or tab
  const newWindow = window.open('', '_blank');
  
  // Create the HTML content for the new page
  const htmlContent = `
    <html>
      <head>
        <title>${character.name} Details</title>
		 <link
      href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap"
      rel="stylesheet"/>
    <link rel="stylesheet" href="style.css" />
		
        <style>
          body {
            display: flex;
            }
          
          .image-container {
            flex: 1;
          }
          
          .info-container {
            flex: 1;
            padding: 10px;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          textarea {
            width: 100%;
            height: 300px;
            resize: none;
          }
        </style>
      </head>
      <body>
        <div class="image-container">
          <img src="${character.image}" alt="${character.name}" />
        </div>
        <div class="info-container">
          <h2>${character.name}</h2>
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>Gender: ${character.gender}</p>
          <p>Origin: ${character.origin.name}</p>
          <p>Location: ${character.location.name}</p>
          <textarea>${character.episode.join('\n')}</textarea>
        </div>
      </body>
    </html>
  `;
  
  // Write the HTML content to the new window
  newWindow.document.write(htmlContent);
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

    // Attach an event listener to the anchor element
    anchorElement.addEventListener('click', () => {
      fetchCharacterById(character.id)
        .then(data => {
          displayCharacterDetails(data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    // Append the image and name elements to the anchor element
    anchorElement.appendChild(imageElement);
    anchorElement.appendChild(nameElement);

    // Append the anchor element to the character element
    characterElement.appendChild(anchorElement);

    // Append the character element to the characters div
    charDiv.appendChild(characterElement);
  });
}