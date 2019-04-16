const formClass = document.querySelector(".create-new-item")

formClass.addEventListener('submit', createItem)

function createItem(e){
e.preventDefault()

var soundEffect = new Audio();
soundEffect.src = "sounds/live.mp3";
soundEffect.play();

let inputs = document.querySelectorAll(".input-text")
let title = inputs[0].value
let content = inputs[1].value

let info = {
  title: title,
  content: content
}

fetch(backendURL, {

  method: "POST",
  body: JSON.stringify(info),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    noteUl.appendChild(renderListItem(data))
  })

}
