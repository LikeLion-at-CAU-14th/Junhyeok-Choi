import Todo from "../DOM/Todo.js";
import CompleteController from "./CompleteController.js";

class TodoController {
    constructor(todo) {
        this.newTodo = new Todo(todo);
        this.delBtnNode = this.newTodo.getDelbtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        this.innerNode = this.newTodo.getInnerText();

        this.delBtnNode.addEventListener('click', () => {
            this.delTodo();
        });
        this.comBtnNode.addEventListener('click', () => {
            this.doneTodo();
        });
    };

        addTodo() {
            const todoList = document.getElementById("to-do-list");
            todoList.appendChild(this.newTodo.addRow())
        }

        delTodo() {
            // <div id="to-do-list"></div>
            const todoList = document.getElementById("to-do-list");
            todoList.removeChild(this.newTodo.getRow());
        }

        doneTodo() {
            const todoText = this.innerNode.innerText;
            // 1. Todo 목록에서 제거
            const todoList = document.getElementById("to-do-list");
            todoList.removeChild(this.newTodo.getRow());
            // 2. Complete 목록에 새 항목으로 추가
            const cc = new CompleteController(todoText);
            cc.addComplete();
        }
}

export default TodoController;