const $ = (el) => document.querySelector(el);
const $$ = (els) => document.querySelectorAll(el);

const imageInput = $("#image-input");
const itemsSection = $("#selector-items");

function createItem(src) {
  const imgElement = document.createElement("img");
  imgElement.draggable = true;
  imgElement.src = src;
  imgElement.className = "item-image";
  imgElement.addEventListener("dragstart", handleDragStart);
  imgElement.addEventListener("dragend", handleDragEnd);
  itemsSection.appendChild(imgElement);
  return imgElement;
}

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (file) {
    const reader = new FileReader();
    reader.onload = (eventReader) => {
      createItem(eventReader.target.result);
    };
    reader.readAsDataURL(file);
  }
});

let draggedElement = null;
let sourceContainer = null;

const rows = $$(".tier .row");

rows.forEach((row) => {
  row.addEventListener("drop", handleDrop);
  row.addEventListener("dragover", handleDragOver);
  row.addEventListener("dragleave", handleDragLeave);
});

function handleDrop(event) {
  event.preventDefault();
  const { currentTarget, dataTransfer } = event;
  console.log(dataTransfer);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave(event) {
  event.preventDefault();
}

function handleDragStart(event) {
  draggedElement = event.target;
  sourceContainer = draggedElement.parentNode;
  event.dataTransfer.setData("text/plain", draggedElement.src);
}

function handleDragEnd(event) {
  draggedElement = null;
  sourceContainer = null;
}
