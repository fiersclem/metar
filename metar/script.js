
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
//-----------initialisation thème clair ou sombre

var confirm=0;
let favoris="";

window.onload = () => {
//--------------------thème

    let themeLink = document.getElementById("theme-link")
    let image =document.getElementById("theme")
    let background=document.getElementById("background")
   
    if(localStorage.theme != null){
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="60px">`
        background.innerHTML=`<img src="./assets/jour.png" width="100%" class="background">`
    }else{
        themeLink.href = "style_clair.css"
        image.innerHTML=`<img src="./assets/clair.svg " height="60px">`
        background.innerHTML=`<img src="./assets/jour.png" width="100%" class="background">`
        localStorage.theme = "clair"
    }

    document.getElementById("theme").addEventListener("click", function(){
        if (localStorage.theme == "clair") {
            localStorage.theme = "sombre"
            background.innerHTML=`<img src="./assets/nuit.png" width="100%" class="background">`
        } else {
            localStorage.theme = "clair"
            background.innerHTML=`<img src="./assets/jour.png" width="100%" class="background">`
        }
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="60px">`
    })

//--------------------------vue
    let image2 =document.getElementById("test")

    if(localStorage.rien != null){
        image2.innerHTML=`<img src="./assets/${localStorage.rien}.png " height="40px">`
    }else{
        image2.innerHTML=`<img src="./assets/vert.png " height="50px">`
        localStorage.rien = "vert"
    }
    
    document.getElementById("test").addEventListener("click", function(){
        if (localStorage.rien == "vert") {
            localStorage.rien = "rouge"
            if(confirm==1){
                writer();
            }
        } else {
            localStorage.rien = "vert"
            if(confirm==1){
                writev();
            }
        }
        image2.innerHTML=`<img src="./assets/${localStorage.rien}.png " height="40px">`
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
        flight_category:'',
        qnh_hpa:'',
        qnh_hg:'',
        lon:'',
        lat:'',
      };
    },
    mounted() {
      axios.get(`https://api.checkwx.com/metar/${input}/decoded?x-api-key=9538afb46af4469ba60962c4e2`)
        .then(response => {
            return response.data;
        })
        .then(response => {
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
            lon=response.station.geometry.coordinates[0]
            lat=response.station.geometry.coordinates[1]
        })
    },
  }).mount('#list');

  if(localStorage.rien=="vert"){
    confirm=1;
    writev()
}
else{
    confirm=1;
    writer()
}
}

function writev(){
    div=document.querySelector("section")
        div.innerHTML=`
        <div class="info">
            <div class="title">
                <h1 class="text-center">${ville} (${icao})</h1>
            </div>
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
                    <center><p class="appr qnhb">${qnh_hpa}</p></center>
                    <center><p class="appr qnhgb">${qnh_hg}</p></center>
                    <center><p class="appr baro">${qnh_hpa}</p></center>
                </div> 
            </div>
        </div>
      `
    let star=document.getElementById("star")

    if(localStorage.fav != null){
        star.innerHTML=`<img class="star" src="./assets/${localStorage.fav}.png " height="30px">`
    }else{
        star.innerHTML=`<img class="star" src="./assets/starv.png " height="30px">`
        localStorage.fav = "starv"
    }
    
    document.getElementById("star").addEventListener("click", function(){
        if (localStorage.fav == "starv") {
            localStorage.fav = "star"
            localStorage.favoris=`${icao}`
        } else {
            localStorage.fav = "starv"
        }
        star.innerHTML=`<img class="star" src="./assets/${localStorage.fav}.png " height="30px">`
    })
}


function writer(){
    div=document.querySelector("section")
        div.innerHTML=`
        <div>
            <h1 class="text-center title">${ville} (${icao})</h1>
            <div class="infob">
                <div class="tab tab1">
                    <h3 class="text-center">QNH (pression barométrique en hPa)</h3>
                    <p class="apprb qnhc text-center">${qnh_hpa}</p>
                </div>
                <div class="tab tab2">
                    <h3 class="text-center">QNH (pression barométrique en Hg)</h3>
                    <p class="apprb qnhgbc text-center">${qnh_hg}</p>
                </div>
                <div class="tab tab3">
                    <h3 class="text-center">Température local (en °C)</h3>
                    <p class="apprb tempc text-center">${temp}</p>
                </div>
                <div class="tab tab4">
                    <h3 class="text-center">Directection du vent</h3>
                    <p class="apprb winddc text-center">${wind_direction}</p>
                </div>
                <div class="tab tab5">
                    <h3 class="text-center">vitesse du vent (en KTS)</h3>
                    <p class="apprb windc text-center">${speed_wind}</p>
                </div>
                <div class="tab tab6">
                <h3 class="text-center">Catégorie de vol</h3>
                <p class="apprb windc text-center">${flight_category}</p>
                </div>
            </div>
        </div>
      `

    let star=document.getElementById("star")

    if(localStorage.fav != null){
        star.innerHTML=`<img class="star" src="./assets/${localStorage.fav}.png " height="50px">`
    }else{
        star.innerHTML=`<img class="star" src="./assets/starv.png " height="50px">`
        localStorage.fav = "starv"
    }

    document.getElementById("star").addEventListener("click", function(){
        if (localStorage.fav == "starv") {
            localStorage.fav = "star"
            localStorage.favoris=`${icao}`
        } else {
            localStorage.fav = "starv"
        }
        star.innerHTML=`<img class="star" src="./assets/${localStorage.fav}.png " height="50px">`
    })
}



/*            <div class="title">
                <h1>${ville} (${icao})</h1><a id="star"></a>
            </div>*/