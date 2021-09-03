import { initTasks } from '../index.js'

const todoList = document.querySelector('.todo-list')
const modal = document.querySelector('.modal-container')

function render(title, description, date, priority, index, checked) {
	const template = `
			<div class="todo-list-item" data-index=${index} data-checked=${checked || false}>
				<span class="checkmark ${priority}"></span>
				<div class="text">
					<h2>${title}</h2>
					${description === '' ? '' : `<p>${description}</p>`}
					<span>${date}</span>
				</div>
				<div class="actions">
					<div class="delete"></div>
				</div>
			</div>
		`
		return document.createRange()
							.createContextualFragment(template)
}

function addTaskToDOM(todo) {
	const task = render(todo.title,
							  todo.description,
							  todo.date,
							  todo.priority,
							  todo.index,
							  todo.checked)

	// check if already in DOM
	if (!todo.insertedToDOM) todoList.appendChild(task)
	todo.insertedToDOM = true

	initTasks() // update event listeners
	modal.classList.remove('modal-visible')
}

export default addTaskToDOM