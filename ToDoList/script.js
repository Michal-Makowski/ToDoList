let toDoInput;
let errorInfo;
let addButton;
let ulList;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toDoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addButton = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
};

const prepareDOMEvents = () => {
	addButton.addEventListener("click", addNewTask);
};

const addNewTask = () => {
	if (toDoInput.value !== "") {
		const newTask = document.createElement("li");
		newTask.textContent = toDoInput.value;
		ulList.append(newTask);
		createToolsArea(newTask);
		toDoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Jede Aufgabe braucht Inhalt :)";
	}
};

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

document.addEventListener("DOMContentLoaded", main);
