<template>
    <main role="main" class="template-page intro" aria-label="map panel" aria-describedby="istruzioni">
        <p class="tohide" tabindex="-1" id="istruzioni">use arrows to navigate, plus and minus to change zoom, press 'M' to focus map, measure distance widget not available for keyboard, press 'N' to return to navigation</p>

        <div class="intro-header"></div>

        <div id="contenuto" :class="['main-content', 'map-wrapper', 'lang-'+this.lang]" tabindex="-1" >

            <div id="loader" class="loader"><p>{{ this.lang=='es' ? 'Cargando . . .' : 'Loading . . .' }}</p></div>

            <div id="viewDiv" tabindex="-1"></div>

            <div id="info" aria-hidden="true" tabindex="-1">
                <button id="close-spalla" tabindex="0" class="close" aria-label="close panel" @click="hideInfo()"></button>
                <div class="intro" tabindex="0"><h2 style="color: #fff;" id="name"></h2></div>
                <p id="objectid"></p>
                <article id="category" tabindex="0">no data</article>
            </div>

            <div id="measure">
                <button
                    aria-hidden="true" tabindex="-1"
                    class="esri-icon-measure-line"
                    id="distanceButton"
                    title="Measure distance between two or more points"
                ></button>
            </div>

            <div id="zoomer">
                <button class="esri-icon-plus" @click="zoomplus()" aria-label="zoom in"></button>
                <button class="esri-icon-minus" @click="zoomminus()" aria-label="zoom out"></button>
            </div>

            <button id="zoomout" @click="zoomOut()" class="esri-icon-zoom-out-fixed" aria-label="reset zoom"></button>
        </div>

        <button class="tohide" id="back-to-nav" @click="backtomap()" tabindex="0" aria-label="back to navbar">
            back to map
        </button>
        <button class="tohide" id="back-to-nav" @click="backtonav()" tabindex="0" aria-label="back to navbar">
            back to navbar
        </button>

    </main>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Point from '@arcgis/core/geometry/Point'
