const mainContainer = document.getElementById("container");

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://picsum.photos/v2/list");

xhr.onload = function () {
  if (xhr.status == 200) {
    const images = JSON.parse(xhr.responseText).splice(10, 5);

    for (const image of images) {
      const html = `
            <p>Author: <br> ${image.author}</p>
            <a href="${image.url}" target="_blank">visit page!</a>
          `;

      const section = document.createElement("section");
      section.classList.add("show");
      section.innerHTML = html;

      const article = document.createElement("article");
      article.classList.add("panel");
      article.style.backgroundImage = `url('${image.download_url}')`;

      article.append(section);
      mainContainer.append(article);

      article.addEventListener("click", () => {
        const cards = [...document.querySelectorAll(".panel")];
        const sections = [...document.querySelectorAll(".panel section")];

        function removeActiveClass() {
          for (const card of cards) {
            card.classList.remove("active");
          }
        }

        function removeShowClass() {
          for (const section of sections) {
            section.classList.remove("show");
          }
        }

        function addShowClass() {
          for (const section of sections) {
            section.classList.add("show");
          }
        }

        if (article.classList.contains("active")) {
          article.classList.remove("active");
          addShowClass();
        } else {
          removeActiveClass();
          article.classList.add("active");
          removeShowClass();
          article.querySelector("section").classList.add("show");
        }
      });
    }
  }
};

xhr.send();
