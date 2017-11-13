(function ($) {
  const methods = {
    init(options) {
      return this.each(function () {
        const origin = $(`#${$(this).attr('data-activates')}`);
        const screen = $('body');

        // Creating tap target
        const tapTargetEl = $(this);
        let tapTargetWrapper = tapTargetEl.parent('.tap-target-wrapper');
        let tapTargetWave = tapTargetWrapper.find('.tap-target-wave');
        let tapTargetOriginEl = tapTargetWrapper.find('.tap-target-origin');
        let tapTargetContentEl = tapTargetEl.find('.tap-target-content');

        // Creating wrapper
        if (!tapTargetWrapper.length) {
          tapTargetWrapper = tapTargetEl.wrap($('<div class="tap-target-wrapper"></div>')).parent();
        }

        // Creating content
        if (!tapTargetContentEl.length) {
          tapTargetContentEl = $('<div class="tap-target-content"></div>');
          tapTargetEl.append(tapTargetContentEl);
        }

        // Creating foreground wave
        if (!tapTargetWave.length) {
          tapTargetWave = $('<div class="tap-target-wave"></div>');

          // Creating origin
          if (!tapTargetOriginEl.length) {
            tapTargetOriginEl = origin.clone(true, true);
            tapTargetOriginEl.addClass('tap-target-origin');
            tapTargetOriginEl.removeAttr('id');
            tapTargetOriginEl.removeAttr('style');
            tapTargetWave.append(tapTargetOriginEl);
          }

          tapTargetWrapper.append(tapTargetWave);
        }

        // Open
        const openTapTarget = function () {
          if (tapTargetWrapper.is('.open')) {
            return;
          }

          // Adding open class
          tapTargetWrapper.addClass('open');

          setTimeout(() => {
            tapTargetOriginEl.off('click.tapTarget').on('click.tapTarget', (e) => {
              closeTapTarget();
              tapTargetOriginEl.off('click.tapTarget');
            });

            $(document).off('click.tapTarget').on('click.tapTarget', (e) => {
              closeTapTarget();
              $(document).off('click.tapTarget');
            });

            const throttledCalc = Materialize.throttle(() => {
              calculateTapTarget();
            }, 200);
            $(window).off('resize.tapTarget').on('resize.tapTarget', throttledCalc);
          }, 0);
        };

        // Close
        var closeTapTarget = function () {
          if (!tapTargetWrapper.is('.open')) {
            return;
          }

          tapTargetWrapper.removeClass('open');
          tapTargetOriginEl.off('click.tapTarget');
          $(document).off('click.tapTarget');
          $(window).off('resize.tapTarget');
        };

        // Pre calculate
        var calculateTapTarget = function () {
          // Element or parent is fixed position?
          let isFixed = origin.css('position') === 'fixed';
          if (!isFixed) {
            const parents = origin.parents();
            for (let i = 0; i < parents.length; i++) {
              isFixed = $(parents[i]).css('position') == 'fixed';
              if (isFixed) {
                break;
              }
            }
          }

          // Calculating origin
          const originWidth = origin.outerWidth();
          const originHeight = origin.outerHeight();
          const originTop = isFixed ? origin.offset().top - $(document).scrollTop() : origin.offset().top;
          const originLeft = isFixed ? origin.offset().left - $(document).scrollLeft() : origin.offset().left;

          // Calculating screen
          const windowWidth = $(window).width();
          const windowHeight = $(window).height();
          const centerX = windowWidth / 2;
          const centerY = windowHeight / 2;
          const isLeft = originLeft <= centerX;
          const isRight = originLeft > centerX;
          const isTop = originTop <= centerY;
          const isBottom = originTop > centerY;
          const isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
          const isCenterY = originTop >= windowHeight * 0.25 && originTop <= windowHeight * 0.75;

          // Calculating tap target
          const tapTargetWidth = tapTargetEl.outerWidth();
          const tapTargetHeight = tapTargetEl.outerHeight();
          const tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
          const tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
          const tapTargetPosition = isFixed ? 'fixed' : 'absolute';

          // Calculating content
          const tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
          const tapTargetTextHeight = tapTargetHeight / 2;
          const tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
          const tapTargetTextBottom = 0;
          const tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
          const tapTargetTextRight = 0;
          const tapTargetTextPadding = originWidth;
          const tapTargetTextAlign = isBottom ? 'bottom' : 'top';

          // Calculating wave
          const tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
          const tapTargetWaveHeight = tapTargetWaveWidth;
          const tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
          const tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

          // Setting tap target
          const tapTargetWrapperCssObj = {};
          tapTargetWrapperCssObj.top = isTop ? tapTargetTop : '';
          tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth : '';
          tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight : '';
          tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft : '';
          tapTargetWrapperCssObj.position = tapTargetPosition;
          tapTargetWrapper.css(tapTargetWrapperCssObj);

          // Setting content
          tapTargetContentEl.css({
            width: tapTargetTextWidth,
            height: tapTargetTextHeight,
            top: tapTargetTextTop,
            right: tapTargetTextRight,
            bottom: tapTargetTextBottom,
            left: tapTargetTextLeft,
            padding: tapTargetTextPadding,
            verticalAlign: tapTargetTextAlign
          });

          // Setting wave
          tapTargetWave.css({
            top: tapTargetWaveTop,
            left: tapTargetWaveLeft,
            width: tapTargetWaveWidth,
            height: tapTargetWaveHeight
          });
        };

        if (options == 'open') {
          calculateTapTarget();
          openTapTarget();
        }

        if (options == 'close') { closeTapTarget(); }
      });
    },
    open() {},
    close() {}
  };

  $.fn.tapTarget = function (methodOrOptions) {
    if (methods[methodOrOptions] || typeof methodOrOptions === 'object') { return methods.init.apply(this, arguments); }

    $.error(`Method ${methodOrOptions} does not exist on jQuery.tap-target`);
  };
}(jQuery));
