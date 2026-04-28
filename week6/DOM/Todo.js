import Button from "./Button.js";
import Div from "./Div.js";

// SVG를 URL 인코딩한 데이터 URL — 이미지 파일 없이 Image() 객체에 사용 가능
const CHECK_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23228be6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E";

const TRASH_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fa5252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/%3E%3Cpath d='M10 11v6M14 11v6'/%3E%3C/svg%3E";


class Todo {
    constructor(todo) {
        this.row = new Div('', 'row').node; // <div class="row"></div>
        this.textbox = new Div(todo, 'text-box'); // <div class="text-box"></div>
        this.completeBtn = new Button('', 'complete-btn');
        this.delBtn = new Button('', 'del-btn');

        // Image() 객체로 아이콘 주입
        this.completeBtn.addIcon(CHECK_ICON, '완료');
        this.delBtn.addIcon(TRASH_ICON, '삭제');
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