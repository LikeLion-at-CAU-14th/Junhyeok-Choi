import Complete from "../DOM/Complete.js";

class CompleteController {
    constructor(todo) {
        this.newComplete = new Complete(todo);
        this.delBtnNode = this.newComplete.getDelBtn();

        this.delBtnNode.addEventListener('click', () => {
            this.delComplete();
        });
    }

    addComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.appendChild(this.newComplete.addRow());
    }

    delComplete() {
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newComplete.getRow());
    }
}

export default CompleteController;