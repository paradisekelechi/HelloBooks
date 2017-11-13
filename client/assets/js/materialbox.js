(function ($) {
  $.fn.materialbox = function () {
    return this.each(function () {
      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      let overlayActive = false;
      let doneAnimating = true;
      const inDuration = 275;
      const outDuration = 200;
      const origin = $(this);
      const placeholder = $('<div></div>').addClass('material-placeholder');
      const originalWidth = 0;
      const originalHeight = 0;
      let ancestorsChanged;
      let ancestor;
      const originInlineStyles = origin.attr('style');
      origin.wrap(placeholder);


      // Start click handler
      origin.on('click', () => {
        const placeholder = origin.parent('.material-placeholder');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const originalWidth = origin.width();
        const originalHeight = origin.height();


        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        } else if (overlayActive && doneAnimating === true) {
          returnToOriginal();
          return false;
        }


        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder
        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0
        });

        // Find ancestor with overflow: hidden; and remove it
        ancestorsChanged = undefined;
        ancestor = placeholder[0].parentNode;
        const count = 0;
        while (ancestor !== null && !$(ancestor).is(document)) {
          const curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (ancestorsChanged === undefined) {
              ancestorsChanged = curr;
            } else {
              ancestorsChanged = ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }

        // Set css on origin
        origin.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        })
          .data('width', originalWidth)
          .data('height', originalHeight);

        // Add overlay
        const overlay = $('<div id="materialbox-overlay"></div>')
          .css({
            opacity: 0
          })
          .click(() => {
            if (doneAnimating === true) { returnToOriginal(); }
          });

        // Put before in origin image to preserve z-index layering.
        origin.before(overlay);

        // Set dimensions if needed
        const overlayOffset = overlay[0].getBoundingClientRect();
        overlay.css({
          width: windowWidth,
          height: windowHeight,
          left: -1 * overlayOffset.left,
          top: -1 * overlayOffset.top
        });

        // Animate Overlay
        overlay.velocity(
          { opacity: 1 },
          { duration: inDuration, queue: false, easing: 'easeOutQuad' }
        );

        // Add and animate caption if it exists
        if (origin.data('caption') !== '') {
          const $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ display: 'inline' });
          $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });
        }

        // Resize Image
        let ratio = 0;
        const widthPercent = originalWidth / windowWidth;
        const heightPercent = originalHeight / windowHeight;
        let newWidth = 0;
        let newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth / originalHeight;
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if (origin.hasClass('responsive-img')) {
          origin.velocity({ 'max-width': newWidth, width: originalWidth }, {
            duration: 0,
            queue: false,
            complete() {
              origin.css({ left: 0, top: 0 })
                .velocity(
                  {
                    height: newHeight,
                    width: newWidth,
                    left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                    top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
                  },
                  {
                    duration: inDuration,
                    queue: false,
                    easing: 'easeOutQuad',
                    complete() { doneAnimating = true; }
                  }
                );
            } // End Complete
          }); // End Velocity
        } else {
          origin.css('left', 0)
            .css('top', 0)
            .velocity(
              {
                height: newHeight,
                width: newWidth,
                left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
              },
              {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad',
                complete() { doneAnimating = true; }
              }
            ); // End Velocity
        }

        // Handle Exit triggers
        $(window).on('scroll.materialbox', () => {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(window).on('resize.materialbox', () => {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(document).on('keyup.materialbox', (e) => {
          // ESC key
          if (e.keyCode === 27 &&
              doneAnimating === true &&
              overlayActive) {
            returnToOriginal();
          }
        });
      }); // End click handler


      // This function returns the modaled image to the original spot
      function returnToOriginal() {
        doneAnimating = false;

        const placeholder = origin.parent('.material-placeholder');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const originalWidth = origin.data('width');
        const originalHeight = origin.data('height');

        origin.velocity('stop', true);
        $('#materialbox-overlay').velocity('stop', true);
        $('.materialbox-caption').velocity('stop', true);

        // disable exit handlers
        $(window).off('scroll.materialbox');
        $(document).off('keyup.materialbox');
        $(window).off('resize.materialbox');

        $('#materialbox-overlay').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false,
          easing: 'easeOutQuad',
          complete() {
            // Remove Overlay
            overlayActive = false;
            $(this).remove();
          }
        });

        // Resize Image
        origin.velocity(
          {
            width: originalWidth,
            height: originalHeight,
            left: 0,
            top: 0
          },
          {
            duration: outDuration,
            queue: false,
            easing: 'easeOutQuad',
            complete() {
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });

              origin.removeAttr('style');
              origin.attr('style', originInlineStyles);

              // Remove class
              origin.removeClass('active');
              doneAnimating = true;

              // Remove overflow overrides on ancestors
              if (ancestorsChanged) {
                ancestorsChanged.css('overflow', '');
              }
            }
          }
        );

        // Remove Caption + reset css settings on image
        $('.materialbox-caption').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false,
          easing: 'easeOutQuad',
          complete() {
            $(this).remove();
          }
        });
      }
    });
  };

  $(document).ready(() => {
    $('.materialboxed').materialbox();
  });
}(jQuery));
