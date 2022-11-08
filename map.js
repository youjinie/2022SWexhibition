
$(document).ready(async function () {
    let XY = await getLocation(); // 사용자의 위도와 경도를 받아옴

    var map = new naver.maps.Map('map', { // 지도 띄우기
        center: new naver.maps.LatLng(XY.lat, XY.lng),
        zoom: 8,
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT
        }
    });

    maker(XY.lat, XY.lng); // 현재 위치에 마커 찍기 

    function maker(lat, lng) { // 마커 찍는 함수 
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map
        });
    }
    

    var infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true
    });


    var location = new naver.maps.LatLng(XY.lat, XY.lng); // 현재 위치 위도 경도
    b1.onclick = function () { // 현재 위치 버튼 누를시 
        map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
        map.setZoom(17);
    };

});
async function getLocation() { // 접속한사람 위치 조회
    let XY = new Object(); // 위치 반환할 것

    if (navigator.geolocation) { // GPS와 관련된 객체, 이 객체가 존재할때 실행    
        let promise = new Promise((resolve, rejected) => { // 비동기식을 동기식으로
            navigator.geolocation.getCurrentPosition((position) => {
                //현재 위치를 알수 있는 함수 인자로 position 객체를 통해 현재 위치를 알 수 있음
                resolve(position);
            });
        });

        let position = await promise;
        XY.lat = position.coords.latitude; // 위도
        XY.lng = position.coords.longitude; // 경도
    }
    return XY;
}

