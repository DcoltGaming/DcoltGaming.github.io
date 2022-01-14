/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 *
 */
let sections = document.getElementsByTagName("section");

/**
 * End Global Variables
 */

// Build the dynamic navigation bar
let ul = document.getElementById("navbar__list");

for (let i = 0; i < sections.length; i++) {
  selectedHeader = document
    .getElementById(sections[i].id)
    .getElementsByClassName("landing__container")[0]
    .querySelector("h2").innerText;

  let li = document.createElement("li");
  let a = document.createElement("a");

  let stringFix = selectedHeader.replace(/\s/g, ""); //Removes the spaces in the header id

  a.setAttribute("href", "#" + stringFix.toLowerCase());
  a.appendChild(document.createTextNode(selectedHeader + " "));

  li.setAttribute("id", stringFix.toLowerCase() + "MI");
  li.appendChild(a);
  ul.appendChild(li);
}

// Add class 'active' to section when near top of viewport

let isScrolledIntoView = (element) => {
  var boundingRect = element.getBoundingClientRect();

  let style = window.getComputedStyle(element);

  //Takes into account the margin sizes the element
  let marginLeft = parseInt(style["margin-left"]);
  let marginRight = parseInt(style["margin-right"]);
  let marginTop = parseInt(style["margin-top"]);
  let marginBottom = parseInt(style["margin-bottom"]);

  let rectLeft = boundingRect.left - marginLeft;
  let rectRight = boundingRect.right - marginRight;
  let rectTop = boundingRect.top - marginTop;
  let rectBottom = boundingRect.bottom - marginBottom;

  return (
    rectBottom >= 0 &&
    rectRight >= 0 &&
    rectTop <= (window.innerHeight || document.documentElement.clientHeight) &&
    rectLeft <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

let all = document.getElementsByTagName("*");

document.addEventListener(
  "scroll",
  (event) => {
    for (let index = 0; index < all.length; index++) {
      isInViewPort = isScrolledIntoView(all[index]);

      if (isInViewPort) {
        let currentElementInViewPort = all[index].id;

        if (currentElementInViewPort.includes("section")) {
          document;

          let li = document
            .getElementById("navbar__list")
            .getElementsByTagName("li");

          for (i = 0; i < li.length; i++) {
            let stringFix = li[i].innerText.replace(/\s/g, "");

            if (stringFix.toLowerCase() == currentElementInViewPort) {
              document.getElementById(li[i].id).classList.add("active");
            } else {
              document.getElementById(li[i].id).classList.remove("active");
            }
          }
        }
      }
    }
  },
  { passive: true }
);

// Scroll to anchor ID using scrollTO event

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behaviour: "smooth",
    });
  });
});

//Scroll to Top Button
scrollToTopButton = document.getElementById("scrollToTopBttn");
window.onscroll = function () {
  scrollFunc();
};

let scrollFunc = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
};

let scrollToTopFunc = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

//Collapisble sections
let collapsibleButtons = document.getElementsByClassName(
  "collapsibleSectionButton"
);

let toggleFunction = (element) => {
  element.classList.toggle("activeCollapsible");
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
};

//Loop through all the section elements and create a button for them dynamically
for (let i = 0; i < sections.length; i++) {
  let toggleButton = document.createElement("button");
  console.log(sections[i].innerHTML[0]);
  toggleButton.innerHTML =
    sections[i].getElementsByTagName("h2")[0].innerText + " toggle";
  toggleButton.id = sections[i].id + "toggleSection";
  toggleButton.classList.add("collapsibleSectionButton");

  sections[i].parentNode.insertBefore(toggleButton, sections[i]);
  document.getElementById(sections[i].id).style.display = "block";

  //Add an event listener to those buttons to run a function when the button is clicked
  toggleButton.addEventListener("click", function () {
    this.classList.toggle("activeCollapsible");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
