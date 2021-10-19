import { format, parseISO } from 'date-fns'
import addTaskToDOM from './DOM.js'

const form = document.querySelector('form')
const inputDate = document.querySelector('input[name="date"]')
inputDate.value = format(new Date(), 'yyyy-MM-dd')

let todos = []
let index = 0

const todoFactory = (title, description, date, priority, index) => {
  return { title, description, date, priority, index }
}

const getFormValues = (e) => {
  const data = new FormData(e.target)
  return Object.fromEntries(data.entries())
}

const formatDate = (date) => {
  return format(parseISO(date), 'eee do MMM')
}

form.onsubmit = (e) => {
  e.preventDefault()

  // get submitted form values
  const taskValues = getFormValues(e)

  if (!taskValues.title) return

  const task = todoFactory(
    taskValues.title,
    taskValues.description,
    formatDate(taskValues.date),
    taskValues.priority,
    index
  )
  todos.push(task)
  addTaskToDOM(task)
  saveToLocalStorage()
  index++

  e.target.reset()
  inputDate.value = format(new Date(), 'yyyy-MM-dd')
}

function saveToLocalStorage() {
  localStorage.setItem('myList', JSON.stringify(todos))
}

function restoreFromLocalStorage() {
  todos = JSON.parse(localStorage.getItem('myList'))

  if (todos === null) todos = []

  const length = todos.length
  length > 0 ? (index = todos[length - 1].index + 1) : (index = 0)

  todos.forEach((item) => {
    item.insertedToDOM = false
    addTaskToDOM(item)
  })
}
restoreFromLocalStorage()

export default todos
