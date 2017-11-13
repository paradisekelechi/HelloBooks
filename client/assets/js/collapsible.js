(function ($) {
  $.fn.collapsible = function (options, methodParam) {
    const defaults = {
      accordion: undefined,
      onOpen: undefined,
      onClose: undefined
    };

    const methodName = options;
    options = $.extend(defaults, options);


    return this.each(function () {
      const $this = $(this);

      let $panel_headers = $(this).find('> li > .collapsible-header');

      const collapsible_type = $this.data('collapsible');

      /** **************
      Helper Functions
      *************** */

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({
            duration: 350, easing: 'easeOutQuart', queue: false, complete() { $(this).css('height', ''); }
          });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({
            duration: 350, easing: 'easeOutQuart', queue: false, complete() { $(this).css('height', ''); }
          });
        }

        $panel_headers.not(object).removeClass('active').parent().removeClass('active');

        // Close previously open accordion elements.
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false)
          .each(function () {
            if ($(this).is(':visible')) {
              $(this).slideUp({
                duration: 350,
                easing: 'easeOutQuart',
                queue: false,
                complete() {
                  $(this).css('height', '');
                  execCallbacks($(this).siblings('.collapsible-header'));
                }
              });
            }
          });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({
            duration: 350, easing: 'easeOutQuart', queue: false, complete() { $(this).css('height', ''); }
          });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({
            duration: 350, easing: 'easeOutQuart', queue: false, complete() { $(this).css('height', ''); }
          });
        }
      }

      // Open collapsible. object: .collapsible-header
      function collapsibleOpen(object, noToggle) {
        if (!noToggle) {
          object.toggleClass('active');
        }

        if (options.accordion || collapsible_type === 'accordion' || collapsible_type === undefined) { // Handle Accordion
          accordionOpen(object);
        } else { // Handle Expandables
          expandableOpen(object);
        }

        execCallbacks(object);
      }

      // Handle callbacks
      function execCallbacks(object) {
        if (object.hasClass('active')) {
          if (typeof (options.onOpen) === 'function') {
            options.onOpen.call(this, object.parent());
          }
        } else if (typeof (options.onClose) === 'function') {
          options.onClose.call(this, object.parent());
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {
        const panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {
        return object.closest('li > .collapsible-header');
      }


      // Turn off any existing event handlers
      function removeEventHandlers() {
        $this.off('click.collapse', '> li > .collapsible-header');
      }

      /** ***  End Helper Functions  **** */


      // Methods
      if (methodName === 'destroy') {
        removeEventHandlers();
        return;
      } else if (methodParam >= 0 &&
          methodParam < $panel_headers.length) {
        const $curr_header = $panel_headers.eq(methodParam);
        if ($curr_header.length &&
            (methodName === 'open' ||
            (methodName === 'close' &&
            $curr_header.hasClass('active')))) {
          collapsibleOpen($curr_header);
        }
        return;
      }


      removeEventHandlers();


      // Add click handler to only direct collapsible header children
      $this.on('click.collapse', '> li > .collapsible-header', (e) => {
        let element = $(e.target);

        if (isChildrenOfPanelHeader(element)) {
          element = getPanelHeader(element);
        }

        collapsibleOpen(element);
      });


      // Open first active
      if (options.accordion || collapsible_type === 'accordion' || collapsible_type === undefined) { // Handle Accordion
        collapsibleOpen($panel_headers.filter('.active').first(), true);
      } else { // Handle Expandables
        $panel_headers.filter('.active').each(function () {
          collapsibleOpen($(this), true);
        });
      }
    });
  };

  $(document).ready(() => {
    $('.collapsible').collapsible();
  });
}(jQuery));
