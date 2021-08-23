<template>
    <div class="template-page intro" >
        <header class="intro-header"></header>
        <div :class="['main-content', 'map-wrapper', 'lang-'+this.lang] ">

            <!--<div id="loader" class="loader"></div>-->

            <div id="viewDiv"></div>

            <div id="info">
                <div class="close" @click="hideInfo()"></div>

                <div class="intro">
                    <p><span id="name"></span></p>
                </div>
                <p><span id="objectid"></span></p>
                <p id="category">
                    ...
                </p>
            </div>

            <!-- BUTTONS TO TOGGLE LAYERS -->
            <!--<div id="toggles" class="toggles">
                <button id="toggleATWS" @click="toggleATWS()" :class="{'tog': true, 'red': true, 
                    'esri-icon-non-visible tog-active': this.showATWS, 'esri-icon-visible': !this.showATWS}"><span>ATWS</span></button>
                <button id="togglePE" @click="togglePE()" :class="{'tog': true, 'green': true, 
                    'esri-icon-non-visible tog-active': this.showPE, 'esri-icon-visible': !this.showPE}"><span>PE</span></button>
                <button id="togglePEBDB" @click="togglePEBDB()" :class="{'tog': true, 'purple': true, 
                    'esri-icon-non-visible tog-active': this.showPEBDB, 'esri-icon-visible': !this.showPEBDB}"><span>PEBDB</span></button>
                <button id="toggleTCW" @click="toggleTCW()" :class="{'tog': true, 'blue': true, 
                    'esri-icon-non-visible tog-active': this.showTCW, 'esri-icon-visible': !this.showTCW}"><span>TCW</span></button>
            </div>-->

            <button id="zoomout" @click="zoomOut()" class="esri-icon-zoom-out-fixed"></button>


            <div id="measure">
                <button
                    class="esri-icon-measure-line"
                    id="distanceButton"
                    title="Measure distance between two or more points"
                ></button>
            </div>

            <div id="zoomer">
                <button class="esri-icon-minus" @click="zoomminus()"></button>
                <button class="esri-icon-plus" @click="zoomplus()"></button>
            </div>
        </div>

        
    </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
//import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Point from '@arcgis/core/geometry/Point'
import Search from '@arcgis/core/widgets/Search'
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D'
import GeometryService from '@arcgis/core/tasks/GeometryService'
import ProjectParameters from '@arcgis/core/tasks/support/ProjectParameters'
import Legend from '@arcgis/core/widgets/Legend'
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel'
import Expand from '@arcgis/core/widgets/Expand'

