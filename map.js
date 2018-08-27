var initMap=function(containerId){
    var map=L.map(containerId,
      // {preferCanvas:true}
    ).setView([37,120], 4);;
    var baseLayer=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'});
    baseLayer.addTo(map);
  var vector=new L.WindTilelayer();
  vector.addTo(map);
  
}