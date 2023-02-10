
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
    let map =document.getElementById("map")
   
    if(localStorage.theme != null){
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="60px" alt="changer de thème">`
        background.innerHTML=`<img src="./assets/${localStorage.background}.png" width="100%" class="background" alt="image thème">`
        map.innerHTML=`<img src="./assets/${localStorage.map}.png" height="60px" alt="choisir un itinéraire">`
    }else{
        themeLink.href = "style_clair.css"
        image.innerHTML=`<img src="./assets/clair.svg " height="60px">`
        background.innerHTML=`<img src="./assets/jour.png" width="100%" class="background">`
        map.innerHTML=`<img src="./assets/itinéraire.png" height="60px">`
        localStorage.theme = "clair"
        localStorage.background="jour"
        localStorage.map="itinéraire"
    }

    document.getElementById("theme").addEventListener("click", function(){
        if (localStorage.theme == "clair") {
            localStorage.theme = "sombre"
            localStorage.background="nuit"
            localStorage.map="itinérairen"
        } else {
            localStorage.theme = "clair"
            localStorage.background="jour"
            localStorage.map="itinéraire"
        }
        themeLink.href = `style_${localStorage.theme}.css`
        image.innerHTML=`<img src="./assets/${localStorage.theme}.svg " height="60px" alt="changer de thème">`
        background.innerHTML=`<img src="./assets/${localStorage.background}.png" width="100%" class="background" alt="image thème">`
        map.innerHTML=`<img src="./assets/${localStorage.map}.png" height="60px" alt="choisir un itinéraire">`
    })

//--------------------------vue
    let switchh =document.getElementById("switch")

    if(localStorage.switch != null){
        switchh.innerHTML=`<img src="./assets/${localStorage.switch}.png " height="40px" alt="changer la visualisation des données">`
    }else{
        switchh.innerHTML=`<img src="./assets/vert.png " height="50px" alt="vue pilote">`
        localStorage.switch = "vert"
    }
    
    document.getElementById("switch").addEventListener("click", function(){
        if (localStorage.switch == "vert") {
            localStorage.switch = "rouge"
            if(confirm==1){
                writer();
            }
        } else {
            localStorage.switch = "vert"
            if(confirm==1){
                writev();
            }
        }
        switchh.innerHTML=`<img src="./assets/${localStorage.switch}.png " height="40px" alt="changer visualisation des données">`
    })

    list=document.getElementById("list")
    document.getElementById("map").addEventListener("click", function(){
        if (localStorage.map == "itinéraire") {
            localStorage.map = "itinérairen"
            list.innerHTML=`<div class="map">
            <input id="searchbard" type="text" name="search" placeholder="Search ICAO Departure">
            <input id="searchbara" type="text" name="search" placeholder="Search ICAO Arrival">
            <button style="position: relative; z-index: 2;"id="button">Calculer la distance</button>
            <p id="km"></p>
        </div>
        `
        } else {
            localStorage.map = "itinéraire"
            list.innerHTML=``
    
        }
        map.innerHTML=`<img src="./assets/${localStorage.map}.png" height="60px" alt="choisir un itinéraire">`
        document.getElementById("button").addEventListener("click", function(){
            getDistance()
        
           })
    })
}


async function getAirportData(icao) {
    // Récupère les informations de l'aéroport à partir de son code ICAO
    const API_KEY = "9538afb46af4469ba60962c4e2";
     url = `https://api.checkwx.com/metar/${icao}/decoded?&format=json&lang=fr&distance=250&limit=1&hours=1&key=9538afb46af4469ba60962c4e2`;
     response = await fetch(url);
     data = await response.json();
    return {
      lat: data.data[0].station.geometry.coordinates[0],
      lon: data.data[0].station.geometry.coordinates[1],
    };
  }
  
  async function getDistance() {
    // Demande les codes ICAO des deux aéroports à l'utilisateur
    icao1 = document.getElementById('searchbard').value
    icao1=icao1.toLowerCase();
    icao2 = document.getElementById('searchbara').value
    icao2=icao2.toLowerCase();
  
    // Récupère les informations des aéroports à partir de leur code ICAO
     airport1 = await getAirportData(icao1);
     airport2 = await getAirportData(icao2);
  
    // Calcule la distance en miles entre les deux aéroports
     lat1 = airport1.lat;
     lon1 = airport1.lon;
     lat2 = airport2.lat;
     lon2 = airport2.lon;
     radius = 6371; // Rayon de la Terre en km
     dLat = (lat2 - lat1) * (Math.PI / 180);
     dLon = (lon2 - lon1) * (Math.PI / 180);
     a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
     c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     distance = Math.round(radius * c);
  
    // Affiche la distance entre les deux aéroports
    document.getElementById("km").innerHTML=`La distance entre l'aéroport ${icao1} et ${icao2} est de ${distance} km.`
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
            console.log(lat)
            console.log(lon)
        })
    },
  }).mount('#list');

  if(localStorage.switch=="vert"){
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
                    <img src="./assets/mcdu.png" height=250px class="instru1" alt="données du FMC">
                    <img src="./assets/qnh hpa.png"  height=250px class="instru2" alt="QNH (pression barométrique en hPa">
                    <img src="./assets/qnh hg.png"  height=250px class="instru3" alt="QNH (pression barométrique en hg">
                    <img src="./assets/baro.png"  height=250px class="instru4" alt="QNH (pression barométrique en hPa dans le badin">
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
    /*let star=document.getElementById("star")

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
    })*/
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

    /*let star=document.getElementById("star")

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
    })*/
}



/*            <div class="title">
                <h1>${ville} (${icao})</h1><a id="star"></a>
            </div>*/