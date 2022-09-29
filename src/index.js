const api = "http://localhost:3000/characters"

const addingCuties = cuteObject => {
    const cutie = document.createElement("span")
    cutie.textContent = cuteObject.name

    cutie.addEventListener("click", event => {
        document.getElementById("name").textContent = cuteObject.name
        document.getElementById("image").src = cuteObject.image
        document.getElementById("image").alt = cuteObject.name
        document.getElementById("vote-count").textContent = cuteObject.votes
    })
    document.getElementById("character-bar").append(cutie)
}

const voting = () => {
    const addVotesButton = document.getElementById("votes-form")
    addVotesButton.addEventListener("submit", event => {
        event.preventDefault()
        let currentVotes = parseInt(document.getElementById("vote-count").textContent)
        currentVotes += parseInt(event.target.votes.value)
        document.getElementById("vote-count").textContent = currentVotes
    })
    
}

const renderPage = () => {
    fetch(api).then(res => res.json())
    .then(cuteObjects => {
        cuteObjects.forEach(cuteObject => {
            addingCuties(cuteObject)
        })
    })
}

renderPage()
voting()