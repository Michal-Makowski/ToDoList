let taskInput;
let errorInfo;
let addButton;
let ulList;
let popup;
let popupInfo;
let taskToEdit;
let popupInput;
let popupAddBtn;
let popupCancelBtn;
const BACKEND_URL = "https://mmtodobackend.onrender.com";

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	getTaskFromBackEnd();
};
// --- ELements --- //
const prepareDOMElements = () => {
	taskInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addButton = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCancelBtn = document.querySelector(".cancel");
};
// --- Listener --- //
const prepareDOMEvents = () => {
	addButton.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCancelBtn.addEventListener("click", closeEditTask);
	popupAddBtn.addEventListener("click", confirmEditTask);
	taskInput.addEventListener("keyup", enterKeyCheck);
	popupInput.addEventListener("keyup", enterKeyCheckPopup);
};
// --- Add new task + validation + send task to BackEnd --- //
const addNewTask = () => {
	if (taskInput.value !== "") {
		let taskObject = {
			// object wchich we send to backEnd
			taskTodo: taskInput.value,
			complete: false,
		};
		const newTask = document.createElement("li");
		newTask.textContent = taskInput.value;
		ulList.append(newTask);
		createToolsArea(newTask);
		sendTaskToBackEnd(taskObject); // send task to BackEnd
		taskInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Jede Aufgabe braucht Inhalt :)";
	}
};
// --- Create new button "complete" "edit" and "delete" --- //
const createToolsArea = newTask => {
	const toolsPannel = document.createElement("div");
	toolsPannel.classList.add("tools");
	newTask.append(toolsPannel);

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.textContent = "EDIT";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPannel.append(completeBtn, editBtn, deleteBtn);
};
// --- Check wchich button was clicked in "li" + change task status --- //
const checkClick = e => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
		// when button Complete was clicked we chagne status by task object in BackEnd
		completedBackEnd(
			e.target
				.closest("li")
				.textContent.substring(0, e.target.closest("li").textContent.length - 4)
		);
	} else if (e.target.matches(".edit")) {
		editTask(e);
	} else if (e.target.matches(".delete")) {
		deleteTask(e);
	}
};
// <<<--->>> Edit popup <<<--->>> //
// --- Open Popup and save Task text to change --- //
const editTask = e => {
	taskToEdit = e.target.closest("li");
	popupInput.value = taskToEdit.firstChild.textContent;
	popup.style.display = "flex";
};
// --- Close Popup "Window" --- //
const closeEditTask = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};
// --- Edit + Validation + send task object to change --- //
const confirmEditTask = () => {
	if (popupInput.value !== "") {
		const oldTask = taskToEdit.firstChild.textContent;
		taskToEdit.firstChild.textContent = popupInput.value;
		editTaskBackEnd(oldTask, popupInput.value);
		closeEditTask();
	} else {
		popupInfo.textContent = "Jede Aufgabe braucht Inhalt :)";
	}
};
// <<<--->>>  <<<--->>> //
// --- Delete Task + messege when we have no more Task + remove task object from BackEnd--- //
const deleteTask = e => {
	e.target.closest("li").remove();
	// when button Delete was clicked we remove task object from BackEnd
	deleteFromBackEnd(
		e.target
			.closest("li")
			.textContent.substring(0, e.target.closest("li").textContent.length - 4)
	);

	const anyTask = ulList.querySelectorAll("li");
	if (anyTask.length === 0) {
		errorInfo.textContent = "Keine Aufgaben.";
	}
};
// <<<--->>> Enter button <<<--->>> //
// --- Add new task by Enter on keyboard --- //
const enterKeyCheck = e => {
	if (e.key === "Enter") {
		addNewTask();
	}
};
// --- Confirm edit task by Enter on keyboard --- //
const enterKeyCheckPopup = e => {
	if (e.key === "Enter") {
		confirmEditTask();
	}
};

// <<<--->>> BackEnd <<<--->>> //
// --- Send task object to BackEnd --- //
function sendTaskToBackEnd(task) {
	fetch(`${BACKEND_URL}/task`, {
		method: "POST",
		body: JSON.stringify(task),
		headers: {
			"content-type": "application/json",
		},
	});
}
// --- Get array with task object + build task + status check --- //
function getTaskFromBackEnd() {
	fetch(`${BACKEND_URL}/task`)
		.then(res => res.json())
		.then(({ taskList }) => {
			taskList.forEach(taskToGet => {
				const newTask = document.createElement("li");
				newTask.textContent = taskToGet.taskTodo;
				ulList.append(newTask);
				createToolsArea(newTask);
				console.log(taskToGet);
				if (taskToGet.complete === true) {
					newTask.querySelector(".complete").classList.toggle("completed");
					newTask.classList.toggle("completed");
				}
			});
		})
		.catch(err => console.error(err));
}
// --- Delete task object from BackEnd --- //
function deleteFromBackEnd(task) {
	fetch(`${BACKEND_URL}/task/${task}`, {
		method: "DELETE",
	});
}
// --- Edit task input in BackEnd --- //
function editTaskBackEnd(oldTask, newTask) {
	const taskToEdit = {
		oldTask: oldTask,
		newTask: newTask,
	};
	fetch(`${BACKEND_URL}/task`, {
		method: "PATCH",
		body: JSON.stringify(taskToEdit),
		headers: {
			"content-type": "application/json",
		},
	});
}
// --- Edit task status in BackEnd --- //
function completedBackEnd(task) {
	const task1 = {
		task: task,
		status: "1",
	};
	fetch(`${BACKEND_URL}/task/status`, {
		method: "PATCH",
		body: JSON.stringify(task1),
		headers: {
			"content-type": "application/json",
		},
	});
}

document.addEventListener("DOMContentLoaded", main);
