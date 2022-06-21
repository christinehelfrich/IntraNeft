
const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);


// CAROUSEL 



/*
let slideIndex = 0;

let collections = document.getElementsByClassName("slideshow-container")


function showSlides() {
  let collectionNamesElements = document.getElementsByClassName('theColTitle');
  let collectionName = "";
  for (let collection of collectionNamesElements) {
    collectionName = collection.innerHTML
    let i;
    let slides = document.getElementsByClassName(collectionName);
    
    for (i = 0; i < slides.length; i++) {
  
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
  }

  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
*/


let slideIndex = 1;

let collectionNamesElements = document.getElementsByClassName('theColTitle');
let collectionName = "";
for (let collection of collectionNamesElements) {
  collectionName = collection.innerHTML
  showSlides(slideIndex, collectionName);
}

// Next/previous controls
function plusSlides(n, e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  let collectionTitle = target.id;
  showSlides(slideIndex += n, collectionTitle);
}


// Thumbnail image controls
function currentSlide(n, e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  let collectionTitle = target.id;
  showSlides(slideIndex = n, collectionTitle);
}

function showSlides(n, collectionTitle) {
  let i;
  let slides = document.getElementsByClassName(collectionTitle);

  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


