(function ($) {
  $.fn.tooltip = function (options) {
    let timeout = null,
      margin = 5;

      // Defaults
    const defaults = {
      delay: 350,
      tooltip: '',
      position: 'bottom',
      html: false
    };

      // Remove tooltip from the activator
    if (options === 'remove') {
      this.each(function () {
        $(`#${$(this).attr('data-tooltip-id')}`).remove();
        $(this).removeAttr('data-tooltip-id');
        $(this).off('mouseenter.tooltip mouseleave.tooltip');
      });
      return false;
    }

    options = $.extend(defaults, options);

    return this.each(function () {
      const tooltipId = Materialize.guid();
      const origin = $(this);

      // Destroy old tooltip
      if (origin.attr('data-tooltip-id')) {
        $(`#${origin.attr('data-tooltip-id')}`).remove();
      }

      origin.attr('data-tooltip-id', tooltipId);

      // Get attributes.
      let allowHtml,
        tooltipDelay,
        tooltipPosition,
        tooltipText,
        tooltipEl,
        backdrop;
      const setAttributes = function () {
        allowHtml = origin.attr('data-html') ? origin.attr('data-html') === 'true' : options.html;
        tooltipDelay = origin.attr('data-delay');
        tooltipDelay = (tooltipDelay === undefined || tooltipDelay === '') ?
          options.delay : tooltipDelay;
        tooltipPosition = origin.attr('data-position');
        tooltipPosition = (tooltipPosition === undefined || tooltipPosition === '') ?
          options.position : tooltipPosition;
        tooltipText = origin.attr('data-tooltip');
        tooltipText = (tooltipText === undefined || tooltipText === '') ?
          options.tooltip : tooltipText;
      };
      setAttributes();

      const renderTooltipEl = function () {
        const tooltip = $('<div class="material-tooltip"></div>');

        // Create Text span
        if (allowHtml) {
          tooltipText = $('<span></span>').html(tooltipText);
        } else {
          tooltipText = $('<span></span>').text(tooltipText);
        }

        // Create tooltip
        tooltip.append(tooltipText)
          .appendTo($('body'))
          .attr('id', tooltipId);

        // Create backdrop
        backdrop = $('<div class="backdrop"></div>');
        backdrop.appendTo(tooltip);
        return tooltip;
      };
      tooltipEl = renderTooltipEl();

      // Destroy previously binded events
      origin.off('mouseenter.tooltip mouseleave.tooltip');
      // Mouse In
      let started = false, timeoutRef;
      origin.on({
        'mouseenter.tooltip': function (e) {
          const showTooltip = function () {
            setAttributes();
            started = true;
            tooltipEl.velocity('stop');
            backdrop.velocity('stop');
            tooltipEl.css({ visibility: 'visible', left: '0px', top: '0px' });

            // Tooltip positioning
            const originWidth = origin.outerWidth();
            const originHeight = origin.outerHeight();
            const tooltipHeight = tooltipEl.outerHeight();
            const tooltipWidth = tooltipEl.outerWidth();
            let tooltipVerticalMovement = '0px';
            let tooltipHorizontalMovement = '0px';
            const backdropOffsetWidth = backdrop[0].offsetWidth;
            const backdropOffsetHeight = backdrop[0].offsetHeight;
            let scaleXFactor = 8;
            let scaleYFactor = 8;
            let scaleFactor = 0;
            let targetTop, targetLeft, newCoordinates;

            if (tooltipPosition === 'top') {
              // Top Position
              targetTop = origin.offset().top - tooltipHeight - margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '-10px';
              backdrop.css({
                bottom: 0,
                left: 0,
                borderRadius: '14px 14px 0 0',
                transformOrigin: '50% 100%',
                marginTop: tooltipHeight,
                marginLeft: (tooltipWidth / 2) - (backdropOffsetWidth / 2)
              });
            }
            // Left Position
            else if (tooltipPosition === 'left') {
              targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
              targetLeft = origin.offset().left - tooltipWidth - margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

              tooltipHorizontalMovement = '-10px';
              backdrop.css({
                top: '-7px',
                right: 0,
                width: '14px',
                height: '14px',
                borderRadius: '14px 0 0 14px',
                transformOrigin: '95% 50%',
                marginTop: tooltipHeight / 2,
                marginLeft: tooltipWidth
              });
            }
            // Right Position
            else if (tooltipPosition === 'right') {
              targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
              targetLeft = origin.offset().left + originWidth + margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

              tooltipHorizontalMovement = '+10px';
              backdrop.css({
                top: '-7px',
                left: 0,
                width: '14px',
                height: '14px',
                borderRadius: '0 14px 14px 0',
                transformOrigin: '5% 50%',
                marginTop: tooltipHeight / 2,
                marginLeft: '0px'
              });
            } else {
              // Bottom Position
              targetTop = origin.offset().top + origin.outerHeight() + margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '+10px';
              backdrop.css({
                top: 0,
                left: 0,
                marginLeft: (tooltipWidth / 2) - (backdropOffsetWidth / 2)
              });
            }

            // Set tooptip css placement
            tooltipEl.css({
              top: newCoordinates.y,
              left: newCoordinates.x
            });

            // Calculate Scale to fill
            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdropOffsetWidth);
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdropOffsetHeight);
            scaleFactor = Math.max(scaleXFactor, scaleYFactor);

            tooltipEl.velocity({ translateY: tooltipVerticalMovement, translateX: tooltipHorizontalMovement }, { duration: 350, queue: false })
              .velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
            backdrop.css({ visibility: 'visible' })
              .velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false })
              .velocity({ scaleX: scaleFactor, scaleY: scaleFactor }, {
                duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'
              });
          };

          timeoutRef = setTimeout(showTooltip, tooltipDelay); // End Interval

        // Mouse Out
        },
        'mouseleave.tooltip': function () {
          // Reset State
          started = false;
          clearTimeout(timeoutRef);

          // Animate back
          setTimeout(() => {
            if (started !== true) {
              tooltipEl.velocity({ opacity: 0, translateY: 0, translateX: 0 }, { duration: 225, queue: false });
              backdrop.velocity({ opacity: 0, scaleX: 1, scaleY: 1 }, {
                duration: 225,
                queue: false,
                complete() {
                  backdrop.css({ visibility: 'hidden' });
                  tooltipEl.css({ visibility: 'hidden' });
                  started = false;
                }
              });
            }
          }, 225);
        }
      });
    });
  };

  var repositionWithinScreen = function (x, y, width, height) {
    let newX = x;
    let newY = y;

    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }

    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }

    return { x: newX, y: newY };
  };

  $(document).ready(() => {
    $('.tooltipped').tooltip();
  });
}(jQuery));
