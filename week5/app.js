// 1. js파일에서 접근해야하는 html dom 요소 선언
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

const computerText = document.getElementById("computer-hand-text");
const computerIcon = document.getElementById("computer-hand-icon");

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

//점수 상태 변수
let myScore = 0;
let computerScore = 0;

//점수판 DOM 요소
const myScoreText = document.querySelector(".my-score");
const computerScoreText = document.querySelector(".computer-score");
const displayResult = document.getElementById("display-result");

// 리셋 버튼 DOM 요소
const resetBtn = document.getElementById("reset-button");

// 2. 이벤트 설정
rockBtn.addEventListener("click", displayMyChoice);
scissorsBtn.addEventListener("click", displayMyChoice);
paperBtn.addEventListener("click", displayMyChoice);

// 리셋 버튼 클릭 이벤트
resetBtn.addEventListener("click", resetGame);

// 3. displayMyChoice 함수 설정
function displayMyChoice(e) {
    let clickedBtn = e.currentTarget.id;
    let clickedIcon = e.target.className;

    myHandText.innerText = clickedBtn;
    myHandIcon.className = clickedIcon;

    start(clickedBtn);
}

// 4. 랜덤으로 뱉는 컴퓨터
function getComChoice() {
    const randomValue = {
        0 : ["rock", "fa-regular fa-hand-back-fist"],
        1 : ["scissors", "fa-regular fa-hand-scissors fa-rotate-90"],
        2 : ["paper", "fa-regular fa-hand"],
    };

    const randomIndex = Math.floor(Math.random() * 3);

    return randomValue[randomIndex];
}

// 5. 컴퓨터의 선택이 화면에 보이도록 하는 함수 
function displayComChoice(result) {
    computerText.innerText = result[0];
    computerIcon.className = result[1];
}

// 승패 판정 함수
function getResult(my, com) {
    if (my === com) return "draw";

    if (
        (my === "rock" && com === "scissors") ||
        (my === "scissors" && com === "paper") ||
        (my === "paper" && com === "rock")
    ) {
        return "win";
    } else {
        return "lose";
    }
}

// 6. start 함수
function start(mychoice) {
    let resultArray = getComChoice();
    displayComChoice(resultArray);

    let comChoice = resultArray[0];

    let result = getResult(mychoice, comChoice);

    // 승패 결과 텍스트 표시
    displayResult.innerText = result;

    // 점수 처리
    if (result === "win") {
        myScore++;
    } else if (result === "lose") {
        computerScore++;
    }

    // 변경된 점수 화면에 반영
    myScoreText.innerText = myScore;
    computerScoreText.innerText = computerScore;
}

// 리셋 함수
function resetGame() {
    // 1. 점수 초기화
    myScore = 0;
    computerScore = 0;

    // 2. 점수 화면 초기화
    myScoreText.innerText = 0;
    computerScoreText.innerText = 0;

    // 3. 선택 상태 초기화
    myHandText.innerText = "";
    computerText.innerText = "";

    // 4. 아이콘 초기화
    myHandIcon.className = "";
    computerIcon.className = "";

    // 5. 결과 텍스트 초기화
    displayResult.innerText = "";
}

// 다크모드 버튼
const themeBtn = document.getElementById("theme-button");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("change");

    if (document.body.classList.contains("change")) {
        themeBtn.className = "fa-solid fa-sun change-reverse";
    } else {
        themeBtn.className = "fa-solid fa-moon change-reverse";
    }
});