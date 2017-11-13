/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function ($) {
  const jWindow = $(window);
  const elements = [];
  let elementsInView = [];
  let isSpying = false;
  let ticks = 0;
  const unique_id = 1;
  const offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
  function findElements(top, right, bottom, left) {
    const hits = $();
    $.each(elements, (i, element) => {
      if (element.height() > 0) {
        let elTop = element.offset().top,
          elLeft = element.offset().left,
          elRight = elLeft + element.width(),
          elBottom = elTop + element.height();

        const isIntersect = !(elLeft > right ||
					elRight < left ||
					elTop > bottom ||
					elBottom < top);

        if (isIntersect) {
          hits.push(element);
        }
      }
    });

    return hits;
  }


  /**
	 * Called when the user scrolls the window
	 */
  function onScroll(scrollOffset) {
    // unique tick id
    ++ticks;

    // viewport rectangle
    let top = jWindow.scrollTop(),
      left = jWindow.scrollLeft(),
      right = left + jWindow.width(),
      bottom = top + jWindow.height();

    // determine which elements are in view
    const intersections = findElements(top + offset.top + scrollOffset || 200, right + offset.right, bottom + offset.bottom, left + offset.left);
    $.each(intersections, (i, element) => {
      const lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick !== 'number') {
        // entered into view
        element.triggerHandler('scrollSpy:enter');
      }

      // update tick id
      element.data('scrollSpy:ticks', ticks);
    });

    // determine which elements are no longer in view
    $.each(elementsInView, (i, element) => {
      const lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick === 'number' && lastTick !== ticks) {
        // exited from view
        element.triggerHandler('scrollSpy:exit');
        element.data('scrollSpy:ticks', null);
      }
    });

    // remember elements in view for next tick
    elementsInView = intersections;
  }

  /**
	 * Called when window is resized
	*/
  function onWinSize() {
    jWindow.trigger('scrollSpy:winSize');
  }


  /**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
        throttle : number -> scrollspy throttling. Default: 100 ms
        offsetTop : number -> offset from top. Default: 0
        offsetRight : number -> offset from right. Default: 0
        offsetBottom : number -> offset from bottom. Default: 0
        offsetLeft : number -> offset from left. Default: 0
				activeClass : string -> Class name to be added to the active link. Default: active
	 * @returns {jQuery}
	 */
  $.scrollSpy = function (selector, options) {
	  const defaults = {
      throttle: 100,
      scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
      activeClass: 'active',
      getActiveElement(id) {
        return `a[href="#${id}"]`;
      }
    };
    options = $.extend(defaults, options);

    let visible = [];
    selector = $(selector);
    selector.each((i, element) => {
      elements.push($(element));
      $(element).data('scrollSpy:id', i);
      // Smooth scroll to section
		  $(`a[href="#${$(element).attr('id')}"]`).click(function (e) {
		    e.preventDefault();
		    const offset = $(Materialize.escapeHash(this.hash)).offset().top + 1;
	    	$('html, body').animate({ scrollTop: offset - options.scrollOffset }, { duration: 400, queue: false, easing: 'easeOutCubic' });
		  });
    });

    offset.top = options.offsetTop || 0;
    offset.right = options.offsetRight || 0;
    offset.bottom = options.offsetBottom || 0;
    offset.left = options.offsetLeft || 0;

    const throttledScroll = Materialize.throttle(() => {
      onScroll(options.scrollOffset);
    }, options.throttle || 100);
    const readyScroll = function () {
      $(document).ready(throttledScroll);
    };

    if (!isSpying) {
      jWindow.on('scroll', readyScroll);
      jWindow.on('resize', readyScroll);
      isSpying = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(readyScroll, 0);


    selector.on('scrollSpy:enter', function () {
      visible = $.grep(visible, (value) => {
	      return value.height() != 0;
	    });

      const $this = $(this);

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
          visible.unshift($(this));
        } else {
          visible.push($(this));
        }
      } else {
        visible.push($(this));
      }


      $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
    });
    selector.on('scrollSpy:exit', function () {
      visible = $.grep(visible, (value) => {
	      return value.height() != 0;
	    });

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        const $this = $(this);
        visible = $.grep(visible, (value) => {
	        return value.attr('id') != $this.attr('id');
	      });
	      if (visible[0]) { // Check if empty
          $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
	      }
      }
    });

    return selector;
  };

  /**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
  $.winSizeSpy = function (options) {
    $.winSizeSpy = function () { return jWindow; }; // lock from multiple calls
    options = options || {
      throttle: 100
    };
    return jWindow.on('resize', Materialize.throttle(onWinSize, options.throttle || 100));
  };

  /**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
  $.fn.scrollSpy = function (options) {
    return $.scrollSpy($(this), options);
  };
}(jQuery));
