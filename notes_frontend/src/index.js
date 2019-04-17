const backendURL = 'http://localhost:3000/api/v1/notes'
const noteUl = document.querySelector('#notes-list')

document.addEventListener('DOMContentLoaded', () => {
  var soundEffect = new Audio();
  soundEffect.src = "sounds/finalcountdown.mp3";
  soundEffect.volume = 0.25;
  soundEffect.play();
});


fetch(backendURL)
  .then(res => res.json())
  .then(data => {
    renderList(data)
  })

function renderList(data) {
  data.forEach((entry)=> {
    renderListItem(entry)
})
}

function viewEntry(data) {
}

function renderListItem(entry) {
  const noteLi = document.createElement('li')
  noteLi.id = entry.id
  noteLi.classList.add(".font")
  noteLi.textContent = entry.title + ": " + entry.content //figure out how to get buttons to go underneath the LI

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.addEventListener('click', (e) => {
    const deleteItem = e.target.parentElement

    var soundEffect = new Audio();
    soundEffect.src = "sounds/baby.mp3";
    soundEffect.play();

    deleteItem.remove()

    fetch(backendURL + '/' + entry.id, {

      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  })

  ////////////////////////////////////////////////////////////////////

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.id = entry.id
  noteLi.appendChild(editBtn) //figure out how to independently modularize this logic and retrieve the
  //element that I need to append to noteLi.
  noteLi.appendChild(deleteBtn)
  editBtn.addEventListener('click', (e) => {

    const item = e.target.parentElement
    console.log(item)

    let editForm = document.createElement("form")
    editForm.classList.add("edit-form")

    let editFormCancel = document.createElement("form")
    editFormCancel.classList.add("edit-form-cancel")

    let editItemTitle = document.createElement("input")
    editItemTitle.classList.add("edit-input")
    editTextField = document.querySelectorAll('.edit-input')
    editItemTitle.placeholder = "Name of task"

    let editItemContent = document.createElement("input")
    editItemContent.classList.add("edit-input")
    editItemContent.placeholder = "Describe task"

    let editSubmitBtn = document.createElement("button")
    editSubmitBtn.textContent = "Submit"

    let cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.addEventListener('click', ()=> {
      console.log("hello")
    })

    item.appendChild(editFormCancel)
    editFormCancel.appendChild(editForm)
    editForm.appendChild(editItemTitle)
    editForm.appendChild(editItemContent)
    editForm.appendChild(editSubmitBtn)
    editFormCancel.appendChild(cancelBtn)

    const editBtnForm = document.querySelector(".edit-form")


//////////////////////////////////////////////////////////////////////////////////////

    editBtnForm.addEventListener('submit', (e) => {

      e.preventDefault()
      var soundEffect = new Audio();
      soundEffect.src = "sounds/problemo.mp3";
      soundEffect.play();

      let editInputs = document.querySelectorAll(".edit-input")
      let editTitle = editInputs[0].value
      let editContent = editInputs[1].value

      const info = {
        title: editTitle,
        content: editContent
      }


    fetch(backendURL + "/" + entry.id, {

      method: "PATCH",
      body: JSON.stringify(info),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        e.target.parentElement.textContent = data.title + ": " + data.content

      })

  })

}, {once : true}); //ttechnically works but doesnt overwrite text, writes it below it
//have to refresh to get it to update, it looks bad

  noteUl.appendChild(noteLi)

  return noteLi
}
