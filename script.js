function search_icao() {
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
}

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