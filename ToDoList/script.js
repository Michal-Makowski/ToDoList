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

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
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
// --- Lisener --- //
const prepareDOMEvents = () => {
	addButton.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCancelBtn.addEventListener("click", closeEditTask);
	popupAddBtn.addEventListener("click", confirmEditTask);
	taskInput.addEventListener("keyup", enterKeyCheck);
	popupInput.addEventListener("keyup", enterKeyCheckPopup);
};
// --- Add new task + validation --- //
const addNewTask = () => {
	if (taskInput.value !== "") {
		const newTask = document.createElement("li");
		newTask.textContent = taskInput.value;
		ulList.append(newTask);
		createToolsArea(newTask);
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
// --- Check what button was clicked in "li" --- //
const checkClick = e => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTask(e);
	} else if (e.target.matches(".delete")) {
		deleteTask(e);
	}
};
// --- Open Popup "Window" and save Task text to change --- //
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
// --- Edit + Validation --- //
const confirmEditTask = () => {
	if (popupInput.value !== "") {
		taskToEdit.firstChild.textContent = popupInput.value;
		closeEditTask();
	} else {
		popupInfo.textContent = "Jede Aufgabe braucht Inhalt :)";
	}
};
// --- Delete Task + messege when we have no more Task--- //
const deleteTask = e => {
	e.target.closest("li").remove();

	const anyTask = ulList.querySelectorAll("li");

	if (anyTask.length === 0) {
		errorInfo.textContent = "Keine Aufgaben.";
	}
};
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

document.addEventListener("DOMContentLoaded", main);
