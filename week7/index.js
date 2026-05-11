//한국관광공사 사진 갤러리 API의 기본 주소
const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1"

// API에 데이터를 요청할 때 필요한 세부 조건(파라미터)들을 모아둔 객체
const option = {
    // 인증키
  serviceKey:
    "5931fe0d33611def950ec19de38a0ff90e2cb3e83229399be11b6947d9d13e05",
  numofRows: 6, // 한 번에 불러올 사진 개수
  MobileApp: "test", // 어필리케이션 이름
  MobileOS: "ETC", //OS 구분
  arrange: "A", // 정렬 기준(A=제목순 등)
  _type: "json", // 응답 데이터 타입
};

// HTML에서 id="container"인 요소를 찾아 변수에 저장자
// -> 앞으로 불러오는 사진들이 이 공간에 채워짐
const container = document.getElementById("container");

// 사진의 순번을 매기기 위해 사용하는 숫자 변수
let photoIndex = 1;

// 비동기 함수 -> API 서버에서 데이터들을 가져오는 시간이 걸리는 작업들을 순차적으로 처리
async function getData() {
  // 1. 무작위 페이지 번호 생성 (예: 1~50페이지 사이)
  const randomPage = Math.floor(Math.random() * 50) + 1;
  
  // baseURL과 option 객체들의 값을 조합하여 최종적으로 데이터를 요청할 주소를 만듦
  const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${randomPage}&serviceKey=${option.serviceKey}`
  
  try {
    const fetchData = await fetch(url); // 해당 URL로 네트워크 요청을 보내 데이터를 가져옴
    const toJSON = await fetchData.json();
    const datas = await toJSON.response.body.items.item; // JSON 구조에서 실제로 우리가 필요한 '사진 정보'들이 담긴 배열을 뽑아냄
    
    // 불러오기를 누를 때마다 사진 교체
    container.innerHTML = "";

    datas.forEach((data,i) => {
      const list = document.createElement("div");
      list.id = "list" // 위에서 만든 <div>에 id="list"라는 이름표를 붙이게 됨

      const image = document.createElement("img");
      // 자바스크립트가 image라는 변수로 만든 <img> 태그의 주소(src) 값으로 API에서 가져온 진짜 이미지 URL을 연결
      image.src = data.galWebImageUrl;

      const info = document.createElement("span");
      info.innerText = `
      🏷️ ${photoIndex++}번째 사진
      📷 제목: ${data.galTitle}
      ⛳️ 장소: ${data.galPhotographyLocation}`;

      // 2. '더보기' 버튼 추가
      const detailBtn = document.createElement("button");
      detailBtn.innerText = "더보기";
      detailBtn.className = "detail-button"; // 스타일을 위해 클래스 추가

      // 클릭 시 데이터를 URL 파라미터로 넘기며 이동
      detailBtn.onclick = () => {
          const params = new URLSearchParams({
              title: data.galTitle,
              img: data.galWebImageUrl,
              location: data.galPhotographyLocation,
              time: data.galCreatedtime,
              photographer: data.galPhotographer,
              keywords: data.galSearchKeyword
          });
          location.href = `detail.html?${params.toString()}`;
      };

      list.appendChild(image);
      list.appendChild(info);
      list.appendChild(detailBtn); // 버튼을 리스트에 추가
      container.appendChild(list);
    });
  } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}
