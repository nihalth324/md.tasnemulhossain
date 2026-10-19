const albumCards = [...document.querySelectorAll(".album-photo")];
const albumFilters = [...document.querySelectorAll(".album-filter")];
const viewer = document.querySelector(".photo-viewer");
const viewerImage = viewer.querySelector("figure img");
const viewerCaption = viewer.querySelector("figcaption");
const viewerCounter = viewer.querySelector(".photo-viewer__counter");
const imageItems = albumCards.map((card) => ({
  source: card.querySelector("img").src,
  alt: card.querySelector("img").alt,
  caption: card.querySelector("figcaption span:first-child").textContent
}));
let activeImage = 0;

albumFilters.forEach((button) => button.addEventListener("click", () => {
  const category = button.dataset.albumFilter;
  albumFilters.forEach((filter) => {
    const selected = filter === button;
    filter.classList.toggle("is-active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  });
  albumCards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}));

function showImage(index) {
  activeImage = (index + imageItems.length) % imageItems.length;
  const item = imageItems[activeImage];
  viewerImage.src = item.source;
  viewerImage.alt = item.alt;
  viewerCaption.textContent = item.caption;
  viewerCounter.textContent = `${String(activeImage + 1).padStart(2, "0")} / ${String(imageItems.length).padStart(2, "0")}`;
}

document.querySelectorAll(".album-photo__open").forEach((button) => {
  button.addEventListener("click", () => {
    showImage(Number(button.dataset.index));
    viewer.showModal();
  });
});
viewer.querySelector(".photo-viewer__close").addEventListener("click", () => viewer.close());
viewer.querySelector(".photo-viewer__previous").addEventListener("click", () => showImage(activeImage - 1));
viewer.querySelector(".photo-viewer__next").addEventListener("click", () => showImage(activeImage + 1));
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showImage(activeImage - 1);
  if (event.key === "ArrowRight") showImage(activeImage + 1);
  if (event.key === "Escape") {
    event.preventDefault();
    viewer.close();
  }
});