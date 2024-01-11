# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

npm install @mui/material @emotion/react @emotion/styled

# Home
메인 화면
- Navbar
- Lists
- 우상단 리스트/앨범형 변경
    https://mui.com/material-ui/react-stack/

# Settings
설정 화면
Detail 관련 내용을 사용자가 직접 Custom
ex) 디폴트로 있는 입주시기, 세대수 등은 이 페이지에는 안나오고
or 자동형 수동형 => input 말고 큰 범위 제공해주도록... 세대수 1000~1500세대 이런식으로
or 항목 엄청 넣어놓고 추가 삭제 가능하도록! 이게 가장 현실성 있을듯

(추가) 테마 변경
    배경색, 글자색 등


# Detail
리스트 별 상세 화면
<내용>
입주 시기
    년도 선택(캘린더)
    https://mui.com/x/react-date-pickers/date-picker/
세대수
    input
매매가
    input
전세가
    input
지하주차장
    연결 연결X (radio) => 동 마다 다를 수 있음
관리/조경
    상 중 하 (radio)
학교 유무
    초 중고 없음 (select)
메모
    input
사진
    파일첨부 or 갤러리
네이버 부동산 링크 연동? => 이런게 메모로 그냥 들어가면 될 듯...
지도?

*내가 추가
지하철(교통)
    input
    ex) 7호선 이수역
    참고) https://data.seoul.go.kr/dataList/OA-15442/S/1/datasetView.do 지하철 API 이용해서 역 찾으면 좋을듯... 없으면 직접 입력 받도록

    selectbox or input
    5분 10분

지역(주소)
    ex) 서울특별시 은평구 증산로 15길 50


# Home > Lists
집 아이콘 - 사용자가 설정한 이름 - 휴지통 아이콘
클릭 시 Detail 화면으로 이동
삭제 시 삭제 확인 팝업
    https://mui.com/material-ui/react-dialog/
    
# Chart
(추가) Lists에서 데이터 뽑아서 차트로 그려주는거

# Help
(추가) 처음 접속 시 도움말 기능

(추가) Skeleton