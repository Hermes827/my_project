//variables
const backendURL = 'http://localhost:3000/api/v1/notes'
const noteUl = document.querySelector('#notes-list')

//----------------------------------------------------

//background music

document.addEventListener('DOMContentLoaded', () => {
  var soundEffect = new Audio();
  soundEffect.src = "sounds/finalcountdown.mp3";
  soundEffect.volume = 0.5;
  soundEffect.play();
});

//-------------------------------------------------------

//primary logic

function callData(){
fetch(backendURL)
  .then(res => res.json())
  .then(data => {
    renderList(data)
    console.log(data)
  })
}

callData()


function renderList(data) {
  data.forEach((entry)=> {
    renderListItem(entry)
})
}


function renderListItem(entry) {

  const noteLi = document.createElement('li')
  noteLi.classList.add("noteLi")
  noteLi.id = entry.id

  const todoDiv = document.createElement('div')
  todoDiv.classList.add("todoDiv")
  noteLi.appendChild(todoDiv)

  const infoDiv = document.createElement('div')
  infoDiv.classList.add("infoDiv")
  noteLi.appendChild(infoDiv)

  const noteLiTitleSpan = document.createElement('div')
  noteLiTitleSpan.classList.add('noteLiTitleSpan')
  noteLiTitleSpan.textContent = entry.title
  todoDiv.appendChild(noteLiTitleSpan)

  const noteLiContentSpan = document.createElement('p')
  noteLiContentSpan.textContent = entry.content + " " //figure out how to get buttons to go underneath the LI
  noteLiContentSpan.classList.add('noteLiContentSpan')
  todoDiv.appendChild(noteLiContentSpan)

  const createdTodoAt = document.createElement('div')
  createdTodoAt.classList.add('createdTodoAt')
  createdTodoAt.textContent = new Date()
  noteLiContentSpan.appendChild(createdTodoAt)

  const dateSpan = document.createElement('div')
  dateSpan.classList.add('date-span')
  dateSpan.textContent = entry.date + " "
  infoDiv.appendChild(dateSpan)

  // const todoDiv = document.createElement('div')
  // const noteLiTitleSpan = document.createElement('span')
  // noteLiTitleSpan.textContent = entry.title
  // const noteLiSpan = document.createElement('span')
  // noteLiSpan.textContent = entry.content + " " //figure out how to get buttons to go underneath the LI
  // noteLiSpan.classList.add('noteLi-span')
  // todoDiv.appendChild(noteLiTitleSpan)
  // todoDiv.appendChild(noteLiSpan)
  // const dateSpan = document.createElement('div')
  // dateSpan.classList.add('date-span')
  // dateSpan.textContent = entry.date + " "
  // noteLi.appendChild(todoDiv)
  // todoDiv.appendChild(dateSpan)


  const deleteBtn = document.createElement('button')
  infoDiv.appendChild(deleteBtn)
  deleteBtn.textContent = "Delete"
  // deleteBtn.classList.add("btn")
  deleteBtn.addEventListener('click', (e) => {
    const deleteItem = e.target.parentElement.previousSibling

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


  const editBtn = document.createElement('button')
  infoDiv.appendChild(editBtn)
  // editBtn.classList.add("btn")
  editBtn.textContent = "Edit"
  editBtn.id = entry.id
  // noteLi.appendChild(editBtn) //figure out how to independently modularize this logic and retrieve the
  // //element that I need to append to noteLi.
  // noteLi.appendChild(deleteBtn)
  editBtn.addEventListener('click', (e) => {


    const item = e.target.parentElement
    console.log(item)


    let editForm = document.createElement("form")
    editForm.classList.add("edit-form")
    editForm.classList.remove("editForm-disappear")
  console.log("hello")

    // let editFormCancel = document.createElement("form")
    // editFormCancel.classList.add("edit-form-cancel")

    let editItemTitle = document.createElement("input")
    editItemTitle.classList.add("edit-input")
    editTextField = document.querySelectorAll('.edit-input')
    editItemTitle.placeholder = "Name of task"

    let editItemContent = document.createElement("input")
    editItemContent.classList.add("edit-input")
    editItemContent.placeholder = "Describe task"

    let editDaySelector = document.createElement("select")
    editDaySelector.classList.add("editDaySelector")
    let editMonday = document.createElement('option')
    let editTuesday = document.createElement('option')
    let editWednesday = document.createElement('option')
    let editThursday = document.createElement('option')
    let editFriday = document.createElement('option')
    let editSaturday = document.createElement('option')
    let editSunday = document.createElement('option')
    editDaySelector.appendChild(editMonday)
    editMonday.value = "Monday"
    editMonday.textContent = "Monday"

    editDaySelector.appendChild(editTuesday)
    editTuesday.value = "Tuesday"
    editTuesday.textContent = "Tuesday"

    editDaySelector.appendChild(editWednesday)
    editWednesday.value = "Wednesday"
    editWednesday.textContent = "Wednesday"

    editDaySelector.appendChild(editThursday)
    editThursday.value = "Thursday"
    editThursday.textContent = "Thursday"

    editDaySelector.appendChild(editFriday)
    editFriday.value = "Friday"
    editFriday.textContent = "Friday"

    editDaySelector.appendChild(editSaturday)
    editSaturday.value = "Saturday"
    editSaturday.textContent = "Saturday"

    editDaySelector.appendChild(editSunday)
    editSunday.value = "Sunday"
    editSunday.textContent = "Sunday"

    let editSubmitBtn = document.createElement("button")
    editSubmitBtn.textContent = "Submit"

    let cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.addEventListener('click', (e)=> {
      e.preventDefault()
      editForm.classList.add("editForm-disappear")
      console.log("hello")
    })

    item.appendChild(editForm)
    editForm.appendChild(editItemTitle)
    editForm.appendChild(editItemContent)
    editForm.appendChild(editDaySelector)
    editForm.appendChild(editSubmitBtn)
    editForm.appendChild(cancelBtn)

    const editBtnForm = document.querySelector(".edit-form")


//////////////////////////////////////////////////////////////////////////////////////

    editBtnForm.addEventListener('submit', (e) => {

      e.preventDefault()
      var soundEffect = new Audio();
      soundEffect.src = "sounds/problemo.mp3";
      soundEffect.play();

      editForm.classList.add("editForm-disappear")

      let editInputs = document.querySelectorAll(".edit-input")
      let editDaySelect = document.querySelector(".editDaySelector")
      let editTitle = editInputs[0].value
      let editContent = editInputs[1].value
      let editDay = editDaySelect.value

      const info = {
        title: editTitle,
        content: editContent,
        date: editDay

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
        const parentElement = e.target.parentElement.firstChild
        const parentElement2 = e.target.parentElement.childNodes[1]
        console.log(parentElement2)
        const editUpdate = document.createElement('span')
        editUpdate.classList.add("edit-update")
        editUpdate.textContent = data.title + ": " + data.content
        parentElement2.textContent = data.date
        parentElement.textContent = editUpdate.textContent

      })

  })

})//, {once : true}); //ttechnically works but doesnt overwrite text, writes it below it
//have to refresh to get it to update, it looks bad

  noteUl.appendChild(noteLi)

  return noteLi
}
