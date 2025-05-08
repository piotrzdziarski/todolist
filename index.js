const
	toDoList = document.getElementById("todolist");
	doneList = document.getElementById("donelist"),
	toDoBtn = document.getElementById("todobtn")
	doneBtn = document.getElementById("donebtn");
toDoBtn.onclick = () => {
	toDoList.classList.add("list-selected");
	toDoBtn.classList.add("btn-selected");
	doneBtn.classList.remove("btn-selected");
	doneList.classList.remove("list-selected");
};
doneBtn.onclick = () => {
	toDoList.classList.remove("list-selected");
	toDoBtn.classList.remove("btn-selected");
	doneBtn.classList.add("btn-selected");
	doneList.classList.add("list-selected");
};
let toDoTasks = [], doneTasks = [];
try {
	toDoTasks = JSON.parse(localStorage.toDoTasks),
	doneTasks = JSON.parse(localStorage.doneTasks);
} catch (e) {}
drawToDoTasks();
drawDoneTasks();

function drawTask(i, text) {
	const
		li =document.createElement("li"),
		number = document.createElement("div"),
		task = document.createElement("div");
	number.className = "number";
	number.innerText = i + 1 + ".";
	task.className = "text";
	task.innerText = text;
	li.appendChild(number);
	li.appendChild(task);
	return li;
}

function drawToDoTask(i, text) {
	const
		li = drawTask(i, text);
		button = document.createElement("button");
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	button.className = "btn-svg";
	button.onclick = () => {
		toDoTasks.splice(i, 1);
		localStorage.toDoTasks = JSON.stringify(toDoTasks);
		doneTasks.push(text);
		localStorage.doneTasks = JSON.stringify(doneTasks);
		toDoList.innerHTML = "";
		doneList.innerHTML = "";
		drawToDoTasks();
		drawDoneTasks();
	};
	svg.setAttributeNS(null, "viewBox", "0 0 29.756 29.756");
	path.setAttributeNS(null, "d", "M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173 c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752 c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z");
	svg.appendChild(path);
	button.appendChild(svg);
	li.appendChild(button);
	toDoList.appendChild(li);
}

function drawDoneTask(i, text) {
	const
		li = drawTask(i, text);
		button = document.createElement("button");
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
		buttonx = document.createElement("button"),
		x1 = document.createElement("div"),
		x2 = document.createElement("div");
	button.className = "btn-svg";
	svg.setAttributeNS(null, "viewBox", "0 0 512 512");
	path.setAttributeNS(null, "d", "M511.563,434.259c-1.728-142.329-124.42-258.242-277.087-263.419V95.999c0-17.645-14.342-31.999-31.974-31.999 c-7.931,0-15.591,3.042-21.524,8.562c0,0-134.828,124.829-173.609,163.755C2.623,241.109,0,248.088,0,255.994 c0,7.906,2.623,14.885,7.369,19.687c38.781,38.915,173.609,163.745,173.609,163.745c5.933,5.521,13.593,8.562,21.524,8.562 c17.631,0,31.974-14.354,31.974-31.999v-74.591c153.479,2.156,255.792,50.603,255.792,95.924c0,5.896,4.767,10.666,10.658,10.666 c0.167,0.021,0.333,0.01,0.416,0c5.891,0,10.658-4.771,10.658-10.666C512,436.259,511.854,435.228,511.563,434.259z");
	svg.appendChild(path);
	button.appendChild(svg);
	button.onclick = () => {
		doneTasks.splice(i, 1);
		localStorage.doneTasks = JSON.stringify(doneTasks);
		toDoTasks.push(text);
		localStorage.toDoTasks = JSON.stringify(toDoTasks);
		toDoList.innerHTML = "";
		doneList.innerHTML = "";
		drawToDoTasks();
		drawDoneTasks();
	};
	li.appendChild(button);
	buttonx.className = "btn-svg btn-x";
	x1.className = "x x-1";
	x2.className = "x x-2";
	buttonx.appendChild(x1);
	buttonx.appendChild(x2);
	buttonx.onclick = () => {
		doneTasks.splice(i, 1);
		localStorage.doneTasks = JSON.stringify(doneTasks);
		doneList.innerHTML = "";
		drawDoneTasks();
	};
	li.appendChild(buttonx);
	doneList.appendChild(li);
}
function drawToDoTasks() {
	drawTasks(toDoTasks, toDoList, drawToDoTask);
}
function drawDoneTasks() {
	drawTasks(doneTasks, doneList, drawDoneTask);
}
function drawTasks(tasks, list, fn) {
	if (!tasks.length) {
		const p = document.createElement("p");
		p.innerText = "The list is empty."
		list.appendChild(p);
		return;
	}
	for (let i = 0; i < tasks.length; i++)
		fn(i, tasks[i]);
}

const form = document.getElementById("form");
const task = document.getElementById("task");
task.onkeypress = (e) => {
	if (e.ctrlKey && e.keyCode == 13)
		form.requestSubmit();
};
form.onsubmit = (e) => {
	e.preventDefault();
	if (!task.value) return;
	toDoTasks.push(task.value);
	task.value = "";
	localStorage.toDoTasks = JSON.stringify(toDoTasks);
	toDoList.innerHTML = "";
	drawToDoTasks();
};
