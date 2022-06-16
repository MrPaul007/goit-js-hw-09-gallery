import galleryItems from "./app.js";

const galeryRef = document.querySelector(".js-gallery");
const closeBtnRef = document.querySelector(".lightbox__button");
const lightBoxRef = document.querySelector(".js-lightbox");
const modalImgRef = document.querySelector(".lightbox__image");
const backdrop = document.querySelector(".lightbox__overlay");

galeryRef.addEventListener("click", onImageClick);
closeBtnRef.addEventListener("click", onCloseModal);
backdrop.addEventListener("click", onBackdropClick);

function renderGalery(galleryItems) {
  return galleryItems
    .map(
      item =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/>
        </a>
      </li>`
    )
    .join("");
}

galeryRef.insertAdjacentHTML("beforeend", renderGalery(galleryItems));

function onImageClick(event) {
  event.preventDefault();

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onRightArrowKeyPress);
  window.addEventListener("keydown", onLeftArrowKeyPress);

  leftSliderRef.addEventListener("click", onLeftSliderClick);
  rightSliderRef.addEventListener("click", onRightSliderClick);

  lightBoxRef.classList.add("is-open");
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onRightArrowKeyPress);
  window.removeEventListener("keydown", onLeftArrowKeyPress);

  leftSliderRef.addEventListener("click", onLeftSliderClick);
  rightSliderRef.addEventListener("click", onRightSliderClick);

  lightBoxRef.classList.remove("is-open");
  modalImgRef.src = "";
  modalImgRef.alt = "";
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

const rightBtnSlider = document.createElement("button");
const leftBtnSlider = document.createElement("button");
rightBtnSlider.type = "button";
leftBtnSlider.type = "button";
rightBtnSlider.dataset.action = "right_slider";
leftBtnSlider.dataset.action = "left_slider";
rightBtnSlider.classList.add("lightbox__button");
rightBtnSlider.classList.add("right-slider");
leftBtnSlider.classList.add("lightbox__button");
leftBtnSlider.classList.add("left-slider");
modalImgRef.before(rightBtnSlider, leftBtnSlider);

const rightSliderRef = document.querySelector(".right-slider");
const leftSliderRef = document.querySelector(".left-slider");

function onLeftSliderClick() {
  let imagesArray = galleryItems.map(item => item.original);
  modalImgRef.src = imagesArray[imagesArray.indexOf(modalImgRef.src) - 1];

  if (imagesArray.indexOf(modalImgRef.src) === -1) {
    modalImgRef.src = imagesArray[imagesArray.length - 1];
  }
}

function onRightSliderClick() {
  let imagesArray = galleryItems.map(item => item.original);
  modalImgRef.src = imagesArray[imagesArray.indexOf(modalImgRef.src) + 1];

  if (imagesArray.indexOf(modalImgRef.src) === -1) {
    modalImgRef.src = imagesArray[0];
  }
}
function onRightArrowKeyPress(event) {
  if (event.code === "ArrowRight") {
    onRightSliderClick();
  }
}

function onLeftArrowKeyPress(event) {
  if (event.code === "ArrowLeft") {
    onLeftSliderClick();
  }
}

console.log("lorem");
