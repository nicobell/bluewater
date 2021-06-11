<template>
  <div class="map-wrapper">
    <div id="viewDiv"></div>
    <div id="info">
      <span id="name"></span> <br />
      <span id="category"></span> <br />
    </div>
  </div>
</template>

<script>
//import WebMap from "@arcgis/core/WebMap";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
//import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

export default {
  name: 'playground',
  data: () => {
    return {
      view: null, 
      webmap: null,
      map: null
    }
  },
  methods: {
    goto() {
    }
  },
  mounted(){
  const itinerariLayer = new FeatureLayer({
    //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1",
    url: "https://services2.arcgis.com/qpFFG6wHMKCXpc0N/arcgis/rest/services/Itinerari/FeatureServer",
    outFields: ["*"]
  });

  const sanitariLayer = new FeatureLayer({
    //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1",
    url: "https://services2.arcgis.com/qpFFG6wHMKCXpc0N/arcgis/rest/services/Veneto_Strutture_Sanitarie/FeatureServer",
    outFields: ["*"],
    labelingInfo: [{
      labelPlacement: "center-right",
      labelExpression: "[Denominazione_struttura]",
      symbol: {
        type: "text",
        color: "white",
        font: { size: 10 },
        backgroundColor: [255, 255, 255, .5],
        borderLineSize: 20
      }
    }]
});

  const map = new Map({
    basemap: "satellite",
    layers: [itinerariLayer, sanitariLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [12, 45.65],
    zoom: 9,
    highlightOptions: {
      color: "blue"
    }
  });

  view.ui.add("info", "top-right");

  view
    .when()
    .then(function() {
      return sanitariLayer.when();
    })
    .then(function(layer) {
      const renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
          width: '27px',
          height: '27px',
          url: 'plus.png'
        }
      };
      layer.renderer = renderer;

      /*const trailheadsLabels = [{
          labelPlacement: "center-right",
          labelExpression: "[Denominazione_struttura]",
          symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: "white",
            font: {
              size: 10
            },
            backgroundColor: [255, 255, 255, 1]
          }
      }];*/
      //layer.labelingInfo = trailheadsLabels;

      // Set up an event handler for pointer-down (mobile)
      // and pointer-move events (mouse)
      // and retrieve the screen x, y coordinates

      return view.whenLayerView(layer);
    })
    .then(function(layerView) {
      //view.on("pointer-move", eventHandler);
      //view.on("pointer-down", eventHandler);
      view.on("click", eventHandler)

      function eventHandler(event) {
        // only include graphics from sanitariLayer in the hitTest
        const opts = {
          include: sanitariLayer
        }
        // the hitTest() checks to see if any graphics from the sanitariLayer
        // intersect the x, y coordinates of the pointer
        view.hitTest(event, opts).then(getGraphics);
      }

      let highlight, /*currentYear,*/ currentName;

      function getGraphics(response) {
        // the topmost graphic from the sanitariLayer
        // and display select attribute values from the
        // graphic to the user
        if (response.results.length) {
          const graphic = response.results[0].graphic;

          const attributes = graphic.attributes;
          //const category = attributes.CAT;
          //const wind = attributes.WIND_KTS;
          const provincia = attributes.Provincia;
          const name = attributes.Denominazione_struttura;
          //const year = attributes.YEAR;
          //const id = attributes.OBJECTID;
          //console.log(attributes)

          if (
            highlight &&
            (currentName !== name )
            //|| currentYear !== year)
          ) {
            highlight.remove();
            highlight = null;
            //return;
          }

          if (highlight) {
            return;
          }

          document.getElementById("info").style.visibility = "visible";
          document.getElementById("name").innerHTML = provincia;
          document.getElementById("category").innerHTML = "Struttura: " + name;
          //document.getElementById("wind").innerHTML = wind + " kts";

          // highlight all features belonging to the same hurricane as the feature
          // returned from the hitTest
          
          
          if (highlight) {
              highlight.remove()
            }
            highlight = layerView.highlight(graphic);
            console.log(attributes.ObjectId)

          /*const query = layerView.createQuery();
          query.where = "Provincia = '" + name + "'";
          layerView
          layerView.queryObjectIds(query).then(function(ids) {
            if (highlight) {
              highlight.remove()
            }
            highlight = layerView.highlight(ids);
            //currentYear = year;
            currentName = name;
          });*/
          
        } else {
          // remove the highlight if no features are
          // returned from the hitTest
          if (highlight){
            highlight.remove();
            highlight = null;
          }
          document.getElementById("info").style.visibility = "hidden";
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'https://js.arcgis.com/4.19/@arcgis/core/assets/esri/themes/light/main.css';
.map-wrapper,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.map-wrapper {
  position: relative;
}

#info {
  background-color: black;
  bottom: 20px;
  right: 20px;
  position: absolute;
  opacity: 0.75;
  width: 300px;
  height: 70%;
  
  font-size: 18pt;
  padding: 8px;
  visibility: hidden;

  &>* {
    color: orange;
  }
}
</style>
