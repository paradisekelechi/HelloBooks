(function ($) {
  $.fn.parallax = function () {
    let window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      const $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        let container_height;
        if (window_width < 601) {
          container_height = ($this.height() > 0) ? $this.height() : $this.children('img').height();
        } else {
          container_height = ($this.height() > 0) ? $this.height() : 500;
        }
        const $img = $this.children('img').first();
        const img_height = $img.height();
        const parallax_dist = img_height - container_height;
        const bottom = $this.offset().top + container_height;
        const top = $this.offset().top;
        const scrollTop = $(window).scrollTop();
        const windowHeight = window.innerHeight;
        const windowBottom = scrollTop + windowHeight;
        const percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        const parallax = Math.round((parallax_dist * percentScrolled));

        if (initial) {
          $img.css('display', 'block');
        }
        if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
          $img.css('transform', `translate3D(-50%,${parallax}px, 0)`);
        }
      }

      // Wait for image load
      $this.children('img').one('load', () => {
        updateParallax(true);
      }).each(function () {
        if (this.complete) $(this).trigger('load');
      });

      $(window).scroll(() => {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(() => {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };
}(jQuery));
