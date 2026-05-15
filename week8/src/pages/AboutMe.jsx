function AboutMe() {
    return (
        <main>
            <div className="aboutme">
                <div className="image">
                    {/* public 폴더를 기준으로 절대 경로를 지정합니다 */}
                    <img src="IMG_3949 2.JPG" alt="준혁이얼굴" />
                </div>

                <div className="name_bdate">
                    <h2>최준혁</h2>
                    <h3>Junhyeok Choi</h3>
                    <h4>2004.12.15</h4>
                </div>
                
                <ul>
                    <li>중앙대학교 경영학부 24학번📚</li>
                    <li>전자전기공학부 복수전공👨‍💻</li>
                    <li>멋쟁이사자처럼 중앙대학교 14기 FE 🦁</li>
                    <li>Fan of Metallica🤘🎸, Kia Tigers🐯⚾️</li>
                </ul>
            </div>
        </main>
    );
}

export default AboutMe;