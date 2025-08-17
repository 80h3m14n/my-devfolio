const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".card");

searchBox.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase(); // search case-insensitive and trim whitespace
  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    const tags = card.getAttribute("data-tags");
    if (text.includes(query) || tags.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
