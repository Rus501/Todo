import './style.scss'
import todos from './modules/createTodo.js'
import icon from './images/task.png'

const addBtn = document.querySelector('.add-todo')
const modal = document.querySelector('.modal-container')
const img = document.querySelector('.icon')
img.src = icon

function initTasks() {
  const tasks = document.querySelectorAll('.todo-list-item')

  tasks.forEach((task) => {
    task.onclick = (e) => {
      if (e.target.className.includes('delete')) {
        deleteTask(e)
        return
      }

      task.dataset.checked === 'false'
        ? (task.dataset.checked = 'true')
        : (task.dataset.checked = 'false')

      const index = todos.findIndex(
        (elem) => elem.index === parseInt(task.dataset.index)
      )
      todos[index].checked = task.dataset.checked

      localStorage.setItem('myList', JSON.stringify(todos))
    }
  })
}
initTasks()

function deleteTask(e) {
  const taskInDOM = e.target.closest('.todo-list-item')
  const taskIndex = parseInt(taskInDOM.dataset.index)

  const index = todos.findIndex((elem) => elem.index === taskIndex)
  todos.splice(index, 1) // delete from data-array

  taskInDOM.remove()
  localStorage.setItem('myList', JSON.stringify(todos))
}

function openModal() {
  modal.classList.add('modal-visible')
  modal.style.transition = 'opacity 0.3s, visibility 0.3s'
}

addBtn.onclick = openModal

function closeModalOnClickOutside(e) {
  if (
    e.target.className.includes('modal-visible') ||
    e.target.className.includes('close-modal')
  )
    closeModal()
}

modal.onmousedown = closeModalOnClickOutside

function closeModal() {
  modal.classList.remove('modal-visible')
}

export { initTasks }
