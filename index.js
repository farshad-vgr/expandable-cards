const mainContainer1 = document.getElementById("container1"); // Container as the main content
const mainContainer2 = document.getElementById("container2"); // Container as the skeleton loading

const slotsNumber = 5;

// Showing skeleton loading in the slots at first
for (let i = 0; i < slotsNumber; i++) {
	const article = document.createElement("article");
	article.classList.add("panel");

	article.innerHTML = `
	<div id="card">

		<div class="card-content">
			<div class="block1 pulsate"></div>
			<div class="block2 pulsate"></div>
			<div class="block1 pulsate"></div>
			<div style="clear: both;"></div>
		</div>

		<div class="card-image">
			<svg class="fpo" width="84px" height="63px" x="50%" y="50%" viewBox="0 0 84 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch -->
					<title>Shape</title>
					<desc>Created with Sketch.</desc>
					<defs></defs>
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-964.000000, -1012.000000)" fill-opacity="0.06">
							<g id="16---Workpaper-Loading-Copy" transform="translate(836.000000, 909.000000)" fill="#000000">
									<g id="Icons-/-Special-/-RTE-/-Image" transform="translate(100.000000, 67.000000)">
											<g id="Icons-/-RTE-/-ImageSpecial">
													<path d="M108.368088,36.5625 L30.8485565,36.5625 C29.319526,36.5625 28.0800018,37.8216991 28.0800018,39.375 L28.0800018,95.625 C28.0800018,97.1783009 29.319526,98.4375 30.8485565,98.4375 L108.368088,98.4375 C109.897118,98.4375 111.136642,97.1783009 111.136642,95.625 L111.136642,39.375 C111.136642,37.8216991 109.897118,36.5625 108.368088,36.5625 L108.368088,36.5625 Z M105.599533,42.1875 L105.599533,81.225 L96.7678436,68.68125 C96.2965986,68.0076728 95.5575991,67.5787153 94.747102,67.5082962 C93.936605,67.4378771 93.1366348,67.7331229 92.5596405,68.315625 L82.0668182,79.003125 L59.1154999,55.6875 C58.0356599,54.5970274 56.2916778,54.5970274 55.2118378,55.6875 L33.6171112,77.596875 L33.6171112,42.1875 L105.599533,42.1875 L105.599533,42.1875 Z M33.6171112,92.8125 L33.6171112,85.528125 L57.149826,61.621875 L80.1011444,84.9375 C81.1809844,86.0279726 82.9249665,86.0279726 84.0048065,84.9375 L94.1654022,74.64375 L105.599533,90.9 L105.599533,92.8125 L33.6171112,92.8125 L33.6171112,92.8125 Z M77.9139862,56.25 C77.9139862,53.1433983 80.3930345,50.625 83.4510956,50.625 C86.5091566,50.625 88.988205,53.1433983 88.988205,56.25 C88.988205,59.3566017 86.5091566,61.875 83.4510956,61.875 C80.3930345,61.875 77.9139862,59.3566017 77.9139862,56.25 L77.9139862,56.25 Z" id="Shape"></path>
											</g>
									</g>
							</g>
					</g>
			</svg>
		</div>
</div>`;
	
	mainContainer2.append(article);
}

// Fetching data from an URL with this function
async function fetchDate() {
	try {
		const response = await fetch("https://picsum.photos/v2/list"); // Array of 30 objects
		const data = await response.json();

		// Checking response status to be ok
		if (response.ok && response.status === 200) {
			const images = [];

			// Picking 5(number of image slots) projects from the fetched array
			for (let i = 0; i < slotsNumber; i++) {
				let randomImage = data[Math.floor(Math.random() * data.length)];
				images.push(randomImage); // Putting each image into an array
			}

			for (const image of images) {
				const html = `
			            <p>Author: <br> <small>${image.author}<small></p>
			            <a href="${image.url}" target="_blank">Visit Page!</a>
			          `;
				const section = document.createElement("section");
				section.classList.add("show");
				section.innerHTML = html;

				const article = document.createElement("article");
				article.classList.add("panel");
				article.style.backgroundImage = `url('${image.download_url}')`;
				article.style.backgroundSize = "cover";
				article.style.backgroundPosition = "center";
				article.append(section);
				mainContainer1.append(article);

				article.addEventListener("click", () => {
					const cards = [...document.querySelectorAll(".panel")];
					const sections = [...document.querySelectorAll(".panel section")];

					if (article.classList.contains("active")) {
						article.classList.remove("active");

						// Adding "show" class to sections
						for (const section of sections) {
							section.classList.add("show");
						}
					} else {
						// Removing "active" class from cards
						for (const card of cards) {
							card.classList.remove("active");
						}

						article.classList.add("active");

						// Removing "show" class from sections
						for (const section of sections) {
							section.classList.remove("show");
						}

						article.querySelector("section").classList.add("show");
					}
				});
			}
		}
	} catch (error) {
		alert("Fetching Error:\n" + error);
	}
}

// Star fetching data
fetchDate();

// Hiding skeleton loading to show the main content after 5 seconds
setTimeout(() => {
	mainContainer2.style.display = "none";
}, 5000);
