const formClass = document.querySelector(".create-new-item")
formClass.addEventListener('submit', createItem)

function createItem(e){
e.preventDefault()

var soundEffect = new Audio();
soundEffect.src = "sounds/live.mp3";
soundEffect.play();

let input1 = document.querySelector(".input-text1")
let input2 = document.querySelector(".input-text2")
let daySelect = document.querySelector(".select-day")
let date = daySelect.value
let title = input1.value
let content = input2.value

let info = {
  title: title,
  content: content,
  date: date
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
    noteUl.appendChild(renderListItem(data))
  })
input1.value = null
input2.value = null
}
