// When the page loads, show the first 50 monsters. Each monster's name, age, and 
// description should be shown.
// Load Monsters into #monster-container
// First grab document.querySelector("#monster-container") set to a variable, mons
// Once mons is defined, you can use it to insert your monsters
// To grab the monsters from the database, we need a GET request
// Use the localhost URL to make another variable, for grabbing monsters. Adjust URL with
// http://localhost:3000/monsters/?_limit=50&_page=
// Use a fetch on this url
// Parse out the Object that you receive, with the data
// Use map to send data to a new array, with HTML
// Send it to t a function for HTML insertion
// Make a variable with the HTML insertion using Object data
// Display onto monster-container using innerHTML and forEach

// Above your list of monsters, you should have a form to create a new monster. 
// You should have fields for 
// name, age, and description, and a 'Create Monster Button'. 
// When you click the button, the monster should be 
// added to the list and saved in the API.
// At the end of the list of monsters, show a button. 
// When clicked, the button should load the next 50 monsters and show them.
// I first need to grab the form after building it using the DOM
// Add event listener that looks for specific document class
// After grabbing data from the submission event
// Save the data to the API using a POST request

const mons = document.querySelector("#monster-container");
const formDiv = document.querySelector("#create-monster");
const forw = document.querySelector("#forward");
const backw = document.querySelector("#back");
const url = "http://localhost:3000/monsters/";
let page = 1;

//
// Event Listeners
//

formDiv.addEventListener("click", submitMons)
forw.addEventListener("click", function () {
    page++;
    renderMonster();
})
backw.addEventListener("click", function () {

    if(page === 1){
        alert("You're already at the start!")
        return
    }
    page--;
    renderMonster();
})


//
//Render Monster Functions
//

function renderMonster() {
    console.log(url + "?_limit=50&_page=" + `${page}`)

    fetch(url + "?_limit=50&_page=" + `${page}`)
        .then((resp) => resp.json())
        .then((data) => dataHandler(data))
        .catch(function () {
            console.log("Error Grabbing Data")
            alert("Error Grabbing Data")
        })
}

function dataHandler(data) {

    if(data.length === 0){
        alert("End of Page Reached")
        return
    }

    mons.innerHTML = `<p>You are on Page ${page}</p>`
    let monsterArr = createMonsterDiv(data)
    monsterArr.forEach(insertArray)
    return
}

function createMonsterDiv(data) {
    console.log("Create Monster Div")
    return data.map(htmlContainer)
}

function htmlContainer(data) {
    let i = `<div class= "card">
            <h2>${data.name}</h2>
            <p>${data.age}</p>
            <p>${data.description}</p>
            </div>`
    return i
}

function insertArray(arr) {
    return mons.innerHTML += arr
}

//
// Render Form
//

function renderForm() {
    let i = `
    <form id='monster-form'>
    <input id='name' placeholder="Name...">
    <input id='age' placeholder="Age...">
    <input id='description' placeholder="Description...">
    <button id='createMons'>Create Monster</button>
    </form>
    `
    return formDiv.innerHTML = i;
}

function submitMons(e) {
    e.preventDefault();

    if (e.target.id === "createMons") {

        let formData = {
            name: `${e.target.parentElement[0].value}`,
            age: `${e.target.parentElement[1].value}`,
            description: `${e.target.parentElement[2].value}`
        }

        console.log(formData)

        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        };

        console.log(configurationObject)

        return newMons(configurationObject)
    }
}

function newMons(config) {
    let form = document.querySelector('#monster-form')

    fetch(url, config)
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .then(() => renderMonster())
        .then(()=>form.reset())
        .catch(function () {
            console.log("Error Submitting Data")
        })
}

//
// Render DOM
//

renderMonster()
renderForm()
