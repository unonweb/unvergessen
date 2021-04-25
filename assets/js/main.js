let unvergessen = {};

unvergessen.init = function() {

	/* --- GALLERY --- */

	let arrLeft = document.getElementById('gallery__arrow-left');
	let arrRight = document.getElementById('gallery__arrow-right');
	let posterWrap = document.getElementById('gallery__wrapper');
	// other:
	let scrollAmount = 50;

	// scroll poster gallery using arrows:
	arrLeft.onclick = unvergessen.handleArrow(posterWrap, scrollAmount, "-");
	arrRight.onclick = unvergessen.handleArrow(posterWrap, scrollAmount, "+");
	// scroll poster gallery using mouse wheel:
	posterWrap.onwheel = unvergessen.handleScrollX(posterWrap);

	// make gallery posters clickable
	// a click causes the map to jump to the corresponding coords 
	let postersGallery = document.getElementsByClassName('gallery__poster');

	for (p of postersGallery) {
		let lon = p.getAttribute("data-lon");
		let lat = p.getAttribute("data-lat");
		p.onclick = () => {
			leaflet.map.setView({
				lon: lon, 
				lat: lat,
			}, 11);
		}
	}

	/* --- MAP --- */

	// make posters a link to individual sites
	/*
	let postersMap = document.getElementsByClassName('map__poster');
	for (p of postersMap) {
		let dest = p.getAttribute("data-link");
		//console.log(`Poster dest: ${dest}`);
		p.onclick = () => {
			window.location.assign(dest)
		}
	}
	*/

	// push popups into foreground/background:
	let popups = document.getElementsByClassName('leaflet-popup');
	for (p of popups) {
		p.onclick = unvergessen.handleFrontBack(p, popups);
	}
	
}

unvergessen.handleFrontBack = function(el, others = []) {
	return function(evt) {
	// eventHandler
		// pull it into the foreground:
		el.style.zIndex = 2;
		// push the others back
		for (let other of others) {
			if (other == el) continue; // jump to next if it's the element clicked
			other.style.zIndex = 1;
		}
	}
}

unvergessen.handleArrow = function(dest, amount, dir = "+") {
	return function(evt) {
		if (dir === "+") dest.scrollLeft += amount;
		if (dir === "-") dest.scrollLeft -= amount;
	}
}

unvergessen.handleScrollX = function(dest) {

	return function (evt) {
		evt.preventDefault();
		console.log('evt.deltaY: ', evt.deltaY);
		dest.scrollLeft += evt.deltaY * 5;
	};
}

let leaflet = {

	// requires:
	// https://unpkg.com/leaflet@1.7.1/dist/leaflet.css
	// https://unpkg.com/leaflet@1.7.1/dist/leaflet.js
}

leaflet.init = function(mapElementId) {
	// initialize Leaflet
	leaflet.map = L.map(mapElementId);
	leaflet.map.setView([47.6854, 9.8332], 10);

	// add the OpenStreetMap tiles
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	}).addTo(leaflet.map);

	// show the scale bar on the lower left corner
	L.control.scale().addTo(leaflet.map);
	
}

