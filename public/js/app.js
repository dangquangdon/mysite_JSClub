// Select DOM elements
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');
const nav = document.querySelector('.nav');
const navBrand = document.querySelector('.nav-brand');

const navItems = document.querySelectorAll('.nav-item');

// Add event listener
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  menuBtn.classList.toggle('close');
  mainNav.classList.toggle('show');
  nav.classList.toggle('show');
  navBrand.classList.toggle('show');

  navItems.forEach(item => {
    item.classList.toggle('show');
  });
}

/*
 * Current year in footer
 */

const this_year = new Date().getFullYear();
const yearTag = document.getElementById('year');
if (yearTag) {
  yearTag.innerHTML = this_year;
}

/*
 * Dropdown button when user logged in
 */
const dropdown = document.getElementById('dropdown');
const navDropdown = document.querySelector('.nav-dropdown');

dropdown.addEventListener('click', openDropdown);

function openDropdown() {
  navDropdown.classList.toggle('hide');
}
