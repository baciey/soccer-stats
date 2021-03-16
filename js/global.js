const mainButtons = document.querySelectorAll(
  ".standings .buttons button.main-btn"
);
mainButtons.forEach((el) => {
  el.addEventListener("click", () => addClasses(mainButtons, el));
});

const totalHomeAwayButtons = document.querySelectorAll(
  ".standings .total-home-away button"
);

totalHomeAwayButtons.forEach((el) => {
  el.addEventListener("click", () => addClasses(totalHomeAwayButtons, el));
});

function addClasses(buttons, target) {
  // console.log(target);
  buttons.forEach((el) => {
    el.classList.remove("active");
  });
  target.classList.add("active");
}

function renderCategory(category) {
  const section = document.querySelector("div." + category);
  const sections = document.querySelectorAll(".section");
  sections.forEach((el) => {
    el.classList.remove("active");
  });

  section.classList.add("active");
}
