function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselSlide = document.querySelector('.carousel__slide');

  const slideWidth = carouselSlide.offsetWidth;
  let currentAmount = 0;

  buttonLeft.style.display = 'none';

  buttonRight.addEventListener('click', () => {
    buttonLeft.style.display = '';
    currentAmount -= slideWidth;
    carouselInner.style.transform = `translateX(${currentAmount}px)`;
    if(currentAmount == - (slideWidth * 3)) {
      buttonRight.style.display = 'none';
    }
  });

  buttonLeft.addEventListener('click', () => {
    buttonRight.style.display = '';
    currentAmount += slideWidth;
    carouselInner.style.transform = `translateX(${currentAmount}px)`;
    if(currentAmount == 0) {
      buttonLeft.style.display = 'none';
    }
  });
}
