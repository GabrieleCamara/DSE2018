window.onload = function () {
  //Criando o mapa
  var mapa = L.map('map').setView([-22.3,-42.8],11);

  //Camada do Openstreetmap
  osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

  //Camada do Mapbox
  mapbox = L.tileLayer(
    "https:api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      id: "mapbox.satellite",
      accessToken: "pk.eyJ1IjoiZ2FicmllbGVjYW1hcmEiLCJhIjoiY2pmMnJhcjJzMDVuMzJxbjg5aXYydjl5bCJ9.Lt4VQQDajTeH7ksmyzGqsg",
    }
  ).addTo(mapa);

  //Adicionando a camada do Geoserver
  var geoserver = L.tileLayer.wms('http://localhost:8082/geoserver/wms', {
    layers: 'rio:Escolas_Teresopolis',
    transparent: 'true',
    format: 'image/png'
  }).addTo(mapa);

  //Adicionando Ponto
  var ponto = L.marker([-22.5,-43.1]);

  //Adicionando Linha
  var linha = L.polyline([[-22.4,-43.0],[-22.1,-42.7]]);

  //Adicionando Polígono
  var poligono = L.polygon([
    [-22.8, -42.6],
    [-22.9, -42.6],
    [-22.9, -42.3],
    [-22.8, -42.3]
  ]);

  //Adicionando Círculo
  var circulo = L.circle([-21.5,-41.6],
  {
    color: '#7fcdbb',
    fillOpacity: 0.5,
    radius: 5000,
  });

  //Adicionando ao mapa - ponto, linha, poligono e circulo
  var feicoesMapa = L.layerGroup([ponto,linha,poligono,circulo]);

  //Adiocionando os popups
  ponto.bindPopup('Eu sou um ponto!');
  linha.bindPopup('Eu sou uma linha!');
  poligono.bindPopup('Eu sou um polígono!');
  circulo.bindPopup('Eu sou um círculo');

  //Escala gráfica
  L.control.scale({position: 'bottomright'}).addTo(mapa);

  //Adicionando controle de camadas
  //Base Cartografica
  var baseCartografica = {
    "Base OpenStreetMap": osm,
    "Base Mapbox": mapbox
  }
  //Informações temáticas
  var informacaoTematica = {
    "Pontos": ponto,
    "Linhas": linha,
    "Polígono": poligono,
    "Círculo": circulo,
    "Geoserver": geoserver
  }

  //Adicionar objetos ao controle de camadas
  L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);

  //Adicionar a imagem da legenda WMS
  var uri = "http://localhost:8082/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=rio:Escolas_Teresopolis";

  document.getElementById('legenda').src = uri;

}
