function createItem(){

let inputs = document.querySelectorAll(".input-text")
let title = inputs[0].value
let description = inputs[1].value

let data = {
  title: title,
  description: description
}

fetch(backendURL, {

  method: "POST",
  body: JSON.stringify(data),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

}
