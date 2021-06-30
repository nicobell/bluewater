<template>
  <div class="map-wrapper">
    <div id="viewDiv"></div>
    <!--<div id="info">
      <span id="name"></span> <br />
      <span id="category"></span> <br />
    </div>

    <button id="toggleLayer" @click="toggleLayer()">{{ this.toggleLabel }}</button>
    <button id="zoomout" @click="zoomOut()">zoom out</button>

    <div id="topbar">
      <button
        class="action-button esri-icon-measure-line"
        id="distanceButton"
        title="Measure distance between two or more points"
      ></button>
    </div>-->
  </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Point from '@arcgis/core/geometry/Point'
import Search from '@arcgis/core/widgets/Search'
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D'
import Legend from '@arcgis/core/widgets/Legend'

export default {
  name: 'playground',
  data: () => {
    return {
      view: null, 
      map: null,

      itineraryLayer: null,
      sanitariLayer: null,
      showLayer: true,
      
      //province: "VI",
      //dataPoints: []
    }
  },
  computed: {
    toggleLabel() {
      return (this.showLayer ? 'hide' : 'show') + ' itinerary layer'
    }
  },
  methods: {
    zoomOut() {
      //let stL = this.sanitariLayer
      //let vv = this.view

      /*this.view.when()
        .then(function() { return stL.when(); })
        .then(function(layer) {
          return vv.whenLayerView(layer);
        })
        .then(function(layerView) {*/
          this.sanitariLayer.queryExtent().then((res) => {
            this.view.goTo(res.extent, {
              animate: true,
              duration: 1500
            })
          })
        //})
    },
    /*onChange(event) {
      this.province = event.target.value
    },*/
    /*prova() {
      let itL = this.itineraryLayer
      let vv = this.view
      let p = this.province
      let h = this.hls
      
      this.view.when()
      .then(function() { return itL.when(); })
      .then(function(layer) {
        return vv.whenLayerView(layer);
      })
      .then(function(layerView) {
        const query = layerView.createQuery();
        query.where = "Provincia = '" + p + "'"

        layerView.queryObjectIds(query).then(function(ids) {
          h = layerView.highlight(ids)
        })

        vv.on("click", eventHandler)
        function eventHandler(event) {
          const opts = {
            include: itL
          }
          vv.hitTest(event, opts).then(getGraphics);
        }
        function getGraphics() {
          if(h) {
            h.remove();
            h = null;
          }
        }
      })

    },*/
    toggleLayer() {
      this.showLayer = !this.showLayer;
      this.itineraryLayer.visible = !this.itineraryLayer.visible;    
    }
  },
  mounted(){
    fetch("/data.json")
      .then(res => res.json())
      .then(json => {
        console.log(json)
        //this.dataPoints = {}
      
      const template = {
        title: "prova",//{Denominazione_struttura} in {Provincia}",
        /*content: [
          {
            // It is also possible to set the fieldInfos outside of the content
            // directly in the popupTemplate. If no fieldInfos is specifically set
            // in the content, it defaults to whatever may be set within the popupTemplate.
            type: "fields",
            fieldInfos: [
              {
                fieldName: "B12001_calc_pctMarriedE",
                label: "Married %"
              },
              {
                fieldName: "B12001_calc_numMarriedE",
                label: "People Married",
                format: {
                  digitSeparator: true,
                  places: 0
                }
              },
              {
                fieldName: "B12001_calc_numNeverE",
                label: "People that Never Married",
                format: {
                  digitSeparator: true,
                  places: 0
                }
              },
              {
                fieldName: "B12001_calc_numDivorcedE",
                label: "People Divorced",
                format: {
                  digitSeparator: true,
                  places: 0
                }
              }
            ]
          }
        ]*/
      };

    this.itineraryLayer = new FeatureLayer({
      url: "https://services2.arcgis.com/qpFFG6wHMKCXpc0N/arcgis/rest/services/Itinerari/FeatureServer/",
      outFields: ["*"]
    });

    const labelclass = {
      labelExpression: "[Denominazione_struttura]",
      labelPlacement: "above-left",
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        font: {
          size: 10,
          weight: "bold"
        },
        color: "white",
        haloColor: "orange",
        haloSize: 3,
        backgroundColor: "white"
        
      }
    };
    

    this.sanitariLayer = new FeatureLayer({
      url: "https://services2.arcgis.com/qpFFG6wHMKCXpc0N/arcgis/rest/services/Veneto_Strutture_Sanitarie/FeatureServer",
      outFields: ["*"],
      popupTemplate: template,
      labelingInfo: [labelclass]
    });

    const map = new Map({
      basemap: "satellite",
      layers: [this.itineraryLayer, this.sanitariLayer]
    });

    this.view = new MapView({
      container: "viewDiv",
      map: map,
      center: [12, 45.65],
      zoom: 9,
      highlightOptions: {
        color: "orange"
      }
    });

    /*this.view.ui.add(new Legend({ view: this.view }), "bottom-left");

    this.view.ui.add("toggleLayer", "top-left");
    this.view.ui.add("zoomout", "top-left");
    
    this.view.ui.add(new Search({ view: this.view }), "top-right");
    this.view.ui.add('topbar', 'top-right');

    let activeWidget = null*/
    let vv = this.view

    document.getElementById("distanceButton").addEventListener("click", function() {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

    /*document.getElementById("clear").addEventListener("click", function() {
      setActiveWidget(null);
      setActiveButton(null);
    });*/

    function setActiveWidget(type) {
      switch (type) {
        case "distance":
          activeWidget = new DistanceMeasurement2D({ view: vv });
          activeWidget.viewModel.start();
          //vv.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case null:
          if (activeWidget) {
            vv.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      vv.focus();
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }

    let stL = this.sanitariLayer
    //let dpts = this.dataPoints

    this.view
      .when(function() {
        vv.popup.autoOpenEnabled = true;
      })
      .then(function() { return stL.when(); })
      .then(function(layer) {
        const renderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
            type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
            width: '27px',
            height: '27px',
            url: './plus.png'
          }
        };
        layer.renderer = renderer;
        
        return vv.whenLayerView(layer);
      })
      .then(function(layerView) {
        //vv.on("pointer-move", eventHandler);
        //vv.on("pointer-down", eventHandler);
        vv.on("click", eventHandler)


        function eventHandler(event) {
          const opts = {
            include: stL
          }
          vv.hitTest(event, opts).then(getGraphics);
        }

        let highlight, currentName

        function getGraphics(response) {
          
          if (response.results.length) {
            const graphic = response.results[0].graphic;
            
            const attributes = graphic.attributes;
            const provincia = attributes.Provincia;
            const name = attributes.Denominazione_struttura;
            console.log(attributes.Codice_struttura + '-' + attributes.Codice_Comune)

            if (
              highlight && //||
              (currentName !== name )
            ) {
              highlight.remove();
              highlight = null;
              //return;
            }

            /*if (highlight)
              return;*/

            /*console.log(dpts)
            let mp = dpts.find(p => {
              console.log((p.Codice_struttura + '-' + p.Codice_Comune))
              console.log(attributes.Codice_struttura + '-' + attributes.Codice_Comune)
            
              return p.id == (attributes.Codice_struttura + '-' + attributes.Codice_Comune)
            })
            console.log(mp)
            if(mp) {
              document.getElementById("info").style.visibility = "visible";
              document.getElementById("name").innerHTML = mp.title;
              document.getElementById("category").innerHTML = "Struttura: " + mp.description
            }
            else {
              document.getElementById("info").style.visibility = "visible";
              document.getElementById("name").innerHTML = provincia;
              document.getElementById("category").innerHTML = "Struttura: " + name
            }*/
            
            if (highlight)
              highlight.remove()

            highlight = layerView.highlight(graphic);
            const query = layerView.createQuery();
            query.where = "Provincia = '" + provincia + "'";
            layerView.queryObjectIds(query).then(function(ids) {
              vv.goTo({
                target: new Point({
                  latitude: graphic.geometry.latitude,
                  longitude: graphic.geometry.longitude
                }),
                zoom: 12
              }, {
                animate: true,
                duration: 1000
              })

              if (highlight)
                highlight.remove()
              
              highlight = layerView.highlight(ids);
              currentName = name;
            });
            
          } else {
            if (highlight){
              highlight.remove();
              highlight = null;
            }
            document.getElementById("info").style.visibility = "hidden";
          }
        }
      })

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.map-wrapper,
#viewDiv {
  position: relative;
  top: 45px;
  left: 40px;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.map-wrapper {
  position: relative;
  
  max-height: calc(100vh - 100px);
  max-width: calc(100vw - 100px);
}

.esri-popup .esri-popup__main-container .esri-popup__footer {
  display: none !important;
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

.action-button:hover,
.action-button:focus {
  background: #0079c1;
  color: #e4e4e4;
}

.active {
  background: #0079c1;
  color: #e4e4e4;
}

</style>
