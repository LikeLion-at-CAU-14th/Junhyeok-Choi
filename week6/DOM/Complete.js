import Button from "./Button.js";
import Div from "./Div.js";

class Complete {
    constructor(todo) {
        this.row = new Div('', 'row').node;
        this.textbox = new Div(todo, 'text-box');
        this.textbox.node.classList.add('done-text'); 
        this.delBtn = new Button('삭제', 'del-btn');
    }

    addRow() {
        [this.textbox, this.delBtn].forEach((dom) => {
            this.row.appendChild(dom.node);
        });
        return this.row;
    }

    getRow()   { return this.row; }
    getDelBtn(){ return this.delBtn.node; }
}

export default Complete;