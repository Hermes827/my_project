const backendURL = 'http://localhost:3000/api/v1/notes'
const noteUl = document.querySelector('#notes-list')


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

// function renderList(data) {
//   data.forEach((entry)=> {
//     noteUl.appendChild(renderListItem(entry))
//   })
// }
//this doesnt work, why? It worked in toytales

function viewEntry(data) {
}

function renderListItem(entry) {
  const noteLi = document.createElement('li')
  noteLi.id = entry.id
  noteLi.textContent = entry.title + ": " + entry.content //figure out how to get buttons to go underneath the LI

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  // deleteBtn.classList.add("delete")
  deleteBtn.addEventListener('click', (e) => {
    const deleteItem = e.target.parentElement
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
  noteLi.appendChild(deleteBtn)

  ////////////////////////////////////////////////////////////////////

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.id = entry.id
  noteLi.appendChild(editBtn) //figure out how to independently modularize this logic and retrieve the
  //element that I need to append to noteLi.
  editBtn.addEventListener('click', (e) => {

    // e.preventDefault()



    const item = e.target.parentElement
    console.log(item)

    let editForm = document.createElement("form")
    editForm.classList.add("edit-form")

    let editItemTitle = document.createElement("input")
    editItemTitle.classList.add("edit-input")



    let editItemContent = document.createElement("input")
    editItemContent.classList.add("edit-input")

    let editSubmitBtn = document.createElement("button")
    editSubmitBtn.textContent = "Submit"

    let cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"


    item.appendChild(editForm)
    editForm.appendChild(editItemTitle)
    editForm.appendChild(editItemContent)
    editForm.appendChild(editSubmitBtn)
    editForm.appendChild(cancelBtn)

    console.log(editForm)

    // item.appendChild(editItemTitle)
    // item.appendChild(editItemContent)



    const editBtnForm = document.querySelector(".edit-form")


//////////////////////////////////////////////////////////////////////////////////////




    editBtnForm.addEventListener('submit', (e) => {

      e.preventDefault()

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

})

  // const viewBtn = document.createElement('button')
  // viewBtn.textContent = "View Entire Entry"
  // viewBtn.addEventListener('click', viewEntry(entry))
  // noteLi.appendChild(viewBtn)
  noteUl.appendChild(noteLi)

  return noteLi
}

// function deleteEntry(entry){
//
//   document.querySelector('.delete').addEventListener('click', (e) => {
//     const deleteItem = e.target.parentElement
//     deleteItem.remove()
//
//     fetch(backendURL + '/' + entry.id, {
//
//       method: "DELETE",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
//   })
//   }
