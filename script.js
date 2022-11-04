const cards = [...document.querySelectorAll(".panel")];
const sections = [...document.querySelectorAll(".panel section")];

for (const card of cards) {
  card.addEventListener("click", () => {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      addShowClass();
    } else {
      removeActiveClass();
      card.classList.add("active");
      removeShowClass();
      card.querySelector("section").classList.add("show");
    }
  });
}

for (const section of sections) {
  section.classList.add("show");
}

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
