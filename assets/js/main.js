const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");

const totalTodos = document.getElementById("total");
const completedTodos = document.getElementById("complete");

const todoUl = document.getElementById("toDos");

let todoList = [
    { name: "Hacer ejercicio", id: 1, completed: false },
    { name: "Estudiar", id: 2, completed: false },
    { name: "Lavar la losa", id: 3, completed: false },
];

const render = (arr) => {
    let list = "";
    let completedTotal = 0
    todoUl.innerHTML = "";
    arr.forEach((item) => {
      let status = ""
      if(item.completed){
        status = "checked"
        completedTotal ++
      }
        let template = `<li>${item.id} ${item.name} <input data-update="${item.id}" type="checkbox" ${status}> <button data-delete="${item.id}">❌</button></li>`;
        list += template;
    });
    todoUl.innerHTML = list;
    totalTodos.textContent = arr.length;
    completedTodos.textContent = completedTotal

};
render(todoList);

const addTodo = () => {
    let newTodo = {
        name: todoInput.value,
        id: todoList.length + 1,
        completed: false,
    };
    todoList.push(newTodo);
    render(todoList);
    todoInput.value = "";
};

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

const deleteTodo = (e) => {
    if (e.target.dataset.delete) {
        const id = e.target.dataset.delete;
        console.log(id);
        const index = todoList.findIndex((item) => item.id == id);
        todoList.splice(index, 1);
        render(todoList);
    }
};

const updateTodo = (e) => {
  if(e.target.dataset.update){
    const id = e.target.dataset.update;
    console.log(id)
    const index = todoList.findIndex((item) => item.id == id)
    todoList[index].completed = !todoList[index].completed
    // console.log(todoList[index])

    // const checkbox = document.querySelector("[data-update]")
    // checkbox.addEventListener("click", () => )
    // console.log(checkbox.checked)
    render(todoList)
  }
}

todoUl.addEventListener("click", (e) => {
    deleteTodo(e);
    updateTodo(e)
});
