var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortDesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var value = document.querySelector('.value');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var body = document.querySelector('body');


function convert_vi_to_en(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/  +/g, ' ');
    return str;
}


function changeWeatherUI(capitalSearch) {
    // var data = await getWeather(capitalSearch);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch} &appid=ad4fab968b134033141452fc1b052dff`).then(res => {
        console.log('mui gio', new Date((new Date().getTime()) + (res.data.timezone - 25200) * 1000));
        console.log(res);
        if (res.status == 200) {
            content.classList.remove('hide');
            city.innerText = res.data.name;
            country.innerText = res.data.sys.country;
            visibility.innerText = res.data.visibility + 'm';
            wind.innerText = res.data.wind.speed + 'm/s';
            sun.innerText = res.data.main.humidity + '%';
            var temp = Math.round(res.data.main.temp - 273.15);
            value.innerText = temp;
            shortDesc.innerText = res.data.weather[0] ? res.data.weather[0].main : '';
            var date = new Date((new Date().getTime()) + (res.data.timezone - 25200) * 1000);
            time.innerText = date.getHours('vi') + ':' + date.getMinutes('vi') + ':' + date.getSeconds('vi') + ',' + date.toLocaleDateString('vi');
            body.setAttribute('class', 'hot');
            if (temp <= 25) {
                body.setAttribute('class', 'cool');
            }
            if (temp <= 22) {
                body.setAttribute('class', 'warm');
            }
            if (temp <= 19) {
                body.setAttribute('class', 'cold');
            }
        } else {
            content.classList.add('hide')
        }
    });
}


search.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        let capitalSearch = convert_vi_to_en(search.value.trim()).toLowerCase();
        changeWeatherUI(capitalSearch);
    }
});

changeWeatherUI('vung tau');
