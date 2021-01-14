const weather = document.querySelector(".js-weather");

const API_KEY = "d88d29ebd9cd522107d9f0ec2839b338";
// API(Application Programming Interface)는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단이다.
// Weather API와 같은 API를 제공하는 웹사이트를 이용하면 해당 웹사이트를 통해 데이터를 얻을 수 있다.(https://openweathermap.org/)
// -> API의 주소를 입력하 날씨 정보를 찾아볼 수도 있고, object로 된 날씨 데이터를 얻을 수도 있다.
// API는 특정 웹사이트로부터 데이터를 얻거나 컴퓨터끼리 소통하기 위해 고안된 것이다.
// javascript는 웹사이트로 request를 보내고 응답을 통해서 데이터를 얻을 수 있다. 가져온 데이터를 refresh 없이도 나의 웹사이트에 적용시킬 수 있다.(보이지 않는 곳에서 계속 데이터를 가져오는 중이므로)
const COORDS = 'coords';

function getWeather(lat, lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
  // fetch : 데이터를 가져오기
  // 데이터가 완전히 들어온 다음 then이 함수 하나를 호출하도록. 데이터가 들어오는데 시간이 좀 걸리는 경우도 있으므로
  // response -> 서버에서 온 JSON 데이터를 받음
  // fetch가 완료되길 기다린 후 실행되도록 then 사용
  // fetch를 기다리지 않고 다음 작업을 지시하면, 다음 작업은 fetch가 완료되길 기다리지 않을 것이고 fetch가 정상적으로 완료되지 않을 수 있다.
  // 서버로부터 데이터가 들어올 때까지 기다려야 된다.
  // 가져온 데이터를 처리하는 것을 끝날때까지 기다리도록. json 데이터가 잘 준비되면 출력
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  /*const coordsObj = {
    latitude : latitude,
    longitude : longitude
  };*/
  const coordsObj = {
    latitude ,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoErro(){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErro);
  // navigator라는 API이용
}

function loadCoords(){
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null){
    askForCoords(); // 좌표 요청
  }else{
    const parsedCoords = JSON.parse(loadedCords); // object로 변환
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    // Inspector - Network - All - Header - Request URL (Response도 확인 가능)
    // Other features - Units of measurement -> For temperature in Celsius use units=metric
  }
}

function init(){
  loadCoords();
}

init();
