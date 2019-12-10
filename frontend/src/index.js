// variables

const backendURL = 'http://localhost:3000/api/v1/notes'
const noteUl = document.querySelector('#notes-list')

//----------------------------------------------------

// background music

document.addEventListener('DOMContentLoaded', () => {
  var soundEffect = new Audio();
  soundEffect.src = "sounds/finalcountdown.mp3";
  soundEffect.volume = 0.5;
  soundEffect.play();
});

//-------------------------------------------------------

// primary logic

function callData(){
fetch(backendURL)
  .then(res => res.json())
  .then(data => {
    renderList(data)
  })
}

callData()


function renderList(data) {
  data.forEach((entry)=> {
    renderListItem(entry)
})
}


function renderListItem(entry) {

  // elements

  const noteLi = document.createElement('li')
  noteLi.classList.add("noteLi")
  noteLi.id = entry.id

  const todoDiv = document.createElement('div')
  todoDiv.classList.add("todoDiv")
  noteLi.appendChild(todoDiv)

  const noteLiTitleSpan = document.createElement('div')
  noteLiTitleSpan.classList.add('noteLiTitleSpan')
  noteLiTitleSpan.textContent = entry.title
  todoDiv.appendChild(noteLiTitleSpan)

  const noteLiContentSpan = document.createElement('p')
  noteLiContentSpan.classList.add('noteLiContentSpan')
  noteLiContentSpan.textContent = entry.content + " " //figure out how to get buttons to go underneath the LI
  todoDiv.appendChild(noteLiContentSpan)

  const createdTodoAt = document.createElement('div')
  createdTodoAt.classList.add('createdTodoAt')
  createdTodoAt.textContent = new Date()
  noteLiContentSpan.appendChild(createdTodoAt)

  const infoDiv = document.createElement('div')
  infoDiv.classList.add("infoDiv")
  noteLi.appendChild(infoDiv)

  const dateSpan = document.createElement('div')
  dateSpan.classList.add('date-span')
  dateSpan.textContent = entry.date + " "
  infoDiv.appendChild(dateSpan)

  const deleteBtn = document.createElement('button')
  infoDiv.appendChild(deleteBtn)
  deleteBtn.textContent = "Delete"

  //--------------------------------------


  deleteBtn.addEventListener('click', (e) => {

    const deleteItem = e.target.parentElement.closest(".noteLi")

    var soundEffect = new Audio();
    soundEffect.src = "sounds/baby.mp3";
    soundEffect.play();

    setInterval(function(){
    deleteItem.remove()
  }, 500);

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
  editBtn.textContent = "Edit"
  editBtn.id = entry.id

  // noteLi.appendChild(editBtn) //figure out how to independently modularize this logic and retrieve the
  // //element that I need to append to noteLi.
  // noteLi.appendChild(deleteBtn)

  editBtn.addEventListener('click', (e) => {

    const editItem = e.target.parentElement
    const deleteBtn1 = editItem.childNodes[1]
    const editBtn1 = editItem.childNodes[2]

    const editForm = document.createElement("form")
    editForm.classList.add("edit-form")
    deleteBtn1.classList.add("editForm-disappear")
    editBtn1.classList.add("editForm-disappear")
    const createNewItemForm1 = document.querySelector(".originalForm")
    const createNewItemForm2 = document.querySelector(".create-new-item")
    console.log(createNewItemForm2)
    createNewItemForm2.classList.add("editForm-disappear")
    createNewItemForm1.appendChild(editForm)

    const editItemH3 = document.createElement("h3")
    editItemH3.classList.add()
    editItemH3.textContent = "Edit todo item!"
    editForm.appendChild(editItemH3)

    const editItemTitle = document.createElement("input")
    editItemTitle.classList.add("edit-input1")
    editItemTitle.classList.add("input-text1")
    editItemTitle.placeholder = "Name of task"
    editForm.appendChild(editItemTitle)

    const spacer = document.createElement("br")
    editForm.appendChild(spacer)

    const editItemContent = document.createElement("input")
    editItemContent.classList.add("edit-input2")
    editItemContent.classList.add("input-text2")
    editItemContent.placeholder = "Describe task"
    editForm.appendChild(editItemContent)

    const spacer1 = document.createElement("br")
    editForm.appendChild(spacer1)

    // edit day selector

    const editDaySelector = document.createElement("select")
    editDaySelector.classList.add("editDaySelector")
    editDaySelector.classList.add("select-day")
    editForm.appendChild(editDaySelector)

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

    //---------------------------------------

    const editSubmitBtn = document.createElement("button")
    editSubmitBtn.textContent = "Submit"
    editSubmitBtn.classList.add("submit")
    editForm.appendChild(editSubmitBtn)


    const cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.classList.add("submit")
    editForm.appendChild(cancelBtn)


    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault()
      editForm.classList.add("editForm-disappear")
      deleteBtn1.classList.remove("editForm-disappear")
      editBtn1.classList.remove("editForm-disappear")
      createNewItemForm2.classList.remove("editForm-disappear")
    })

    const editBtnForm = document.querySelector(".edit-form")

    editBtnForm.addEventListener('submit', (e) => {
      e.preventDefault()

      var soundEffect = new Audio();
      soundEffect.src = "sounds/problemo.mp3";
      soundEffect.play();

      editForm.classList.add("editForm-disappear")
      deleteBtn1.classList.remove("editForm-disappear")
      editBtn1.classList.remove("editForm-disappear")
      createNewItemForm2.classList.remove("editForm-disappear")



      const input1 = document.querySelector(".edit-input1")
      const input2 = document.querySelector(".edit-input2")


      const editDaySelect = document.querySelector(".editDaySelector")
      const editInput1 = input1.value
      const editInput2 = input2.value
      const editDay = editDaySelect.value

      const info = {
        title: editInput1,
        content: editInput2,
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

        const editTitle = document.querySelector(".noteLiTitleSpan")
        editTitle.textContent = data.title

        const editContent = document.querySelector(".noteLiContentSpan")
        editContent.textContent = data.content

        const editDate = document.querySelector(".date-span")
        editDate.textContent = data.date

        const editedDate = document.createElement("div")
        editedDate.classList.add("createdTodoAt")
        noteLiContentSpan.appendChild(editedDate)
        editedDate.textContent = new Date()

      })
  })
})
  noteUl.appendChild(noteLi)
  // return noteLi //it still works even if I dont return noteli, why is this?
}

// const parentElement1 = e.target.parentElement.firstChild
// parentElement1.textContent = data.date
//
// const parentElement2 = e.target.parentElement.parentElement.firstChild.childNodes[0]
// parentElement2.textContent = data.title
//
// const parentElement3 = e.target.parentElement.parentElement.firstChild.childNodes[1]
// parentElement3.textContent = data.content
//