export default {
    name: 'location',
    data: () => {
        return {
            view: null, 
            map: null,
            zoomViewModel: null,
            workspacesLayer: null,
            pipelineLayer: null,
            citiesLayer: null,
            loading: true,
            //facilityLayer: null,
            multiterminalLayer: null,
            valvesLayer: null,
            showATWS: '',
            showPE: '',
            showPEBDB: '',
            showTCW: ''
        }
    },
    computed: {
        lang () {
            return this.$store.state.lang
        },
    },
    methods: {
        zoomplus() {
            this.zoomViewModel.zoomIn();
        },
        zoomminus() {
            this.zoomViewModel.zoomOut();
        },
        hideInfo() {
            document.getElementById("info").style.visibility = "hidden";
            document.getElementById("info").style.opacity = "0.2";
            document.getElementById("info").style.right = "-50%";
        },
        zoomOut() {
            if(this.workspacesLayer.fullExtent.spatialReference != this.view.SpatialReference) {
                var geomSer = new GeometryService({url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer'});            
                var params = new ProjectParameters({              
                    geometries: [this.workspacesLayer.fullExtent],              
                    outSpatialReference: this.view.spatialReference            
                });            
                var vv =  this.view
                geomSer.project(params).then(function(results){              
                    vv.goTo({
                        target: results[0],
                        zoom: 11.989
                    }, {
                        animate: true,
                        duration: 1500
                    });            
                });  
            } else {
                this.view.goTo({
                    target: this.workspacesLayer.fullExtent,
                    zoom: 11.989
                }, {
                    animate: true,
                    duration: 1500
                })
            }

        },
        //LAYER TOGGLE FUNCTIONS + FILTER BUTTONS STYLING
        /*toggleATWS() {
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
        }*/
    },
    mounted() {
        this.workspacesLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210722/FeatureServer/4",
            outFields: ["*"]
        })

        this.pipelineLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210722/FeatureServer/3",
            outFields: ["*"]
        })

        /*this.facilityLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/21464066_Bluewater_Project_Data/FeatureServer/2",
            outFields: ["*"]
        })*/

        /*const cityLabel = {
            labelExpression: "[NAME]",
            labelPlacement: "center-right",
            symbol: {
                type: "text", //autocasts as new TextSymbol()
                font: {
                    size: 10,
                    weight: "bold"
                },
                color: "white"
            }
        }*/

        this.citiesLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210722/FeatureServer/1",
            //labelingInfo: [cityLabel],
            outFields: ["*"],
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: "/point-1.png",
                    width: "1px",
                    height: "1px"
                }
            }
        })

        this.multiterminalLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/ArcGIS/rest/services/BlueWaterData_update_20210722/FeatureServer/0",
            outFields: ["*"],
            labelingInfo: {
                labelExpression: "[LABEL]",
                labelPlacement: "below-center",
                symbol: {
                    type: "text",
                    font: {
                        size: 11
                    },
                    color: "#fff",
                    haloColor: "#1C2332",
                    haloSize: 2
                }
            },
            renderer: {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                    size: 6,
                    color: "orange",
                    outline: {  // autocasts as new SimpleLineSymbol()
                        width: 0,
                        color: "orange"
                    }
                }
            }
        })

        const labelclass = {
            labelExpression: "  ["+this.lang+"_title]",
            labelPlacement: "center-right",
            symbol: {
                type: "text", //autocasts as new TextSymbol()
                font: {
                    size: 13
                },
                color: "white",
                haloColor: "#1C2332",
                haloSize: 2
                
            }
        }

        //const template = { title: "{en_title}", overwriteActions: true, autoOpenEnabled: true }
        this.valvesLayer = new FeatureLayer({
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210722/FeatureServer/2",
            outFields: ["*"],
            //popupTemplate: template,
            //popupEnabled: true,
            labelingInfo: [labelclass],
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: "/point-1.png",
                    //width: "220px",
                    width: "45px",
                    height: "45px",
                    //xoffset: "110px"
                }
            }
        })

        const map = new Map({
            basemap: "satellite",
            layers: [this.workspacesLayer, this.pipelineLayer, this.valvesLayer, this.citiesLayer, this.multiterminalLayer]//, this.facilityLayer
        })

        this.view = new MapView({
        container: "viewDiv",
            map: map,
            center: [-97, 27.90],
            zoom: 11.989,
            highlightOptions: {
                color: "rgba(115, 223, 255, 0)"
            }
        })

        //element to compute layer extent and zoom out correctly
        this.zoomViewModel = new ZoomViewModel()
        this.zoomViewModel.view = this.view

         var legend = new Expand({
            content: new Legend({
                view: this.view,
                style: "classic",
                layerInfos: [{
                    layer: this.workspacesLayer,
                    title: "Workspaces Legend"
                }]
            }),
            view: this.view,
            expanded: false
        })

        this.view.ui.add(legend, "bottom-left");

        var search = new Search({ view: this.view, popupTemplate: { overwriteActions: true, title: '{Match_addr}' } })
        /*search.on("select-result", function(evt){
            this.view.popup.open({
                title: evt.result.feature.attributes.Match_addr,
                location: evt.result.extent.center
            });      
        });*/
        this.view.ui.add(search, "top-left");
        this.view.ui.add('measure', "top-left");
        //this.view.ui.add("toggles", "bottom-left");
        
        this.view.ui.add("zoomer", "bottom-right");
        this.view.ui.add("zoomout", "bottom-right");

        //click on Measure Widget to activate/reset distance computation
        //+ button style accordingly
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
            //vv.focus();
            var elements = document.getElementsByClassName("active");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
            if (selectedButton) {
                selectedButton.classList.add("active");
            }
        }

        //hide points without a label on the multiterminal layer (punto in mezzo al mare nascosto)
        this.multiterminalLayer.definitionExpression = "LABEL <> ''"

        //click on any vale point on the map to get infos and zoom in place
        //focus on object and data fetching
        let vsL = this.valvesLayer
        let lang = this.lang
        this.view.when()
        .then(function() {
            /*console.log(document.getElementById('loader').classList);
            document.getElementById('loader').classList.add('hidden');*/
            return vsL.when();
        })
        .then(function(layer) {
            return vv.whenLayerView(layer);
        })
        .then(function(layerView) {
            vv.on("click", eventHandler)

            function eventHandler(event) {
                const opts = {
                    include: vsL
                }
                vv.hitTest(event, opts).then(getGraphics);
            }

            //let highlight, currentName
            function getGraphics(response) {
                if (response.results.length) {
                    const graphic = response.results[0].graphic;
                    
                    const attributes = graphic.attributes;
                    const name = attributes[lang+"_title"];
                    //const objid = attributes.OBJECTID;
                    const description = attributes[lang+"_description"]
                    //console.log(attributes)

                    /*if ( highlight && (currentName !== name ) ) {
                        highlight.remove();
                        highlight = null;
                    }*/

                    //SHOW info section if data is clicked
                    document.getElementById("info").style.visibility = "visible";
                    document.getElementById("info").style.right = "0";
                    document.getElementById("info").style.opacity = "1";
                    document.getElementById("name").innerHTML = name;
                    //document.getElementById("objectid").innerHTML = "OBJECTID: " + objid;
                    document.getElementById("category").innerHTML = description;

                    //HIGHLIGHT and ZOOM ON POINT (optional)
                    //highlight = layerView.highlight(graphic);
                    vv.goTo({
                        target: new Point({
                            latitude: graphic.geometry.latitude,
                            longitude: graphic.geometry.longitude
                        }),
                        zoom: 15.5
                    }, {
                        animate: true,
                        duration: 1000
                    })
                } else {
                    //HIDE info section if empty point on map is clicked
                    /*if (highlight){
                        highlight.remove();
                        highlight = null;
                    }*/
                    document.getElementById("info").style.visibility = "hidden";
                    document.getElementById("info").style.opacity = "0.2";
                    document.getElementById("info").style.right = "-50%";
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.map-wrapper {
    margin: 0;
    width: calc(100vw - 60px);
    height: calc(100vh - 85px);
    margin-left: 60px;
    margin-top: -295px;
    overflow: hidden;
}

#info {
    background-color: #fff;
    height: 100%;
    top: 0;
    overflow-y: scroll;
    bottom: 0px;
    padding: 0;
    width: 710px;
    z-index: 99;
    right: -50%;
    position: fixed;
    opacity: 1;
    visibility: hidden;
    font-size: 16px;
    transition: all 500ms ease-in-out;

    .intro{
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .6)), url("../assets/header-bg.jpg")  ;
    }
       /*
    &::before {
        content: '';
        width: 100%;
        min-height: calc(190px + 2%);
        
        background-size: cover;
        left: 0;
        top: 0;
        position: absolute;
        z-index: -1;
    }
    */

    .intro, .intro p {
        color: #fff;
        font-weight: 700;
        font-size: 18pt;
        margin: 0;
    }

    .intro p {
        bottom: 10%;
    }

    .intro {
        position: relative;
        padding-top: 150px;
        padding-left: 50px;
        padding-right: 50px;
        margin-bottom: 20px;
        padding-bottom: 40px;
    }

    #category {
        padding: 30px;
        padding-right: 50px;
        ::v-deep li {
            counter-increment: my-awesome-counter;
            position: relative;
        }
        ::v-deep ol {
            counter-reset: my-awesome-counter;
            list-style: none;
        }
        ::v-deep li::before {
            content: counter(my-awesome-counter) '.';
            color: #0079c1;
            font-size: 1.1em;
            top: -.1em;
            font-weight: 700;
            position: absolute;
            left: -1.5em;
        }
    }

    .close {
        cursor: pointer;
        content: url(/close-button.svg);
        display: block;
        border-radius: 0;
        background: #0079c1;
        color: #fff;
        width: 70px;
        height: 70px;
        position: fixed;
        z-index: 9;
    }
}

