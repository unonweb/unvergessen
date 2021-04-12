/* --- GLOBAL VARIABLES --- */

// elements

let arrLeft = document.getElementById('arrow-left');
let arrRight = document.getElementById('arrow-right');
let posterWrap = document.getElementById('poster-wrapper');
let posters = document.getElementsByClassName('poster');

/* --- EVENT LISTENERS --- */

// make posters a link to individual sites
for (p of posters) {
	let dest = p.getAttribute("data-link");
	//console.log(`Poster dest: ${dest}`);
	p.onclick = () => {
		window.location.assign(dest)
	}
}

let scrollAmount = 300;

// scroll poster gallery using arrows
arrLeft.onclick = handleArrow(posterWrap, scrollAmount, "+");
arrRight.onclick = handleArrow(posterWrap, scrollAmount, "-");
// scroll poster gallery using mouse wheel
posterWrap.onwheel = handleScrollX(posterWrap);


function handleArrow(dest, amount, dir = "+") {
	return function(evt) {
		if (dir === "+") dest.scrollLeft += amount;
		if (dir === "-") dest.scrollLeft -= amount;
	}
}

function handleScrollX(dest) {

	return function (evt) {
		evt.preventDefault();
		console.log('evt.deltaY: ', evt.deltaY);
		dest.scrollLeft += evt.deltaY * 5;
	};
}

// testme