import Search from '@arcgis/core/widgets/Search'
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D'
import GeometryService from '@arcgis/core/tasks/GeometryService'
import ProjectParameters from '@arcgis/core/tasks/support/ProjectParameters'
import Legend from '@arcgis/core/widgets/Legend'
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel'
import Expand from '@arcgis/core/widgets/Expand';
import Popup from '@arcgis/core/widgets/Popup'

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
            multiterminalLayer: null,
            valvesLayer: null,
            popsAdded: false,
            activeWidget: null,
            lastbutton: null,
            showspalla: false
        }
    },
    computed: {
        lang () {
            return this.$store.state.lang
        },
        content () {
            return this.$store.state.data[this.lang].location
        }
    },
    methods: {
        backtonav() {
            document.getElementById('navigazione').focus();
        },
        backtopmap() {
            if(this.showspalla) {
                document.getElementById("info").style.visibility = "hidden";
                document.getElementById("info").style.opacity = "0.2";
                document.getElementById("info").style.right = "-50%";
                document.getElementById("info").setAttribute('aria-hidden', true)
                document.getElementById("category").setAttribute('tabindex', '-1')
                if(this.lastbutton)
                    document.getElementById(this.lastbutton).children[0].children[0].children[0].click()
                this.showspalla = false
            }
            document.querySelector('.esri-view-surface').focus();
        },
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

            document.getElementById("info").setAttribute('aria-hidden', true)
            document.getElementById("category").setAttribute('tabindex', '-1')

            //ritorna al focus dell'ultimo punto selezionato
            if(this.lastbutton)
                document.getElementById(this.lastbutton).children[0].children[0].children[0].focus()

            //click che non apre la spalla, solo simulato per chiudere la proprietà 'expanded' dello screen reader
            if(this.lastbutton)
                document.getElementById(this.lastbutton).children[0].children[0].children[0].click()

            //solo ora chiudiamo veramente la spalla nella logica
            this.showspalla = false
        },
        zoomOut() {
            if(this.workspacesLayer.fullExtent.spatialReference != this.view.SpatialReference) {
                var geomSer = new GeometryService({url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer'});            
                var params = new ProjectParameters({              
                    geometries: [this.workspacesLayer.fullExtent],              
                    outSpatialReference: this.view.spatialReference            
                });            
                var tot =  this
                geomSer.project(params).then(function(results){              
                    tot.view.goTo({
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
        setActiveWidget(type) {
            switch (type) {
                case "distance":
                    this.activeWidget = new DistanceMeasurement2D({ view: this.view });
                    this.activeWidget.viewModel.start();
                    //tot.view.ui.add(activeWidget, "top-right");
                    this.setActiveButton(document.getElementById("distanceButton"));
                    break;
                case null:
                    if (this.activeWidget) {
                        this.view.ui.remove(this.activeWidget);
                        this.activeWidget.destroy();
                        this.activeWidget = null;
                    }
                    break;
            }
        },
        setActiveButton(selectedButton) {
            // focus the view to activate keyboard shortcuts for sketching
            //tot.view.focus({preventScroll: true});
            var elements = document.getElementsByClassName("active");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
            if (selectedButton) {
                selectedButton.classList.add("active");
            }
        },
        createMapAndLayers() {
            this.workspacesLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/4",
                outFields: ["*"]
            })

            this.pipelineLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/3",
                outFields: ["*"]
            })

            this.citiesLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/1",
                outFields: ["*"],
                renderer: {
                    //to hide white circle at city location on map
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
                url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/0",
                outFields: ["*"],
                labelingInfo: {
                    labelExpression: "[LABEL]",
                    labelPlacement: "below-center",
                    symbol: {
                        type: "text",
                        font: { size: 11 },
                        color: "#fff",
                        haloColor: "#1C2332",
                        haloSize: 2
                    }
                },
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-marker",
                        size: 6,
                        color: "orange",
                        outline: { width: 0,  color: "orange" }
                    }
                }
            })

            this.valvesLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWater_Update_locations_espanol_20210928/FeatureServer/0",
                outFields: ["*"],
                labelingInfo: {
                    labelExpression: "["+this.lang+"_title]",
                    labelPlacement: "center-right",
                    symbol: {
                        type: "text",
                        font: { size: 13 },
                        color: "#fff",
                        haloColor: "#1C2332",
                        haloSize: 2
                    }
                },
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "picture-marker",
                        url: "/point-1.png",
                        width: "45px",
                        height: "45px"
                    }
                }
            })

            this.map = new Map({
                basemap: "satellite",
                layers: [this.workspacesLayer, this.pipelineLayer, this.valvesLayer, this.citiesLayer, this.multiterminalLayer]
            })

            this.view = new MapView({
                container: "viewDiv",
                map: this.map,
                center: [-97, 27.90],
                zoom: 11.989,
                highlightOptions: {
                    color: "rgba(115, 223, 255, 0)"
                },
                popup: {
                    dockEnabled: false,
                    dockOptions: {
                        breakpoint: false,
                        buttonEnabled: false,
                        position: 'top-center',
                        autoOpenEnabled: false,
                        actions: [],
                        overwriteActions: true,
                        includeDefaultActions: false
                    }
                }
            })
        },
        addPopups(layerView, val) {
            var tot = this
            //refresh on click of map only if not measuring (lag fix)
            var refresh = document.querySelectorAll('.esri-view-surface')[0].getAttribute('data-cursor')!='crosshair' ? true : false
            
            if (!val && refresh) {
                console.log('refresh popups')
                layerView.queryFeatures({
                    where: "en_description <> ''",
                    outFields: ["*"],
                    returnGeometry: true

                }).then(function (results) {
                    document.querySelectorAll('.esri-spinner').forEach(el => {
                        el.parentNode.removeChild(el)
                    })

                    document.querySelectorAll('.esri-popup').forEach(el => {
                        if(el.children && el.children.length>0 && Array.from(el.children[0].classList).includes('esri-popup--is-collapsible')) {
                            el.parentNode.removeChild(el)
                        }
                    })

                    //document.querySelectorAll('.esri-popup')[0].parentNode.innerHTML = ''

                    let pt, pop
                    results.features.forEach(p => {
                        pt = new Point({ 
                            latitude: p.geometry.latitude, 
                            longitude: p.geometry.longitude 
                        })
                        pop = new Popup({
                            view: tot.view,
                            location: pt,
                            title: p.attributes[tot.lang+"_title"],
                            content: p.attributes[tot.lang+"_description"],
                            visible: true,
                            collapsed: true,
                            alignment: 'auto'
                        })
                        tot.view.ui.add(pop)
                    })

                    tot.accessiblePopups(layerView)
                })
            }
        },
        accessiblePopups(layerView) {
            var tot = this

            setTimeout(() => {
                document.querySelectorAll('.esri-popup').forEach((pp, i) => {
                    if(pp.children && pp.children.length>0 && Array.from(pp.children[0].classList).includes('esri-popup--is-collapsible')) {
                        if(document.querySelectorAll('.esri-popup').length>6)
                            pp.setAttribute('id', i)
                        else 
                            pp.setAttribute('id', i + 1)
                    } else
                        pp.setAttribute('id', 'search-result')
                })
                /*document.querySelectorAll('.esri-popup__header-title').forEach((h, i) => {
                    h.setAttribute('tabindex', '-1')
                })
                document.querySelectorAll('.esri-popup__header').forEach((h, i) => {
                    h.setAttribute('tabindex', '-1')
                })*/
                document.querySelectorAll('.esri-popup__header-container--button').forEach((b, i) => {
                    b.setAttribute('tabindex', 0)
                    b.setAttribute('aria-controls', 'info')
                
                    b.addEventListener('click', e => {
                        
                        if(!tot.showspalla) {
                            tot.lastbutton = e.target.parentNode.parentNode.parentNode.getAttribute('id')
                            let q = "OBJECTID = " + tot.lastbutton + ""
                                                        
                            layerView.queryFeatures({
                                where: q,
                                outFields: ['*'],
                                returnGeometry: true
                            }).then(res => {
                                const attributes = res.features[0].attributes;
                                const name = attributes[tot.lang+"_title"];
                                const description = attributes[tot.lang+"_description"]

                                document.getElementById("info").style.visibility = "visible";
                                document.getElementById("info").style.right = "0";
                                document.getElementById("info").style.opacity = "1";
                                document.getElementById("info").setAttribute('aria-hidden', false)

                                document.querySelector('.esri-view-surface').setAttribute('tabindex', '-1')

                                document.getElementById("name").innerHTML = name;
                                document.getElementById("category").innerHTML = description;

                                setTimeout(() => {
                                    document.getElementById('close-spalla').focus()
                                    tot.showspalla = true
                                }, 200);
                            })
                        }
                    })
                    
                })
                
            }, 100);
            
        }
    },
    mounted() {        
        //close spalla with 'esc'
        window.addEventListener('keydown', e => {
            
            if(e.key==='Escape') {
                this.hideInfo()
            }
        })

        //entire page listens to 'm' key pressed to return focus to map wrapper for navigation
        window.addEventListener('keydown', e => {
            
            if(e.keyCode==77) {
                if(document.activeElement.parentNode.getAttribute('role')!='search')
                    document.querySelector('.esri-view-surface').focus()
            }
        })

        this.createMapAndLayers() //create map and all provided layers
        let tot = this //variable to use this.view inside functions

        //element to compute layer extent and zoom out correctly
        this.zoomViewModel = new ZoomViewModel()
        this.zoomViewModel.view = this.view

        //Search WIDGET
        var search = new Search({ 
            view: this.view, 
            popupTemplate: { 
                overwriteActions: true, 
                title: '{Match_addr}'
            } 
        })
        this.view.ui.add(search, "top-left");

        //Zoom WIDGETS - buttons over map
        this.view.ui.add('measure', "top-left");
        this.view.ui.add("zoomer", "bottom-right");
        this.view.ui.add("zoomout", "bottom-right");

        //manually create a popup for every point in map,
        //need to call the Popup({...}) constructor in order to repeat the process,
        //usually only one popup at time is opened by the view automatically
        this.view.whenLayerView(this.valvesLayer).then(function (layerView) {
            //every time layer is refreshed/updated, to re-position popups and re-open them
            layerView.watch("updating", val => { tot.addPopups(layerView, val) })
        })
        
        //click on Measure WIDGET to activate/reset distance computation
        //+ style button accordingly
        document.getElementById("distanceButton").addEventListener("click", function() {
            tot.setActiveWidget(null);
            if (!this.classList.contains("active")) {
                tot.setActiveWidget("distance");
            } else {
                tot.setActiveButton(null);
            }
        })

        //hide points without a label on the multiterminal layer (punto in mezzo al mare nascosto)
        this.multiterminalLayer.definitionExpression = "LABEL <> ''"

        //manage click and selection events on map canvas
        this.view.when()
        .then(function() {
            //wait for FeatureLayer to be built
            return tot.valvesLayer.when();
            
        })
        .then(function(layer) {
            //create LayerView to query data
            return tot.view.whenLayerView(layer);
        })
        .then(function(layerView) {

            var rend = tot.workspacesLayer.renderer
            rend.uniqueValueInfos.forEach((info, index) => {
                info.label = tot.content.legend[index]
            })

            //Legend WIDGET - collapsible element
            var legend = new Expand({
                content: new Legend({
                    view: tot.view,
                    style: "classic",
                    layerInfos: [{
                        layer: tot.workspacesLayer,
                        title: tot.content.legend_title
                    }]
                }),
                view: tot.view,
                expanded: false
            })

            tot.view.ui.add(legend, "bottom-left");

            tot.view.on("click", eventHandler)
            
            /*tot.view.on("pointer-up", eventh2)
            function eventh2(event) {
                console.log('UP')
                tot.addPopups(layerView, false)
            }*/
            
            function eventHandler(event) {
                //check if click position intersects the included layer
                const opts = { include: tot.valvesLayer }
                tot.view.hitTest(event, opts).then(getGraphics);
            }

            function getGraphics(response) {
                if (response.results.length) {
                    //retrieve clicked point data
                    const graphic = response.results[0].graphic;
                    const attributes = graphic.attributes;
                    const name = attributes[tot.lang+"_title"];
                    const description = attributes[tot.lang+"_description"]

                    tot.lastbutton = attributes.OBJECTID

                    //show info section if data is clicked
                    document.getElementById("info").style.visibility = "visible";
                    document.getElementById("info").style.right = "0";
                    document.getElementById("info").style.opacity = "1";
                    document.getElementById("info").setAttribute('aria-hidden', false)

                    document.getElementById("name").innerHTML = name;
                    document.getElementById("category").innerHTML = description;

                    tot.showspalla = true;

                    //zoom in to point clicked
                    /*tot.view.goTo({
                        target: new Point({
                            latitude: graphic.geometry.latitude,
                            longitude: graphic.geometry.longitude
                        }),
                        zoom: 15.5
                    }, {
                        animate: true,
                        duration: 1000
                    })*/

                } else {
                    //if click on empty space in map, hide info section
                    document.getElementById("info").style.visibility = "hidden";
                    document.getElementById("info").style.opacity = "0.2";
                    document.getElementById("info").style.right = "-50%";
                    document.getElementById("info").setAttribute('aria-hidden', true)

                    tot.showspalla = false;
                }

                //build hidden multiple popups for accessibility features
                tot.addPopups(layerView, false)
            }
        })
        .then(function() {
            document.getElementById('loader').style.visibility = 'hidden'

            if(document.querySelector('.esri-expand [role=button]'))
                document.querySelector('.esri-expand [role=button]').setAttribute('aria-label', 'expand legend')

            document.querySelector('.esri-attribution').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__sources').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__powered-by').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__link').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution').setAttribute('tabindex', '-1')
            document.querySelector('.esri-attribution__sources').setAttribute('tabindex', '-1')
            document.querySelector('.esri-attribution__powered-by').setAttribute('tabindex', '-1')
            //document.querySelector('.esri-attribution__link').setAttribute('tabindex', '-1')

            document.querySelector('.esri-view-surface').setAttribute('id', 'contenuto')

            //map listens to zoom keyboard events 
            document.querySelector('.esri-view-surface').addEventListener('keydown', e => {
                if(e.key==='+' && !e.ctrlKey)
                    tot.zoomplus()
                else if(e.key==='-' && !e.ctrlKey)
                    tot.zoomminus()
            })
            if(document.getElementById('contenuto'))
                document.getElementById('contenuto').focus({ preventScroll: true });
            
        })
    }
}
</script>

<style lang="scss" scoped>

.loader {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
    background: url(/img/bg-intro.7e6dba88.jpg) center no-repeat;
    background-size: cover;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    p {
        color: #fff;
        font-size: 1.5em;
    }
}

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
    transition: all 300ms ease-in-out;

    .intro{
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .6)), url("../assets/header-bg.jpg")  ;
    }

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
        line-height: 1.5em;
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
        background-image: url(../assets/close-button.svg);
        background-position: center center;
        background-size: contain;
        display: block;
        border-radius: 0;
        background-color: #0079c1;
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
    &.active {
        background: #0079c1;
        color: #fff;
    }
}

.active {
  background: #0079c1;
  color: #fff;
}

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

</style>