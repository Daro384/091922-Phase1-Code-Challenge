const api = "http://localhost:3000/characters"


const addingCuties = cuteObject => {
    const cutie = document.createElement("span")
    cutie.textContent = cuteObject.name

    cutie.addEventListener("click", event => showCutieCenter(cuteObject))
    document.getElementById("character-bar").append(cutie)
}


const showCutieCenter = cutieObject => {
    document.getElementById("name").textContent = cutieObject.name
    document.getElementById("image").src = cutieObject.image
    document.getElementById("image").alt = cutieObject.name
    document.getElementById("vote-count").textContent = cutieObject.votes
}


const voting = () => {
    const addVotesButton = document.getElementById("votes-form")
    addVotesButton.addEventListener("submit", event => {
        event.preventDefault()
        let currentVotes = parseInt(document.getElementById("vote-count").textContent)
        currentVotes += parseInt(event.target.votes.value)
        document.getElementById("vote-count").textContent = currentVotes
    })

    const resetVotesButton = document.getElementById("reset-btn")
    resetVotesButton.addEventListener("click", e => {
        document.getElementById("vote-count").textContent = 0
    })
}


const addNewCutie = () => {
    const addCharacterForm = document.getElementById("character-form")
    addCharacterForm.addEventListener("submit", event => {
        event.preventDefault()
        const newCutieObject = {
            name:event.target.name.value,
            image:event.target["image-url"].value,
            votes:0,
        }
        addingCuties(newCutieObject)
        showCutieCenter(newCutieObject)
    })

}


const renderPage = () => {
    fetch(api).then(res => res.json())
    .then(cuteObjects => {
        cuteObjects.forEach(cuteObject => {
            addingCuties(cuteObject)
        })
        showCutieCenter(cuteObjects[0])
    })
}


renderPage()
voting()
addNewCutie()