var is_debug = false;

//Dichiarazione di funzione
function showSection(section){
    $("section").hide();
    $("#"+section).show();
}

function getPosition(){
    if(is_debug)
    {
      getWeather(45.559394399999995, 10.2037211)
    }
    else
    {
      navigator.geolocation.getCurrentPosition(function (position) { 
        getWeather(position.coords.latitude,position.coords.longitude);
      });
    }
}

function getWeather(lat, lng) {
      var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=7&units=metric&lat="+lat+"&lon="+lng+"&appid=581881e2788f16b15fe091b3bb64ce37";
      //javascript object notation. Utilizziamo la funzione $.getJSON perchè passandogli un URL, lui fa una richiesta a questo URL e ritorna i dati presenti a questo URL in formato JSON un formato universale per l'interscambio di dati tra i vari linguaggi di programmazione 
      $.getJSON(url)
      //Se la chiamata alle API va a buon fine
      .done(function( data ) {
        //Mostriamo la sezione "content"  
        showSection("content");
        //Richiamiamo la funzione "renderWeather"
        renderWeather(data);
        console.log(data);
      })
      //Se la chiamata alle API non va a buon fine
      .fail(function() {
        console.log("Error");
      })
      //In ogni caso eseguo always
      .always(function() {
        console.log("Complete");
      });
  }

function renderWeather(data){
    for (var i in data.list)
    {
        var container = $("#today-weather");
        var date = new Date(data.list[i].dt*1000); //l'API ritorna la data in unix cioè in secondi dal 1 gennaio 1970, creando un oggetto della classe "Date"
        var day = ["Sunday", "Monday", "Tuensday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];

        if (i != 0){
          container = container.clone().appendTo("#day-list");
        }
        
        container.find("#today-icon img").attr("src", "img/icon/" + data.list[i].weather[0].icon + ".png");
        container.find("#day").text(day);
        container.find("#city").text(data.city.name);
        container.find("#weather").text(data.list[i].weather[0].main);
        container.find("#temperature b").text(data.list[i].temp.day + "°");
        container.find("#temperature-min b").text(data.list[i].temp.min + "°");
        container.find("#temperature-max b").text(data.list[i].temp.max + "°");
        container.find("#humidity b").text(data.list[i].humidity);
        container.find("#wind b").text(data.list[i].speed);

        /*
        if (i == 0)
        {            
            container.find("#today-icon img").attr("src", "img/icon/" + data.list[i].weather[0].icon + ".png");
            container.find("#day").text(day);
            container.find("#city").text(data.city.name);
            container.find("#weather").text(data.list[i].weather[0].main);
            container.find("#temperature b").text(data.list[i].temp.day + "°");
            container.find("#temperature-min b").text(data.list[i].temp.min + "°");
            container.find("#temperature-max b").text(data.list[i].temp.max + "°");
            container.find("#humidity b").text(data.list[i].humidity);
            container.find("#wind b").text(data.list[i].speed);
        }
        else
        {
            
            $("#primary-data ul li:nth-child(1)").clone().appendTo(".day-list");
            $("#primary-data #today-icon").clone().appendTo(".day-list li:last-child");
            
            var imgUrl = "img/icon/" + data.list[i].weather[0].icon + ".png";
            $(".day-list li:last-child #today-icon img").attr("src", imgUrl);

            container.find("#day").text(day);
            

        }
        */
    }

    $("#content > .row > #today-weather > .row > div").addClass("col-md-4 offset-md-4 col-sm-8 offset-sm-2");
}

  $(function(){
    showSection("loading"); //Chiamata di funzione con passaggio di un parametro.
    getPosition();
});