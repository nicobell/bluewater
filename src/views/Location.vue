<template>
    <div class="template-page intro" >
        <header class="intro-header"></header>
        <div class="main-content map-wrapper">

            <div id="viewDiv"></div>

            <div id="info">
                <span id="name"></span> <br />
                <span id="category"></span> <br />
            </div>

            <button id="toggleATWS" @click="toggleATWS()"><span :class="{'red': this.showATWS}">toggleATWS</span></button>
            <button id="togglePE" @click="togglePE()"><span :class="{'green': this.showPE}">togglePE</span></button>
            <button id="togglePEBDB" @click="togglePEBDB()"><span :class="{'purple': this.showPEBDB}">togglePEBDB</span></button>
            <button id="toggleTCW" @click="toggleTCW()"><span :class="{'blue': this.showTCW}">toggleTCW</span></button>

            <button id="zoomout" @click="zoomOut()" class="esri-icon-zoom-out-fixed"></button>


            <div id="topbar">
                <button
                    class="action-button esri-icon-measure-line"
                    id="distanceButton"
                    title="Measure distance between two or more points"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Point from '@arcgis/core/geometry/Point'
import Search from '@arcgis/core/widgets/Search'
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D'
//import LayerList from '@arcgis/core/widgets/LayerList'
import Legend from '@arcgis/core/widgets/Legend'
//import Collection from '@arcgis/core/core/Collection'

