document.write('Testando o mapa do leaflet. Arquivo externo.');

window.onload = function () {
  var mapa = L.map('map').setView([-25.45,-49.27],11);

  //OpenStreetMap - Tile
  //                               nomedoservidor/{z}/{x}/{x}.png
  var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

  //Mapbox - adicionado ao mapa
  var mapbox = L.tileLayer(
    "https:api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      id: "mapbox.run-bike-hike",
      accessToken: "pk.eyJ1IjoiZ2FicmllbGVjYW1hcmEiLCJhIjoiY2pmMnJhcjJzMDVuMzJxbjg5aXYydjl5bCJ9.Lt4VQQDajTeH7ksmyzGqsg",
    }
  )

  //Ponto - declaração da variável
  var ponto1 = L.marker([-25.45,-49.27]);
      ponto2 = L.marker([-25.43,-49.29]);

  //Linha - declaração da variável
  var linha1 = L.polyline([[-25.4, -49.2],[-25.5, -49.1]]);
      linha2 = L.polyline([[-25.4, -49.1],[-25.5, -49.2]]);

  //Polígono - declaração da variável
  var poligono = L.polygon([
    [-25.5, -49.3],
    [-25.5, -49.5],
    [-25.6, -49.3],
  ],  {
    color: '#c51b8a',
    fillOpacity: 0.7,
  })

  //Círculo - declaração da variável
  var circulo = L.circle(
    [-25.45, -49.35],
    {
      color: '#7fcdbb',
      fillColor: '#7fcdbb',
      fillOpacity: 0.5,
      radius: 5000,
    })

    //Agrupando camadas
    var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
    var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
    //var combinacao = L.layerGroup([ponto1, ponto2, linha1, linha2, osm]).addTo(mapa);

    //Adicionar camada WMS ao mapa
    var geoserver = L.tileLayer.wms('http://localhost:8082/geoserver/wms', {
      layers: 'rio:Escolas_Teresopolis',
      transparent: 'true',
      format: 'image/png'
    })

    //Escala gráfica
    L.control.scale({position: 'bottomright'}).addTo(mapa);

    //Evento disparado após o clique do usuário
    mapa.on('click', function (evento) {
    alert("Você clicou em: " + evento.latlng);
  });

    //Adicionando controle de camadas
    //Base Cartografica
    var baseCartografica = {
      "Base OpenStreetMap": osm,
      "Base Mapbox": mapbox
    }
    //Informações temáticas
    var informacaoTematica = {
      "Pontos": pontos,
      "Linhas": linhas,
      "Polígono": poligono,
      "Geoserver": geoserver
    }

    //Adicionar objetos ao controle de camadas
    L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);

    //Anexar popups
    ponto1.bindPopup('Eu sou um ponto!');
    linha.bindPopup('Eu sou uma linha!');
    poligono.bindPopup('Eu sou um polígono!');
    circulo.bindPopup('Eu sou um círculo');

    //Adicionar legenda WMS
    var uri = "http://localhost:8082/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=rio:Escolas_Teresopolis";

    document.getElementById('legenda').src = uri;
}
