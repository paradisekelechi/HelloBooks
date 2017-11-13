(function ($) {
  const methods = {

    init(options) {
      const defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function () {
        // For each slider, we want to keep track of
        // which slide is active and its associated content
        const $this = $(this);
        const $slider = $this.find('ul.slides').first();
        const $slides = $slider.find('> li');
        let $active_index = $slider.find('.active').index();
        let $active, $indicators, $interval;
        if ($active_index != -1) { $active = $slides.eq($active_index); }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass('center-align')) {
            caption.velocity({ opacity: 0, translateY: -100 }, { duration, queue: false });
          } else if (caption.hasClass('right-align')) {
            caption.velocity({ opacity: 0, translateX: 100 }, { duration, queue: false });
          } else if (caption.hasClass('left-align')) {
            caption.velocity({ opacity: 0, translateX: -100 }, { duration, queue: false });
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length - 1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({ opacity: 0 }, {
              duration: options.transition,
              queue: false,
              easing: 'easeOutQuad',
              complete() {
                $slides.not('.active').velocity({ opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              }
            });
            captionTransition($caption, options.transition);


            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
            $slides.eq(index).find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, {
              duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'
            });
            $slides.eq(index).addClass('active');


            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          } else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }


        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          const placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', `url("${$(this).attr('src')}")`);
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each((index) => {
            const $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              const $parent = $slider.parent();
              const curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(() => {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        } else {
          $slides.first().addClass('active').velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(() => {
          $active.find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
        });

        // auto scroll
        $interval = setInterval(() => {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        }, options.transition + options.interval);


        // HammerJS, Swipe navigation

        // Touch Event
        let panning = false;
        let swipeLeft = false;
        let swipeRight = false;

        $this.hammer({
          prevent_default: false
        }).on('pan', (e) => {
          if (e.gesture.pointerType === 'touch') {
            // reset interval
            clearInterval($interval);

            const direction = e.gesture.direction;
            const x = e.gesture.deltaX;
            const velocityX = e.gesture.velocityX;
            const velocityY = e.gesture.velocityY;

            $curr_slide = $slider.find('.active');
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({ translateX: x }, { duration: 50, queue: false, easing: 'easeOutQuad' });
            }

            // Swipe Left
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
              swipeLeft = true;
            }

            // Make Slide Behind active slide visible
            let next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1 }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1 }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
          }
        }).on('panend', (e) => {
          if (e.gesture.pointerType === 'touch') {
            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft || $slides.length <= 1) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0 }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({ translateX: -1 * $this.innerWidth() }, {
                duration: 300,
                queue: false,
                easing: 'easeOutQuad',
                complete() {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                }
              });
            } else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({ translateX: $this.innerWidth() }, {
                duration: 300,
                queue: false,
                easing: 'easeOutQuad',
                complete() {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                }
              });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(() => {
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);
            }, options.transition + options.interval);
          }
        });

        $this.on('sliderPause', () => {
          clearInterval($interval);
        });

        $this.on('sliderStart', () => {
          clearInterval($interval);
          $interval = setInterval(() => {
            $active_index = $slider.find('.active').index();
            if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
            else $active_index += 1;

            moveToSlide($active_index);
          }, options.transition + options.interval);
        });

        $this.on('sliderNext', () => {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', () => {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });
      });
    },
    pause() {
      $(this).trigger('sliderPause');
    },
    start() {
      $(this).trigger('sliderStart');
    },
    next() {
      $(this).trigger('sliderNext');
    },
    prev() {
      $(this).trigger('sliderPrev');
    }
  };


  $.fn.slider = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    }
    $.error(`Method ${methodOrOptions} does not exist on jQuery.tooltip`);
  }; // Plugin end
}(jQuery));