export default {
    name: 'location',
    data: () => {
        return {
            view: null, 
            map: null,

            workspacesLayer: null,
            pipelineLayer: null,
            facilityLayer: null,
            valvesLayer: null,
            showATWS: '',
            showPE: '',
            showPEBDB: '',
            showTCW: ''
        }
    },
    computed: {
    },
    methods: {
        zoomOut() {
            this.view.whenLayerView(this.workspacesLayer)
                .then((layerView) => {
                    layerView.queryExtent().then((response) => {
                        this.view.goTo(response.extent);
                    });
                });
        },
        toggleATWS() {
            if(this.showATWS=='')
                this.showATWS = "Type <> 'ATWS'"
            else 
                this.showATWS = ''
            this.toggleLayer()
        },
        togglePE() {
            if(this.showPE=='')
                this.showPE = "Type <> 'Permanent Easement'"
            else 
                this.showPE = ''
            this.toggleLayer()
        },
        togglePEBDB() {
            if(this.showPEBDB=='')
                this.showPEBDB = "Type <> 'Permanent Easement - Between Drill Boxes'"
            else 
                this.showPEBDB = ''
            this.toggleLayer()
        },
        toggleTCW() {
            if(this.showTCW=='')
                this.showTCW = "Type <> 'Temporary Construction Workspace'"
            else 
                this.showTCW = ''
            this.toggleLayer()
        },
        toggleLayer() {
            var qs = []
            
            if(this.showATWS) qs.push(this.showATWS)
            else qs.slice(qs.indexOf(this.showATWS), 1)

            if(this.showPE) qs.push(this.showPE)
            else qs.slice(qs.indexOf(this.showPE), 1)

            if(this.showPEBDB) qs.push(this.showPEBDB)
            else qs.slice(qs.indexOf(this.showPEBDB), 1)

            if(this.showTCW) qs.push(this.showTCW)
            else qs.slice(qs.indexOf(this.showTCW), 1)

            var query = ''
            qs.forEach((q, i) => {
                if(i!=qs.length-1)
                    query += (' ' + q + ' AND')
                else
                    query += (' ' + q)
            })

            //console.log(query)
            //console.log(qs)
            this.workspacesLayer.definitionExpression = query
        }
    },
    mounted() {
        //const template = { title: "prova" }

        this.workspacesLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/21464066_Bluewater_Project_Data/FeatureServer/3",
            outFields: ["*"]
        })

        this.pipelineLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/21464066_Bluewater_Project_Data/FeatureServer/1",
            outFields: ["*"]
        })

        this.facilityLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/21464066_Bluewater_Project_Data/FeatureServer/2",
            outFields: ["*"]
        })


        const labelclass = {
            labelExpression: "[name]",
            labelPlacement: "center-right",
            symbol: {
                type: "text", // autocasts as new TextSymbol()
                font: {
                size: 12,
                weight: "bold"
                },
                color: "white",
                haloColor: "#1C2332",
                haloSize: 2,
                backgroundColor: "white"
                
            }
        }

        this.valvesLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/21464066_Bluewater_Project_Data/FeatureServer/0",
            outFields: ["*"],
            //popupTemplate: template,
            labelingInfo: [labelclass],
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: "/plus.png",
                    width: "25px",
                    height: "25px"
                }
            }
        })

        const map = new Map({
            basemap: "satellite",
            layers: [this.workspacesLayer, this.pipelineLayer, this.facilityLayer, this.valvesLayer]
        })

        this.view = new MapView({
        container: "viewDiv",
            map: map,
            center: [-97, 27.90],
            zoom: 11.99,
            highlightOptions: {
                color: "orange"
            }
        })

        this.view.ui.add(new Legend({ view: this.view, 
            layerInfos: [{
                layer: this.workspacesLayer,
                title: "Workspaces Legend"
            }]
         }), "bottom-left");

        this.view.ui.add("toggleATWS", "bottom-right");
        this.view.ui.add("togglePE", "bottom-right");
        this.view.ui.add("togglePEBDB", "bottom-right");
        this.view.ui.add("toggleTCW", "bottom-right");

        this.view.ui.add("zoomout", "top-left");
        
        this.view.ui.add(new Search({ view: this.view }), "top-right");
        this.view.ui.add('topbar', 'top-right');

        let activeWidget = null
        let vv = this.view
        document.getElementById("distanceButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("distance");
            } else {
                setActiveButton(null);
            }
        })

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

        let stL = this.valvesLayer

        this.view.when()
        .then(function() { return stL.when(); })
        .then(function(layer) {
            return vv.whenLayerView(layer);
        })
        .then(function(layerView) {
            vv.on("click", eventHandler)

            function eventHandler(event) {
                const opts = {
                    include: stL
                }
                vv.hitTest(event, opts).then(getGraphics);
            }

            let highlight, currentName

            function getGraphics(response) {
                console.log(response)
                if (response.results.length) {
                    const graphic = response.results[0].graphic;
                    
                    const attributes = graphic.attributes;
                    const name = attributes.Name;
                    console.log(attributes)

                    if ( highlight && (currentName !== name ) ) {
                        highlight.remove();
                        highlight = null;
                    }

                    document.getElementById("info").style.visibility = "visible";
                    document.getElementById("name").innerHTML = name;

                    highlight = layerView.highlight(graphic);
                    vv.goTo({
                        target: new Point({
                            latitude: graphic.geometry.latitude,
                            longitude: graphic.geometry.longitude
                        }),
                        zoom: 16
                    }, {
                        animate: true,
                        duration: 1000
                    })
                } else {
                    if (highlight){
                        highlight.remove();
                        highlight = null;
                    }
                    document.getElementById("info").style.visibility = "hidden";
                }
            }
        })

        
    }
}
</script>

<style lang="scss" scoped>
.map-wrapper,
#viewDiv {
  position: relative;
  height: 80vh;
  width: 90vw;
}

.red {
    color: red;
}
.green {
    color: rgb(152, 230, 0);
}
.blue {
    color: rgb(115, 223, 255);
}
.purple {
    color: rgb(169, 0, 230);
}

.esri-popup .esri-popup__main-container .esri-popup__footer {
  display: none !important;
}



#info {
  background-color: white;
  bottom: 100px;
  right: 20px;
  position: absolute;
  opacity: 0.9;
  width: 300px;
  height: 70%;
  z-index: 1000;
  font-size: 18pt;
  padding: 8px;
  visibility: hidden;

  &> * {
    color: #0079c1;
  }
}

.esri-ui {
    overflow: visible;
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