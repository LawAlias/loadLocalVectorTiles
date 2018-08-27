var TileIndex={
    /**
     * 根据缩放级别和经纬度计算Google规则瓦片号
     */
    toxy:function (zoom,vlong,vlat) {
        var xlong = this.long2tile(vlong,zoom);
        var ylat = this.lat2tile(vlat,zoom);
        return [xlong,ylat];
        },
    /**
     * 根据缩放级别和经纬度计算TMS规则瓦片编号
     */
    totilexy: function (zoom,vlong,vlat) {
        var tilex = this.long2tileX(vlong,zoom);
        var tiley = this.lat2tileY(vlat,zoom);
        return [tilex,tiley];
        },
        
    tolonlat:function (vzoom,xlong,ylat) {
        var long = this.tile2long(xlong,vzoom);
        var lat = this.tile2lat(ylat,vzoom);
        return [long,lat]
        },
        
    long2tile:function (lon,zoom1) { 
        tt = Number(lon);
        return (Math.floor((tt+180)/360*Math.pow(2,zoom1)));
        },
        
    lat2tile:function (lat,zoom2)  { 
        return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom2))); 
        },
        
    long2tileX:function (lon,zoom1) { 
        tt = Number(lon);
        return (Math.floor((tt+180)/360*Math.pow(2,zoom1)));
        },
        
    lat2tileY:function (lat,zoom2)  { 
        return ((1 << zoom2)-(Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom2)))-1); 
        },
    /**
     * 获取瓦片中心经度
     */
    tile2long:function (x,z) {
          return (x/Math.pow(2,z)*360-180);
         },
    /**
     * 获取瓦片中心纬度
     */ 
    tile2lat:function (y,z) {
          var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
          return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
         }
}