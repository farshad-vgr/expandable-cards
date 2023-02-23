const mainContainer = document.getElementById("container");

// Fetching data from an URL
async function fetchDate() {
	try {
		const response = await fetch("https://picsum.photos/v2/list"); // Array of 30 objects
		const data = await response.json();

		// Checking response status to be ok
		if (response.ok && response.status === 200) {
      const images = [];
      
      console.log(data);

			// Picking 5(number of image slots) projects from the fetched array
			for (let i = 0; i < 5; i++) {
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
        article.style.backgroundPosition = "center center";
        article.style.backgroundSize = "57rem 31rem"
				article.append(section);
				mainContainer.append(article);

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

fetchDate();
