console.log("test this");

// Define a function to fetch data from the Urban Dictionary API
async function getData(term) {
    try {
        if (!term) { // If no term was provided...
            const searchTermInput = document.querySelector('#search-term');
            term = searchTermInput.value; // Get search term from input field
        }

        // Make a GET request to the Urban Dictionary API with the search term as a parameter
        const response = await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "423202cc18msh46e3fca09c5e4e9p1c0734jsne56fb46ad7d0"
            }
        });
        const data = await response.json();

        console.log(data);

        if (data.list && data.list.length > 0) {
            const firstDefinition = data.list[0];

            // Select "ud-definition" div from HTML & insert result 
            const put_def_here = document.querySelector('#ud-definition');

            // Insert word, definition & example of first definition into "ud-definition" div 
            put_def_here.innerHTML = `
                <p><strong>Word:</strong> ${firstDefinition.word}</p>
                <p><strong>Definition:</strong> ${firstDefinition.definition}</p>
                <p><strong>Example:</strong> ${firstDefinition.example}</p>
            `;
        } else {
            console.log('No definitions found for this term.');
        }
    } catch (error) {
        console.log(`😒 Nope: ${error}`);
    }
}

// Call getData() with "Search" when page loads
window.onload = function () { getData('Search'); };