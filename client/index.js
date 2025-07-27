let form = document.getElementById('search-form');
let input = document.getElementById('search_input');
let results = document.getElementById('results')

let addPlayers = document.getElementById('add-players');
let nameBro = document.getElementById('Player_Name');
let jerseyNumber = document.getElementById('jersey_Number');
let ageBro = document.getElementById('player_age');
let qualificationBro = document.getElementById('player_qualification');

console.log(input.value)


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    results.innerHTML = "";


    try {
        const response = await fetch(`https://wwe-search.onrender.com/players/${input.value.toLowerCase()}`);
        // if (!response.ok) throw new Error("Player not found");

        const player = await response.json();
        console.log(player)
        //     console.log(player);
        //      const completedName = document.createElement('li')
        //     const completedNumber = document.createElement('li')
        //     const completedAge = document.createElement('li')
        //     const completedQualificaion = document.createElement('li')
        //     completedName.textContent = `player Name : ${player.player_name}`
        //     completedNumber.textContent = `jersey Number :${player.number}`
        //     completedAge.textContent = `player Age : ${player.age}`
        //     completedQualificaion.textContent = `player Qualification : ${player.qualification}`
        //     results.appendChild(completedName)
        //     results.appendChild(completedNumber)
        //     results.appendChild(completedAge)
        //     results.appendChild(completedQualificaion)

        // inputBro.value = '';

        const li1 = document.createElement('li')
        li1.textContent = `Player Name: ${player.player_name}`;

        const li2 = document.createElement('li')
        li2.textContent = `jersey Number :${player.number}`;

        const li3 = document.createElement('li');
        li3.textContent = `Age: ${player.age}`;

        const li4 = document.createElement('li');
        li4.textContent = `Qualification: ${player.qualification}`;

        results.appendChild(li1);
        results.appendChild(li2);
        results.appendChild(li3);
        results.appendChild(li4);

    } catch (err) {
        console.error(err.message)
        const errLi = document.createElement('li');
        errLi.textContent = err.message;
        results.appendChild(errLi);
    }

    input.value = '';
});



addPlayers.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("https://wwe-search.onrender.com/player", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player_name: nameBro.value,
                number: jerseyNumber.value,
                age: ageBro.value,
                qualification: qualificationBro.value
            })
        });

        const data = await response.json();
        console.log('player added succesfully');
    } catch (error) {
        console.error("Failed to add player:", error.message);
    }


    nameBro.value = "";
    jerseyNumber.value = "";
    ageBro.value = "";
    qualificationBro.value = "";
});

