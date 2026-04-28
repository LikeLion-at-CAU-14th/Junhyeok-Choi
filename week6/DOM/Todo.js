import Button from "./Button.js";
import Div from "./Div.js";

class Todo {
    constructor(todo) {
        this.row = new Div('', 'row').node; // <div class="row"></div>
        this.textbox = new Div(todo, 'text-box'); // <div class="text-box"></div>
        this.completeBtn = new Button('완료', 'complete-btn');
        this.delBtn = new Button('삭제', 'del-btn');
    }
    addRow () {
        [this.textbox, this.completeBtn, this.delBtn].forEach((dom) => {
            this.row.appendChild(dom.node);
        })
        return this.row;
    }
    getRow() {
        return this.row;
    }
    getCompleteBtn() {
        return this.completeBtn.node;
    }
    getDelbtn() {
        return this.delBtn.node;
    }
    getInnerText() {
        return this.textbox.node;
    }
}

export default Todo;