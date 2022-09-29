const api = "http://localhost:3000/characters"


const addingCuties = cuteObject => {
    const cutie = document.createElement("span")
    cutie.textContent = cuteObject.name

    cutie.addEventListener("click", event => showCutieCenter(cuteObject))
    document.getElementById("character-bar").append(cutie)
}


const showCutieCenter = cutieObject => {
    const id = cutieObject.id
    fetch(`${api}/${id}`).then(res => res.json())
    .then(cuteObject => {
        document.getElementById("name").textContent = cuteObject.name
        document.getElementById("image").src = cuteObject.image
        document.getElementById("image").alt = cuteObject.name
        document.getElementById("image").value = cuteObject.id //used to easly identify object
        document.getElementById("vote-count").textContent = cuteObject.votes
    })
}


const votesPatch = (votes, id) => {
    patchData = {
        method: "PATCH",
        headers: {
            "content-type":"application/json",
        },
        body: JSON.stringify({votes:votes})
    }
    return fetch(`${api}/${id}`, patchData)
}


const cutiePost = (cutieObject) => {
    const postData = {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(cutieObject)
    }
    return fetch(api, postData)
}


const voting = () => {
    const addVotesButton = document.getElementById("votes-form")
    addVotesButton.addEventListener("submit", event => {
        event.preventDefault()
        let currentVotes = parseInt(document.getElementById("vote-count").textContent)
        currentVotes += parseInt(event.target.votes.value)
        const id = document.getElementById("image").value
        console.log(id)
        votesPatch(currentVotes, id).then(
            document.getElementById("vote-count").textContent = currentVotes
        )
    })

    const resetVotesButton = document.getElementById("reset-btn")
    resetVotesButton.addEventListener("click", e => {
        const id = document.getElementById("image").value
        votesPatch(0, id).then(
            document.getElementById("vote-count").textContent = 0
        )
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
        console.log(newCutieObject)
        cutiePost(newCutieObject)
        .then(what => {
            addingCuties(newCutieObject)
            showCutieCenter(newCutieObject)
        })
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