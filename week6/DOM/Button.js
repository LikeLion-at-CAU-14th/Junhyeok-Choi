import DOM from "./DOM.js";

class Button extends DOM {
    constructor(innerText, className) {
        super('button', innerText, className);
    }

    addIcon(src, alt = '') {
       const icon = new Image();   // Image() 객체 생성
       icon.src = src;
       icon.alt = alt;
       icon.style.width = '16px';
       icon.style.height = '16px';
       icon.style.pointerEvents = 'none'; // 클릭 이벤트 방해 방지
       this.node.innerHTML = '';          // 기존 텍스트 제거
       this.node.appendChild(icon);
       return this;                       // 메서드 체이닝 지원
   }
}

export default Button;