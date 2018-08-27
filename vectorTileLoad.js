//扩展layer类
(function (window, document, undefined) {
    
        L.WindTilelayer = L.Layer.extend({
            includes: L.Mixin.Events,
    
            options: {
                layers:L.featureGroup(),
                //输入参数
                resolutions :[0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7],
                xOrigin:-180,
                yOrigin:90,
            },
    
            initialize: function (options) {
                L.setOptions(this, options);
                this.currentbounds = null;
                this.currentzoom = null;
                
            },
    
            onAdd: function (map) {
                this._map = map;
                //map.on('viewreset', this._reset, this);/轻量级绘图可打开
                //map.on('move', this._reset, this);
                 map.on('movestart', this._reset, this);
                
                map.on('zoomstart', this._startZoom, this);
                map.on('zoomend', this._endZoom, this);
                if(!map.hasLayer(this.options.layers)){
                    this.options.layers.addTo(map);
                }
                else{
                    this.options.layers.clearLayers();
                }
    
                this._reset();
            },
            _startZoom:function(){
                if(this._map.hasLayer(this.options.layers)){
                    this._map.removeLayer(this.options.layers);
                    
                }
            },
            _endZoom:function(){
                if(!this._map.hasLayer(this.options.layers)){
                    this._map.addLayer(this.options.layers);
                }
                this._reset();
            },
            onRemove: function (map) {
                //map.off('viewreset', this._reset, this);
                //map.off('move', this._reset, this);
                 map.off('movestart', this._reset, this);
                map.removeLayer(this.options.layers)
                map.off('zoomstart', this._startZoom, this);
                map.off('zoomend', this._endZoom, this);
            },
    
            addTo: function (map) {
                map.addLayer(this);
                return this;
            },
            _reset: function () {
                this._draw(true);
            },
            _draw: function () {//在这里绘图
                var self = this,
                    map = this._map;
    
                if ( map) {
                    this.currentzoom = map.getZoom();
                    this.range = this.getXY(this.currentzoom);
                    var feature = null;
                    var angle = null;
                    var value = null;
                    var lon = null;
                    var lat = null;
                    var time = 0;
                    var screenpoint;
                    var level;
                    var color;
                   this.options.layers.clearLayers();//先清空，防止重复
                    var _this=this;
                    for (var i = this.range.up; i <= this.range.down; i++) {
                        for (var j = this.range.left; j <= this.range.right; j++) {
                            this.url = "./data/GZQ/"+ this.currentzoom + "/" + j+"/"+i+ ".geojson";//标准geojson数据
                            $.getJSON(this.url).done(function (result) {//利用jquery访问本地文件
                                var data = result;
                                for (var f = 0; f < result.features.length; f++) {
                                    feature = result.features[f];
                                    var layer=L.geoJSON(feature,{style:function (geoJsonFeature) {
                                        return {opacity:0,fillOpacity:1}
                                    }});

                                    _this.options.layers.addLayer(layer);
                                }
    
                            }).fail(function (e) {
    
                                var a = e;
    
                            })
    
                        }
                    }
                }
            },
            /**
             * 根据缩放级别获取行列号上下限
             */
            getXY:function(zoom){
                var bounds=[14.498378302364229,73.45051018383731,53.559883747749566,135.0941109806583];
                var sXY=TileIndex.toxy(zoom,bounds[1],bounds[0]);
                var eXY=TileIndex.toxy(zoom,bounds[3],bounds[2]);
                return {
                    left: sXY[0],
                    up:eXY[1],
                    right: eXY[0],
                    down:sXY[1] 
                }
            },
        });
    
        L.windTilelayer = function (options) {
            return new L.WindTilelayer(options);
        };
    
    
    }(this, document));
    