'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(element => {
  element.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log("&&&&&&&&&&&&&&&&&&&&&");
  console.log(btnScrollTo.getBoundingClientRect());
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll(X/Y) ', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }

})

// menu fade 

const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    sibling.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
        console.log(this);
      }
    })
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.7));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const height = nav.getBoundingClientRect.height;

const obsCallback = function (entry) {
  const [ent] = entry;
  nav.classList.toggle('sticky', !ent.isIntersecting);
  // console.log(ent);
  // console.log(entry);
  // console.log(ent.isIntersecting);
}

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`

}
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

headerObserver.observe(header);

// revealSection

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)
  }
  // console.log(entry.target);
  // console.log(entries);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach((entry) => {
  sectionObserver.observe(entry);
  entry.classList.add('section--hidden');
});

//Lazy loading images

const loadImg = function (entries, observer) {
  console.log(entries);
  const [entry] = entries;

  if (!entry.isIntersecting) return 0;
  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '150px'
})

const imgTargets = document.querySelectorAll('img');

imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    })
}
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  }
  else {
    curSlide++;
  }
  goToSlide(curSlide);
}

const preSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  }
  else {
    curSlide--;
  }
  goToSlide(curSlide);
}
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    preSlide();
  }
  e.key === 'ArrowRight' && nextSlide();
})
