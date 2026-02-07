const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const filterStatus = document.getElementById("filter-status");
const deleteAllBtn = document.getElementById("delete-all");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

let todos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task && date) {
    todos.push({ task, date, status: "pending" });
    taskInput.value = "";
    dateInput.value = "";
    renderTodos();
  }
});

function renderTodos() {
  todoList.innerHTML = "";
  let filteredTodos = todos.filter(todo => {
    if (filterStatus.value === "all") return true;
    return todo.status === filterStatus.value;
  });

  filteredTodos = filteredTodos.filter(todo =>
    todo.task.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td class="${todo.status === "pending" ? "status-pending" : "status-completed"}">
        ${todo.status === "pending" ? "Belum Selesai" : "Selesai"}
      </td>
      <td>
        <button class="btn" onclick="toggleStatus(${index})">Ubah</button>
        <button class="btn danger" onclick="deleteTodo(${index})">Hapus</button>
      </td>
    `;
    todoList.appendChild(row);
  });

  updateCounter();
}

function toggleStatus(index) {
  todos[index].status = todos[index].status === "pending" ? "completed" : "pending";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

searchInput.addEventListener("input", renderTodos);
filterStatus.addEventListener("change", renderTodos);

function updateCounter() {
  totalCount.textContent = todos.length;
  completedCount.textContent = todos.filter(todo => todo.status === "completed").length;
  pendingCount.textContent = todos.filter(todo => todo.status === "pending").length;
}
