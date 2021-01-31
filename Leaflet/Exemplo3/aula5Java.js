window.onload = function() {
  // Criando a classe dos símbolos personalizados
  var Simbolo = L.Icon.extend ({
    options: {
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    }
  });

  //Armazenando as imagens svg em um vetor
  var simbolo = [];
  for(var i=0; i<=174; i++) {
    simbolo[i] = new Simbolo({iconUrl: "simbolos/" + i + ".svg"});
  }

  // Criando a variavel do mapa para visualizacao
  var mapa = L.map("mapaAula5", {
    center: [-25.50, -49.25],
    zoom: 11
  });

  // Base do site Leaflet Provider Demo -http://leaflet-extras.github.io/leaflet-providers/preview/
  var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(mapa);

  //Adicionando um mini mapa
  var CartoDB_Positron_2 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
  var miniMap = new L.Control.MiniMap(CartoDB_Positron_2).addTo(mapa);

  // Localização do usuário
  mapa.locate({
    setView: true,
    maxZoom: 18,
    timeout: 10
  });

  // Função que irá rodas quando encontrar a posição do usuário
  mapa.on("locationfound", function(evento) {
    L.marker(evento.latlng).addTo(mapa);
    L.circle(evento.latlng, evento.accuracy).addTo(mapa);
  });
  //Adiocionando um icone personalizado em um ponto qualquer
  L.marker([-25.5,-49.3], {icon: simbolo[15]}).addTo(mapa).bindPopup("Ciclista");

  //Criando a classe do ponto GeoJSON com 2 pts
  var pontos = [
    {
      type: "Feature",
      proprieties: {
        id: "1",
        descricao: "Meu primeiro ponto geoJSON!"
      },
      geometry: {
        type: "Point",
        coordinates: [-49.2, -25.5]
      }
    },
    {
      type: "Feature",
      proprieties: {
        id: "2",
        descricao: "Meu segundo ponto geoJSON!"
      },
      geometry: {
        type: "Point",
        coordinates: [-49.3, -25.3]
      }
    }
  ];

  //Adicionando o ponto geoJSON no mapaAula
  L.geoJSON(pontos, {
    pointToLayer: function(feicao, posicao) {
      if (feicao.proprieties.id == 1) {
        return L.marker(posicao, {icon: simbolo[1]});
      } else {
        return L.marker(posicao, {icon: simbolo[5]});
      }
  },
  onEachFeature: function (feicao, camada) {
    camada.bindPopup("ID: " + feicao.proprieties.id + "<br/> Descricao: " + feicao.proprieties.descricao);
  }
  //Acessando ponto na propriedade proprieties na propriedade descricao
}).addTo(mapa);
//Popup para um ponto .bindTooltip(ponto.proprieties.descricao)

  //Adcionando a camada geojson de bairros
  L.geoJSON(bairros, {
    style: function (feicao) {
      cores = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
      return {
        color: "#0001",
        fillColor: cores[feicao.properties.CD_REGIONA-1],
        fillOpacity: 0.3
      }
  },
  onEachFeature: function (feicao, camada) {
      camada.bindTooltip(feicao.properties.NOME);
    }
  }).addTo(mapa);

  //Função que irá rodas quando não encontrar a posição do usuário
  // mapa.on("locationerror", function(evento) {
  //   alert("Não foi possível localizar o usuário!");
  // });
}