@media (max-width: 1200px) {
    .map-wrapper{
        margin-top: -235px;
        height: calc(100vh - 90px);
        width: calc(100vw - 5%);
    }
}

@media (max-width: 1024px) {
    .map-wrapper {
        width: 100vw;
        margin-left: 0;
        height: calc(100vh - 164px);
    }

}

#viewDiv {
  position: relative;
  height: 100%;
  width: 100%;
}

.tog {
    border-radius: 0;
    //font-size: .8rem;
    margin: 0;
    margin-right: 10px;
}

.red:hover {
    //background-color: red;
    background-color: #ccc;
    color: black;
}
.green:hover {
    //background-color: rgb(152, 230, 0);
    background-color: #ccc;
    color: black;
}
.blue:hover {
    //background-color: rgb(115, 223, 255)
    background-color: #ccc;
    color: black;
}
.purple:hover {
    //background-color: rgb(169, 0, 230);
    background-color: #ccc;
    color: black;
}
.tog-active {
    background-color: #0079c1;
    color: #fff;
}

.esri-popup .esri-popup__main-container .esri-popup__footer {
  display: none !important;
}

#measure button,
#zoomout {
    background: rgb(239, 239, 239);
    color: black;
    padding: 10px;
    &:hover {
        background: #0079c1;
        color: #fff;
    }
}

.action-button:hover {
//.action-button:focus 
  background: #0079c1;
  color: #e4e4e4;
}

.active {
  background: #0079c1;
  color: #fff;
}

/*.toggles {
    display: flex;
    flex-direction: column;
    text-align: left;
    button {
        margin-top: 10px;
        span {
            font-family: "Open Sans";
            margin-left: 10px;
        };
    }
}*/

#zoomer {
    button {
        background: #0079c1;
        color: #fff;
        padding: 10px;
        &:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 1px #fff solid;
        }
        &:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}

@media (max-width: 1200px) {
    #info{
        width: 576px;
        .intro{
            padding-top: 100px;
        }
        #category{
            padding: 30px 90px;
        }
    }
}

@media (max-width: 1024px) {
    #info{
        width: auto;
        transition: none;
        .intro{
            padding-left: 20px;
            padding-right: 20px;
        }
        #category{
            padding: 30px 20px 190px;
        }
    }
}


@media (max-width: 992px) {

    .map-wrapper {
        height: calc(100% - 185px);
        position: absolute;
    }
}

@media (max-width:768px){
        .map-wrapper {
        height: calc(100% - 165px);
        position: absolute;
    }
}

@media (max-width: 480px) {

}

.loader {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: blue;
    z-index: 1000;
    top: 0;
    pointer-events: none;
    opacity: 1;

    &.hidden {
        opacity: 0;
    }
}

</style>