leaflet.ui = function() {

	/* --- MARKERS / POPUPS --- */

	for (murder of murders) {
		
		/* --- HTML content of popups --- */

		let htmlWrapOpen = `<div class="map__poster" data-link="${murder.url}">`;
		let hmtlWrapClose = `</div>`;
		let htmlPerson = "";

		for (let i = 0; i < murder.name.length; i++) {
			if (murder.name[i])	htmlPerson += `<div class="map__person-name">${murder.name[i]}</div>`;
			if (murder.age[i]) htmlPerson += `<div class="map__person-age">${murder.age[i]} Jahre</div>`;
		}
		htmlPerson += `<hr>`

		let htmlPlaceTime = `
			<table>
				<tr>
					<th>Tatort:</th>
					<td>${murder.place}</td>
				</tr>
				<tr>
					<th>Datum:</th>
					<td>${murder.date}</td>
				</tr>
				<tr>
					<th>Info:</th>
					<td><a href="${murder.url}">Link</a></td>
				</tr>
			</table>`;

		/* --- create popups --- */

		let popup = L.popup({
			autoClose: false,
			closeButton: false,
		})
		
		popup.setContent(htmlWrapOpen + htmlPerson + htmlPlaceTime + hmtlWrapClose)
		popup.setLatLng({lon: murder.lon, lat: murder.lat})
		popup.openOn(leaflet.map);

		
		//let tooltip = L.tooltip()
		/*
		let marker = L.marker(
			{
				lon: murder.lon, 
				lat: murder.lat
			},
			{
				title: murder.name,
				alt: "A marker on a map",
				riseOnHover: true,
			})
		
		marker.addTo(leaflet.map);
		marker.bindPopup(popup).openPopup();
		//marker.bindToolTip("my tooltip text").openTooltip();
		*/
	}
}

try {
	
	let id1 = 'map-leaflet';
	if (document.getElementById(id1)) {
		console.log(`Element with ID ${id1} found.`);
		leaflet.init(id1);
		leaflet.ui();
	} else {
		throw Error(`No element with ID ${id1} found.`)
	}

	unvergessen.init();

} catch (err) {
	console.warn(err.stack)
}



/* leaflet.locations = [
	{
		name: "Martin Katschker",
		age: 17,
		place: "Konstanz",
		date: "29.08.1970",
		lat: 47.6589,
		lon: 9.1719,
		link: "https://unvergessen.unon.app/murders/martin-katschker.html"
	},
	{
		name: "Sydi Battal Koparan",
		age: 44,
		place: "Ludwigsburg",
		date: "01.01.1981",
		lat: 48.8951,
		lon: 9.1895
	},
	{
		name: "Kiomars Javadi",
		age: 20,
		place: "Tübingen",
		date: "19.08.1987",
		lat: 48.5234,
		lon: 9.0529
	},
	{
		name: "Eberhard Arnold",
		age: 23,
		place: "Ludwigsburg",
		date: "21.10.1990",
		lat: 47.6854,
		lon: 9.8344
	},
	{
		name: "Agostinho Comboio",
		age: 34,
		place: "Wangen im Allgäu",
		date: "19.06.1991",
		lat: 47.6854,
		lon: 9.8344
	},
	{
		name: "Sadri Berisha",
		age: 57,
		place: "Kemnat",
		date: "07.07.1992",
		lat: 48.7189,
		lon: 9.2313
	},
	{
		name: "unbekannt",
		age: 24,
		place: "Stuttgart",
		date: "16.03.1994",
		lat: 48.7758,
		lon: 9.1798
	},
	{
		name: "Werner Weickum",
		age: 44,
		place: "Eppingen",
		date: "19.07.1996",
		lat: 49.1362,
		lon: 8.9111
	},
	{
		name: "Arthur Lampel",
		age: 17,
		place: "Bräunlingen",
		date: "08.09.2001",
		lat: 47.9290,
		lon: 8.4481
	},
	{
		name: ["Viktor Filimonovim", "Waldemar Ickert", "Aleksander Schleicher"],
		age: [15, 16, 17],
		place: "Heidenheim",
		date: "19.12.2003",
		lat: 48.6765,
		lon: 10.1551
	},
	{
		name: "unbekannt",
		place: "Stuttgart",
		date: "??.01.2005",
		lat: 48.7758,
		lon: 9.1798
	},
	{
		name: "Tim Maier",
		age: 20,
		place: "Bad Buchau",
		date: "26.11.2005",
		lat: 48.0635,
		lon: 9.6107
	},
	{
		name: "Michèle Kiesewetter",
		age: 22,
		place: "Heilbronn",
		date: "25.07.2007",
		lat: 49.1420,
		lon: 9.2188
	},
	{
		name: "unbekannt",
		age: 64,
		place: "Ulm",
		date: "23.05.2017",
		lat: 48.3972,
		lon: 9.9940
	},
]

*/