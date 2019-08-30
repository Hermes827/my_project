const backendURL = 'http://localhost:3000/api/v1/notes'
const noteUl = document.querySelector('#notes-list')
const backendComments = 'http://localhost:3000/api/v1/comments'
const quoteURL = 'http://localhost:3000/api/v2/quotes'

document.addEventListener('DOMContentLoaded', () => {
  var soundEffect = new Audio();
  soundEffect.src = "sounds/finalcountdown.mp3";
  soundEffect.volume = 0.5;
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
  // noteLi.classList.add("font")
  noteLi.classList.add("noteLi")
  // console.log(entry)
  const noteLiSpan = document.createElement('span')
  noteLiSpan.textContent = entry.title + ": " + entry.content + " " //figure out how to get buttons to go underneath the LI
  noteLiSpan.classList.add('noteLi-span')
  noteLi.appendChild(noteLiSpan)
  const dateSpan = document.createElement('div')
  dateSpan.classList.add('date-span')
  dateSpan.textContent = entry.date + " "
  noteLi.appendChild(dateSpan)

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  // deleteBtn.classList.add("btn")
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

  const commentBtn = document.createElement('button')
  // commentBtn.classList.add("btn")
  // commentBtn.classList.add(".commentBtn")
  commentBtn.textContent = "Comment"
  // const spaceDiv = document.createElement('div')
  // // noteli.appendChild(spaceDiv)
  noteLi.appendChild(commentBtn)
  commentBtn.addEventListener('click', (e)=> {
    const commentThing = e.target.parentElement

    console.log(commentThing)

    // const commentLi = document.createElement('li')
    const commentInput = document.createElement('input')
    commentInput.placeholder = "Enter comment here"
    const commentUsername = document.createElement('input')
    commentUsername.placeholder = "Enter username here"
    const commentSubmitBtn = document.createElement('button')
    const commentCancelBtn = document.createElement('button')
    commentCancelBtn.textContent = "Cancel"
    commentCancelBtn.addEventListener('click', (e)=> {
      e.preventDefault()
      commentForm.classList.add("editForm-disappear")
      console.log("hello")
    })
    const commentForm = document.createElement('form')
    const commentUl = document.createElement('ul')
    commentThing.appendChild(commentForm)
    commentThing.appendChild(commentUl)
    commentForm.appendChild(commentUsername)
    commentForm.appendChild(commentInput)
    commentForm.appendChild(commentSubmitBtn)
    commentForm.appendChild(commentCancelBtn)
    commentSubmitBtn.textContent = "submit"

    commentForm.addEventListener('submit', (e)=> {
        e.preventDefault()

        console.log(e.target.parentElement)
        console.log("hello")

        const commentLi = document.createElement('li')
        commentLi.textContent = commentUsername.value + ": " + commentInput.value
        commentUl.appendChild(commentLi)
        // noteLi.appendChild(commentUl)


        const bodyData = {
          username: commentUsername.value,
          content: commentInput.value,
          note_id: entry.id
        }

        fetch(backendComments, {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          // commentLi.textContent = data.username + ": " + data.content
          // commentUl.appendChild(commentLi)
        })


    })
    // commentInput.classList.add("comment-input")
    //
    // //working on comment functionality, need to finish programming submit button stuff
    //
    // commentThing.appendChild(commentLi)
  })

  /////////////////////////////////////////////////////////////////////


  const editBtn = document.createElement('button')
  // editBtn.classList.add("btn")
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

function renderQuote() {
  fetch(quoteURL)
  .then(res => res.json())
  .then(data => {

      const mathVar = Math.floor((Math.random() * 10) + 1);
      const randomQuoteGen = data[mathVar]

      const randomQuoteName = document.querySelector(".quoteName")
      const randomQuoteContent = document.querySelector(".quoteContent")
      randomQuoteName.textContent = '- "' + randomQuoteGen.name + '"'
      randomQuoteContent.textContent = '"' + randomQuoteGen.content + '"'
  })
}

renderQuote()
