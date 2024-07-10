<template>
    <!--Grid column-->
    <div class="mb-4" :class="[columnClass]">
        <!--Card-->
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-12">
                        <h5>{{ mapTitle }}</h5>
                    </div>
                </div>
                <div class="row filters-row">
                    <div class="col-md-4">
                        <v-select v-model="range" :options="rangeOptions"></v-select>
                    </div>
                </div>
            </div>
            <!--Card content-->
            <div class="card-body">
                <div class="loader" v-show="loading">Loading...</div>
                <div style="position: relative; width: 100%; min-height: 600px;" :id="mapId" class="datamap">
                    <div class="map-controls">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button v-on:click="zoom('out')" type="button" class="btn btn-light-blue btn-rounded waves-effect">
                                <i class="fa fa-search-minus" aria-hidden="true"></i>
                            </button>
                            <button v-on:click="zoom('reset')" type="button" class="btn btn-light-blue btn-rounded waves-effect">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                            <button v-on:click="zoom('in')" type="button" class="btn btn-light-blue btn-rounded waves-effect">
                                <i class="fa fa-search-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
    import Error from '../mixins/errors'

    export default {
        props: ['columnClass', 'dataUrl', 'mapId', 'mapTitle'],
        mixins: [ Error ],
        data: function () {
            return {
                data: {},
                map: null,
                defaultZoom: {
                    zoom: 2,
                    position: {
                        x: 0,
                        y: 80
                    }
                },
                rangeOptions: [      
                    {label: 'Last week', value: '7'},
                    {label: 'Last 2 weeks', value: '14'},
                    {label: 'Last month', value: '30'},
                    {label: 'Last 2 months', value: '60'},
                    {label: 'Last 6 months', value: '180'},
                ],
                range: {label: 'Last month', value: '30'},
                loading: false
            }
        },
        computed: {
        },
        watch: {
            range: function() {
                if(this.map !== null){
                    document.getElementById(this.mapId).innerHTML = '';
                }
                this.getData();
            },
        },
        created: function () {
        },
        mounted: function() {
            this.getData();
        },
        methods: {
            getData: function () {
                var self = this;
                this.loading = true;
            
                axios.get(this.dataUrl+'?range='+this.range.value)
                .then(function (response) {
                    self.data = response.data.data;
                    self.drawMap();                    
                })
                .catch(function (error) {
                    self.reportError(error);
                })
            },
            drawMap: function () {
                var self = this;
                var mapContainer = document.getElementById(this.mapId);
                var dataset = {};

                var onlyValues = self.data.map(function(obj){ return obj.count; });
                var minValue = Math.min.apply(null, onlyValues),
                        maxValue = Math.max.apply(null, onlyValues);

                // create color palette function
                // color can be whatever you wish
                var paletteScale = d3.scale.linear()
                        .domain([minValue,maxValue])
                        .range(["#EFEFFF","#02386F"]); // blue color

                // fill dataset in appropriate format
                self.data.forEach(function(item){ //
                    // item example value ["USA", 70]
                    var iso = item.iso,
                            value = item.count,
                            id = item.CountryID;
                    dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value), countryID: id };
                });

                if(mapContainer != null){
                    self.map = new Datamap({
                        element: mapContainer,
                        responsive: true,
                        projection: 'mercator', // big world map
                        // countries don't listed in dataset will be painted with this color
                        fills: { defaultFill: 'gainsboro' },
                        data: dataset,
                        geographyConfig: {
                            borderColor: '#DEDEDE',
                            highlightBorderWidth: 2,
                            // don't change color on mouse hover
                            highlightFillColor: function(geo) {
                                return geo['fillColor'] || '#F5F5F5';
                            },
                            // only change border
                            highlightBorderColor: '#B7B7B7',
                            // show desired information in tooltip
                            popupTemplate: function(geo, data) {
                                // don't show tooltip if country don't present in dataset
                                if (!data) { return ; }
                                // tooltip content
                                return ['<div class="hoverinfo">',
                                    '<strong>', geo.properties.name, '</strong>',
                                    '<br>Orders: <strong>', data.numberOfThings, '</strong>',
                                    '</div>'].join('');
                            }
                        },
                        done: function(datamap) {
                            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                                self.$router.push({ name: 'country', params: { id: geography.id, name: geography.properties.name }});
                            });                            
                        }
                    });

                    var chartSvg = mapContainer.getElementsByTagName( 'svg' )[0];
                    chartSvg.addEventListener("mousedown", self.onMouseDown);
                    chartSvg.addEventListener("scroll", self.onMouseScroll, true);
                }
                
                this.loading = false;
            },
            onMousemove: function(e){
                var chartSvg = document.getElementById(this.mapId).getElementsByTagName( 'svg' )[0];
                this.defaultZoom.position.x = this.defaultZoom.position.x + e.movementX;
                this.defaultZoom.position.y = this.defaultZoom.position.y + e.movementY;

                chartSvg.style.transform = 'scale('+this.defaultZoom.zoom+') translateY('+this.defaultZoom.position.y+'px) translateX('+this.defaultZoom.position.x+'px)';
            },
            onMouseDown: function(){
                var self = this;
                var chartSvg = document.getElementById(this.mapId).getElementsByTagName( 'svg' )[0];
                chartSvg.addEventListener("mousemove", self.onMousemove);
                chartSvg.addEventListener("mouseup", self.onMouseUp);
            },
            onMouseUp: function(){
                var self = this;
                var chartSvg = document.getElementById(this.mapId).getElementsByTagName( 'svg' )[0];
                chartSvg.removeEventListener("mousemove", self.onMousemove);
                chartSvg.removeEventListener("mouseup", self.onMouseUp);
            },
            onMouseScroll: function(e){
                var self = this;
                var chartSvg = document.getElementById(this.mapId).getElementsByTagName( 'svg' )[0];
                console.log(e);
            },
            zoom: function(action){
                var chartSvg = document.getElementById(this.mapId).getElementsByTagName( 'svg' )[0];

                switch(action){
                    case 'in':
                        if(this.defaultZoom.zoom < 10){
                            this.defaultZoom.zoom = this.defaultZoom.zoom + 1;
                        }
                    break;
                    case 'out':
                        if(this.defaultZoom.zoom > 1){
                            this.defaultZoom.zoom = this.defaultZoom.zoom - 1;
                        }
                    break;
                    case 'reset':
                        this.defaultZoom.zoom = 2;
                    break;
                    default:
                        this.defaultZoom.zoom = 2;
                    break;
                }

                chartSvg.style.transform = 'scale('+this.defaultZoom.zoom+') translateY('+this.defaultZoom.position.y+'px) translateX('+this.defaultZoom.position.x+'px)';
            },
            removeEvents: function(){
                console.log('removed event listener');
            }
        }
    }
</script>