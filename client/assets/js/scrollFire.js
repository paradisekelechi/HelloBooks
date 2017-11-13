(function ($) {
  let scrollFireEventsHandled = false;

  // Input: Array of JSON objects {selector, offset, callback}
  Materialize.scrollFire = function (options) {
    const onScroll = function () {
      const windowScroll = window.pageYOffset + window.innerHeight;

      for (let i = 0; i < options.length; i++) {
        // Get options from each line
        const value = options[i];
        let selector = value.selector,
          offset = value.offset,
          callback = value.callback;

        const currentElement = document.querySelector(selector);
        if (currentElement !== null) {
          const elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

          if (windowScroll > (elementOffset + offset)) {
            if (value.done !== true) {
              if (typeof (callback) === 'function') {
                callback.call(this, currentElement);
              } else if (typeof (callback) === 'string') {
                const callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }
              value.done = true;
            }
          }
        }
      }
    };


    const throttledScroll = Materialize.throttle(() => {
      onScroll();
    }, options.throttle || 100);

    if (!scrollFireEventsHandled) {
      window.addEventListener('scroll', throttledScroll);
      window.addEventListener('resize', throttledScroll);
      scrollFireEventsHandled = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(throttledScroll, 0);
  };
}(jQuery));
