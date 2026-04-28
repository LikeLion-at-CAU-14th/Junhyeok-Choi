import Button from "./Button.js";
import Div from "./Div.js";
const TRASH_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fa5252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/%3E%3Cpath d='M10 11v6M14 11v6'/%3E%3C/svg%3E";

class Complete {
    constructor(todo) {
        this.row = new Div('', 'row').node;
        this.textbox = new Div(todo, 'text-box');
        this.textbox.node.classList.add('done-text'); 
        this.delBtn = new Button(' ', 'del-btn');
        this.delBtn.addIcon(TRASH_ICON, '삭제');
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