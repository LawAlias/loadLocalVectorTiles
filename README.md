# loadLocalVectorTiles
加载使用TileStache（谷歌瓦片规则）切割出的矢量瓦片实例

图片丢失，原文请戳：https://blog.csdn.net/jin80506/article/details/100974724


以下可以不看：

一、相同点：
首先二者的缩放级别zoom和瓦片数量都遵循下列表格，读者脑海中想必已经有画面了


看完这个表格，我们总结出三个公式：
公式1：瓦片总数=2^2*zoom
公式2:y轴总行数即y轴瓦片总数=2^zoom
公式3:x轴总行数即x轴瓦片总数=2^zoom
记住这三个公式，之后要用。
二、不同点：
区别只有一个，就是谷歌的原点（x,y=0,0）在直角坐标系左上角（如下图），而tms在右上角，反映在计算时就是它们的经纬度转行列号之后行值y不同

接下来放上计算公式：
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
区别主要在lat2tile和lat2tileY 两个计算行值的公式，我们可以看到tms的行值=2^zoom（y轴总行数，见公式二）-谷歌行值-1
无论什么坐标系都要在此转成米制的平面坐标系（web墨卡托），然后根据屏幕分辨率即一像素对应的实际多少米，瓦片长宽，瓦片数来计算。
源代码戳：
https://github.com/LawAlias/loadLocalVectorTiles

看完这个表格，我们总结出三个公式：
公式1：瓦片总数=2^2*zoom
公式2:y轴总行数即y轴瓦片总数=2^zoom
公式3:x轴总行数即x轴瓦片总数=2^zoom
记住这三个公式，之后要用。
二、不同点：
区别只有一个，就是谷歌的原点（x,y=0,0）在直角坐标系左上角（如下图），而tms在右上角，反映在计算时就是它们的经纬度转行列号之后行值y不同

接下来放上计算公式：
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
区别主要在lat2tile和lat2tileY 两个计算行值的公式，我们可以看到tms的行值=2^zoom（y轴总行数，见公式二）-谷歌行值-1
无论什么坐标系都要在此转成米制的平面坐标系（web墨卡托），然后根据屏幕分辨率即一像素对应的实际多少米，瓦片长宽，瓦片数来计算。

