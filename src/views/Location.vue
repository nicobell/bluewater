<template>
    <main role="main" class="template-page intro">
        <div class="intro-header"></div>

        <div :class="['main-content', 'map-wrapper', 'lang-'+this.lang]" tabindex="-1">

            <div id="loader" class="loader"><p>Loading . . .</p></div>

            <div id="viewDiv" tabindex="-1"></div>

            <p class="tohide" tabindex="-1" id="istruzioni">use arrows to navigate, + and - to change zoom, press m to focus map, measure distance widget not available for keyboard</p>

            <div id="info" aria-hidden="true" tabindex="-1">
                <button id="close-spalla" tabindex="0" class="close" @click="hideInfo()"></button>
                <div class="intro"><h2 style="color: #fff;" id="name"></h2></div>
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
            dataPoints: [],
            popsAdded: false,
            activeWidget: null,
            lastbutton: null
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
            //document.getElementById('viewDiv').focus(); 

            document.getElementById("info").style.visibility = "hidden";
            document.getElementById("info").style.opacity = "0.2";
            document.getElementById("info").style.right = "-50%";

            document.getElementById("info").setAttribute('aria-hidden', true)
            document.getElementById("category").setAttribute('tabindex', '-1')

            document.getElementById(this.lastbutton).focus()
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
        addPopups(layerView, val) {
            var tot = this
            //refresh on click of map only if not measuring (lag fix)
            var refresh = document.querySelectorAll('.esri-view-surface')[0].getAttribute('data-cursor')!='crosshair' ? true : false
            console.log(val, refresh)
            if (!val && refresh) {
                console.log('prova')
                layerView.queryFeatures({
                    where: "en_description <> ''",
                    outFields: ["*"],
                    returnGeometry: true

                }).then(function (results) {
                    console.log('remove all popups')
                    document.querySelectorAll('.esri-popup').forEach(p => { p.parentElement.removeChild(p) })
                    document.querySelectorAll('.esri-spinner').forEach(p => { p.parentElement.removeChild(p) })

                    console.log('create all popups')
                    results.features.forEach(p => {
                        var pt = new Point({ 
                            latitude: p.geometry.latitude, 
                            longitude: p.geometry.longitude 
                        })
                        var pop = new Popup({
                            view: tot.view,
                            location: pt,
                            title: p.attributes.en_title,
                            content: p.attributes.en_description,
                            visible: true,
                            collapsed: true,
                            alignment: 'auto'
                        })
                        tot.view.ui.add(pop)
                    })

                    // !! DANGER ZONE !!
                    setTimeout(() => {
                        document.querySelectorAll('.esri-popup').forEach((pp, i) => {
                            console.log('popup')
                            pp.setAttribute('id', i+1)
                            pp.setAttribute('tabindex', 0)
                        })
                    }, 200);
                    
                    tot.accessiblePopups(layerView)
                })
            }
        },
        accessiblePopups(layerView) {
            var tot = this

            setTimeout(() => {
                document.querySelectorAll('.esri-popup').forEach(p => {
                    p.setAttribute('tabindex', 0)
                })

                document.querySelectorAll('.esri-popup__header').forEach((b, i) => {
                    b.setAttribute('tabindex', '-1')

                    b.parentNode.parentNode.parentNode.addEventListener('keydown', e => {
                        if(e.keyCode===13) {
                            b.click()
                            tot.lastbutton = e.target.getAttribute('id')
                            var q = "OBJECTID = " + e.target.getAttribute('id') + ""
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
                                document.getElementById("name").innerHTML = name;
                                document.getElementById("category").innerHTML = description;

                                setTimeout(() => {
                                    document.getElementById('close-spalla').focus()
                                }, 200);
                            })
                        }
                    })
                    b.addEventListener('click', e => {
                        if(e.keyCode===13) {
                            b.click()
                            tot.lastbutton = e.target.parentNode.parentNode.parentNode.getAttribute('id')
                            var q = "OBJECTID = " + e.target.parentNode.parentNode.parentNode.getAttribute('id') + ""
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
                                document.getElementById("name").innerHTML = name;
                                document.getElementById("category").innerHTML = description;

                                setTimeout(() => {
                                    document.getElementById('close-spalla').focus()
                                }, 200);
                            })
                        }
                    })
                })
                
            }, 200);
            
        }
    },
    mounted() {
        //after creating the map, set id of mainView as focussable element
        /*setTimeout(() => {
            document.querySelector('.esri-view-surface').setAttribute('id', 'contenuto')
            document.querySelector('.esri-view-surface').setAttribute('aria-describedby', 'use arrows to navigate, + and - to change zoom, press m to focus map, measure distance widget not available for keyboard')
            //map listens to zoom keyboard events 
            document.querySelector('.esri-view-surface').addEventListener('keydown', e => {
                if(e.key==='+' && !e.ctrlKey)
                    this.zoomplus()
                else if(e.key==='-' && !e.ctrlKey)
                    this.zoomminus()
            })
        }, 100);*/
        
        //close spalla with 'esc'
        document.getElementById('info').addEventListener('keydown', e => {
            if(e.key==='Escape') {
                this.hideInfo()
            }
        })

        // ?? trap focus inside spalla ??
        /*document.getElementById('close-spalla').addEventListener('keydown', e => {
            if(e.keyCode==9 && e.shiftKey==true) {
                setTimeout(() => {
                    document.getElementById('category').focus()    
                }, 200);
            }
        })*/

        //entire page listens to 'm' key pressed to return focus to map wrapper for navigation
        document.addEventListener('keydown', e => {
            if(e.key=='m')
                document.querySelector('.esri-view-surface').focus()
        })

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
            url: "https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/2",
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

        /*fetch('https://services1.arcgis.com/HGtSnUkjNnIpVEaA/arcgis/rest/services/BlueWaterData_update_20210726/FeatureServer/2?f=json')
        .then(res => res.json())
        .then(json => console.log(json))*/

        const map = new Map({
            basemap: "satellite",
            layers: [this.workspacesLayer, this.pipelineLayer, this.valvesLayer, this.citiesLayer, this.multiterminalLayer]
        })

        this.view = new MapView({
            container: "viewDiv",
            map: map,
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

        //variable to use this.view inside functions
        let tot =this

        //element to compute layer extent and zoom out correctly
        this.zoomViewModel = new ZoomViewModel()
        this.zoomViewModel.view = this.view

        //collapsible element for Legend widget
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

        //Search location widget
        var search = new Search({ 
            view: this.view, 
            popupTemplate: { 
                overwriteActions: true, 
                title: '{Match_addr}'
            } 
        })
        this.view.ui.add(search, "top-left");

        //add buttons for zooming functions to ovelap the map
        this.view.ui.add('measure', "top-left");
        this.view.ui.add("zoomer", "bottom-right");
        this.view.ui.add("zoomout", "bottom-right");

        //manually create a popup for every point in map,
        //need to call the Popup({...}) constructor in order to repeat the process,
        //normally only one popup at time can be opened by the view
        this.view.whenLayerView(this.valvesLayer).then(function (layerView) {
            layerView.watch("updating", val => tot.addPopups(layerView, val))
        })

        //click on Measure widget to activate/reset distance computation
        //+ button style accordingly
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
            tot.view.on("click", eventHandler)
            
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

                    //show info section if data is clicked
                    document.getElementById("info").style.visibility = "visible";
                    document.getElementById("info").style.right = "0";
                    document.getElementById("info").style.opacity = "1";
                    document.getElementById("name").innerHTML = name;
                    document.getElementById("category").innerHTML = description;

                    //zoom in to point clicked
                    tot.view.goTo({
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
                    //if click on empty space in map, hide info section
                    document.getElementById("info").style.visibility = "hidden";
                    document.getElementById("info").style.opacity = "0.2";
                    document.getElementById("info").style.right = "-50%";
                }

                //build hidden multiple popups for accessibility features
                tot.addPopups(layerView, false)
            }
        })
        .then(function() {
            document.getElementById('loader').style.visibility = 'hidden'

            document.querySelector('.esri-expand [role=button]').setAttribute('aria-label', 'expand legend')

            document.querySelector('.esri-attribution').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__sources').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__powered-by').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution__link').setAttribute('aria-hidden', true)
            document.querySelector('.esri-attribution').setAttribute('tabindex', '-1')
            document.querySelector('.esri-attribution__sources').setAttribute('tabindex', '-1')
            document.querySelector('.esri-attribution__powered-by').setAttribute('tabindex', '-1')
            //document.querySelector('.esri-attribution__link').setAttribute('tabindex', '-1')

            setTimeout(() => {
                document.querySelector('.esri-view-surface').setAttribute('id', 'contenuto')
                document.querySelector('.esri-view-surface').setAttribute('aria-describedby', 'istruzioni')
                //map listens to zoom keyboard events 
                document.querySelector('.esri-view-surface').addEventListener('keydown', e => {
                    if(e.key==='+' && !e.ctrlKey)
                        tot.zoomplus()
                    else if(e.key==='-' && !e.ctrlKey)
                        tot.zoomminus()
                })
                if(document.getElementById('contenuto'))
                    document.getElementById('contenuto').focus({ preventScroll: true });    
            }, 200);
            
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
        background-image: url(/close-button.svg);
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

@media (max-width: 480px) {

}


</style>