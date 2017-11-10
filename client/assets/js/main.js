$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  AOS.init();
  // Implement typewriter effect
  const header = document.getElementById('header-text');
  const typewriter = new Typewriter(header, {
    loop: true
  });
  typewriter.typeString('A World Class Online Book Library Application. Borrow A Book Today!')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Read a book today and get energized!')
    .pauseFor(2500)
    .deleteChars(10)
    .typeString('empowered!')
    .start();

  $(window).bind('scroll', () => {
    const scrollAmount = $(window).scrollTop();
    if (scrollAmount === 50) {
      $('.navbar').addClass('');
    }
  });
});
