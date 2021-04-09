let posters = document.getElementsByClassName('poster');
for (p of posters) {
	let dest = p.getAttribute("data-link");
	console.log(`Poster dest: ${dest}`);
	p.onclick = () => {
		window.location.assign(dest)
	}
}
