$('#locate_btn').on('tap', function(){

	window.mapReady = function(){
		// Configure and load googlemap
		var gmapOption = {
    	zoom: 1,
    	disableDefaultUI: true
		};
		$('#map').gmap({styles : gmapStyle, options : gmapOption}).bind('init', function(evt, map) {
			$('#map').gmap('getCurrentPosition', function(position, status) {
				console.log(status);
				console.log(position);
				if ( status === 'OK' ) {

					var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

					$('#map').gmap({ 'center': clientPosition});

					$('#map').gmap('addMarker', {'position': clientPosition, 'bounds': true});
					$('#map').gmap('addShape', 'Circle', { 
						'strokeWeight': 0, 
						'fillColor': "#008595", 
						'fillOpacity': 0.25, 
						'center': clientPosition, 
						'radius': 15, 
						'clickable': false 
					});
				}
			});


		});;
	};

	// Load the map
	if ($('#maps-script').length == 0 ){
		var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.id = 'maps-script';
	  script.src = 'http://maps.google.com/maps/api/js?key=AIzaSyDhqfIrHOS8asivf_Jy_0wkHRA0pP9YjMM&sensor=true&' +
	    'callback=mapReady';
		//callback is the name of function to call once map script loaded
		document.body.appendChild(script);
	}
});