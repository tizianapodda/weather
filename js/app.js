var is_debug = false;

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
      });//altrimenti con il metodo getcurrentposition individuo la posizione del computer dell'utente che sta eseguendo l'applicazione
      //mi darà quindi due coordinate di long lat
    }
}
function getWeather(lat, lng) {
      var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=7&units=metric&lat="+lat+"&lon="+lng+"&appid=581881e2788f16b15fe091b3bb64ce37";
      /*javascript object notation. Utilizziamo la funzione $.getJSON perchè passandogli un URL,
     lui fa una richiesta a questo URL e ritorna i dati presenti a questo URL in formato JSON un
     formato universale per l'interscambio di dati tra i vari linguaggi di programmazione*/

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
        var container = $("#today-weather .row");
        /*istanzio un oggetto Date e lo assegno alla variabile date. L'oggetto Date accetta
        come parametro il n totale di millisecondi trascorsi dal 1 gennaio 1970 ad oggi
        per ritornare la data di oggi. L'Api però fornisce la data di oggi in secondi dal 1 gennaio 1970
        quindi moltiplico per 1000 data.list[i].dt ovvero il percorso che raggiungo attraverso l'api e che
        mi fornisce dt (la data di oggi in secondi)
        */
        var date = new Date(data.list[i].dt*1000);
        var day = ["Sunday", "Monday", "Tuensday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
        //il metodo .getDay dell'oggetto Date ritorna il giorno di oggi in formato numerico da 0 a 6 dove 0 è domenica e 6 è sabato.
        // alla variabile day associo il giorno che mi ritorna date.getDay
        //api ritorna un array che in posizione 0 contiene sempre le previsioni di oggi

        //Se i è diverso da zero clono il container
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
    }

    $("#content > .row > #today-weather > .row > div").addClass("col-md-6 offset-md-3 col-8 offset-2");
}

  $(function(){  //Funzione anonima
    showSection("loading"); //Chiamata di funzione con passaggio di un parametro.
    getPosition(); //Richiamiamo getPosition
});
