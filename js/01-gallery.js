import { galleryItems } from "./gallery-items.js";
const galleryList = document.querySelector(".gallery");
let instance = {};
galleryList.innerHTML = createGalleryMarkup(galleryItems);
galleryList.addEventListener("click", clickImage);
function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function clickImage(e) {
  const galleryClickedImage = e.target;
  const originalImageLink = galleryClickedImage.dataset.source;
  const originalImageLAlt = galleryClickedImage.alt;
  e.preventDefault();
  if (galleryClickedImage.nodeName != "IMG") {
    return;
  }
  openModal(originalImageLink, originalImageLAlt);
}

function openModal(link, alt) {
  instance = basicLightbox.create(`	<img src="${link}" alt="${alt}"/>`);
  instance.show();
  window.addEventListener("keydown", OnEscape);
}

function closeModal() {
  instance.close();
  window.removeEventListener("keydown", OnEscape);
}

function OnEscape(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}
