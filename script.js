
/*function search_icao() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('icao');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}*/

window.onload = () => {
    let themeLink = document.getElementById("theme-link")
    let image =document.getElementById("theme")
   
    if(localStorage.theme != null){
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="50px">`
    }else{
        themeLink.href = "style_clair.css"
        image.innerHTML=`<img src="./assets/clair.svg " height="50px">`
        localStorage.theme = "clair"
    }

    document.getElementById("theme").addEventListener("click", function(){
        if (localStorage.theme == "clair") {
            localStorage.theme = "sombre"
        } else {
            localStorage.theme = "clair"
        }
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="50px">`
    })
}



function search_icao() {

  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();

  Vue.createApp ({
    data() {
      return {
        ville: '',
        meteo: '',
        temp: '',
        humidity: '',
        description: '',
        icon: '',
        icao:'',
        wind_direction:'',
        speed_wind:'',
        fly_category:'',
        qnh_hpa:'',
        qnh_hg:'',
      };
    },
    mounted() {
      axios.get(`https://api.checkwx.com/metar/${input}/decoded?x-api-key=9538afb46af4469ba60962c4e2`)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .then(response => {
            console.log(response);
            return response.data[0];
        })
        .then(response => {
            ville=response.station.name
            temp=response.temperature.celsius
            humidity=response.humidity.percent
            icao=response.icao
            wind_direction=response.wind.degrees
            speed_wind=response.wind.speed_kts
            flight_category=response.flight_category
            qnh_hpa=response.barometer.hpa
            qnh_hg=response.barometer.hg
            console.log(qnh_hg)
        })
    },
  }).mount('#list');
  div=document.querySelector("section")
  div.innerHTML=`<div><h4 class="text-center">${ville} (${icao})</h4>
  <div style="position:relative; height:250px">
   <div style="position:absolute;z-index:1" class="instru">
      <img src="./assets/mcdu.png" height=250px class="instru1">
      <img src="./assets/qnh hpa.png"  height=250px class="instru2">
      <img src="./assets/qnh hg.png"  height=250px class="instru3">
      <img src="./assets/baro.png"  height=250px class="instru4">
   </div>
   <div style="position:absolute; width:600px; height:400px; z-index:2;">
      <center><p class="appr qnh">${qnh_hpa}</p></center>
      <center><p class="appr temp">${temp}</p></center>
      <center><p class="appr windd">${wind_direction}</p></center>
      <center><p class="appr wind">${speed_wind}</p></center>
      <center><p class="appr qnhg">${qnh_hg}</p></center>
      <center><p class="appr qnhb">${qnh_hpa}</p></center>
      <center><p class="appr qnhgb">${qnh_hg}</p></center>
      <center><p class="appr baro">${qnh_hpa}</p></center>
    </div> 
</div></div>`
}
