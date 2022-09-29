const api = "http://localhost:3000/characters"

const addingCuties = cuteObject => {
    const cutie = document.createElement("span")
    cutie.textContent = cuteObject.name
    document.getElementById("character-bar").append(cutie)
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