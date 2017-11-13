(function ($) {
  const materialChipsDefaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
  };

  $(document).ready(() => {
    // Handle removal of static chips.
    $(document).on('click', '.chip .close', function (e) {
      const $chips = $(this).closest('.chips');
      if ($chips.attr('data-initialized')) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });

  $.fn.material_chip = function (options) {
    const self = this;
    this.$el = $(this);
    this.$document = $(document);
    this.SELS = {
      CHIPS: '.chips',
      CHIP: '.chip',
      INPUT: 'input',
      DELETE: '.material-icons',
      SELECTED_CHIP: '.selected',
    };

    if (options === 'data') {
      return this.$el.data('chips');
    }

    const curr_options = $.extend({}, materialChipsDefaults, options);
    self.hasAutocomplete = !$.isEmptyObject(curr_options.autocompleteOptions.data);

    // Initialize
    this.init = function () {
      let i = 0;
      let chips;
      self.$el.each(function () {
        const $chips = $(this);
        const chipId = Materialize.guid();
        self.chipId = chipId;

        if (!curr_options.data || !(curr_options.data instanceof Array)) {
          curr_options.data = [];
        }
        $chips.data('chips', curr_options.data);
        $chips.attr('data-index', i);
        $chips.attr('data-initialized', true);

        if (!$chips.hasClass(self.SELS.CHIPS)) {
          $chips.addClass('chips');
        }

        self.chips($chips, chipId);
        i++;
      });
    };

    this.handleEvents = function () {
      const SELS = self.SELS;

      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, (e) => {
        $(e.target).find(SELS.INPUT).focus();
      });

      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, (e) => {
        const $chip = $(e.target);
        if ($chip.length) {
          const wasSelected = $chip.hasClass('selected');
          const $chips = $chip.closest(SELS.CHIPS);
          $(SELS.CHIP).removeClass('selected');

          if (!wasSelected) {
            self.selectChip($chip.index(), $chips);
          }
        }
      });

      self.$document.off('keydown.chips').on('keydown.chips', (e) => {
        if ($(e.target).is('input, textarea')) {
          return;
        }

        // delete
        const $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
        const $chips = $chip.closest(SELS.CHIPS);
        const length = $chip.siblings(SELS.CHIP).length;
        let index;

        if (!$chip.length) {
          return;
        }

        if (e.which === 8 || e.which === 46) {
          e.preventDefault();

          index = $chip.index();
          self.deleteChip(index, $chips);

          let selectIndex = null;
          if ((index + 1) < length) {
            selectIndex = index;
          } else if (index === length || (index + 1) === length) {
            selectIndex = length - 1;
          }

          if (selectIndex < 0) selectIndex = null;

          if (selectIndex !== null) {
            self.selectChip(selectIndex, $chips);
          }
          if (!length) $chips.find('input').focus();

        // left
        } else if (e.which === 37) {
          index = $chip.index() - 1;
          if (index < 0) {
            return;
          }
          $(SELS.CHIP).removeClass('selected');
          self.selectChip(index, $chips);

        // right
        } else if (e.which === 39) {
          index = $chip.index() + 1;
          $(SELS.CHIP).removeClass('selected');
          if (index > length) {
            $chips.find('input').focus();
            return;
          }
          self.selectChip(index, $chips);
        }
      });

      self.$document.off('focusin.chips', `${SELS.CHIPS} ${SELS.INPUT}`).on('focusin.chips', `${SELS.CHIPS} ${SELS.INPUT}`, (e) => {
        const $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.addClass('focus');
        $currChips.siblings('label, .prefix').addClass('active');
        $(SELS.CHIP).removeClass('selected');
      });

      self.$document.off('focusout.chips', `${SELS.CHIPS} ${SELS.INPUT}`).on('focusout.chips', `${SELS.CHIPS} ${SELS.INPUT}`, (e) => {
        const $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.removeClass('focus');

        // Remove active if empty
        if ($currChips.data('chips') === undefined || !$currChips.data('chips').length) {
          $currChips.siblings('label').removeClass('active');
        }
        $currChips.siblings('.prefix').removeClass('active');
      });

      self.$document.off('keydown.chips-add', `${SELS.CHIPS} ${SELS.INPUT}`).on('keydown.chips-add', `${SELS.CHIPS} ${SELS.INPUT}`, (e) => {
        const $target = $(e.target);
        const $chips = $target.closest(SELS.CHIPS);
        const chipsLength = $chips.children(SELS.CHIP).length;

        // enter
        if (e.which === 13) {
          // Override enter if autocompleting.
          if (self.hasAutocomplete &&
              $chips.find('.autocomplete-content.dropdown-content').length &&
              $chips.find('.autocomplete-content.dropdown-content').children().length) {
            return;
          }

          e.preventDefault();
          self.addChip({ tag: $target.val() }, $chips);
          $target.val('');
          return;
        }

        // delete or left
        if ((e.keyCode === 8 || e.keyCode === 37) && $target.val() === '' && chipsLength) {
          e.preventDefault();
          self.selectChip(chipsLength - 1, $chips);
          $target.blur();
        }
      });

      // Click on delete icon in chip.
      self.$document.off('click.chips-delete', `${SELS.CHIPS} ${SELS.DELETE}`).on('click.chips-delete', `${SELS.CHIPS} ${SELS.DELETE}`, (e) => {
        const $target = $(e.target);
        const $chips = $target.closest(SELS.CHIPS);
        const $chip = $target.closest(SELS.CHIP);
        e.stopPropagation();
        self.deleteChip($chip.index(), $chips);
        $chips.find('input').focus();
      });
    };

    this.chips = function ($chips, chipId) {
      $chips.empty();
      $chips.data('chips').forEach((elem) => {
        $chips.append(self.renderChip(elem));
      });
      $chips.append($(`<input id="${chipId}" class="input" placeholder="">`));
      self.setPlaceholder($chips);

      // Set for attribute for label
      const label = $chips.next('label');
      if (label.length) {
        label.attr('for', chipId);

        if ($chips.data('chips') !== undefined && $chips.data('chips').length) {
          label.addClass('active');
        }
      }

      // Setup autocomplete if needed.
      const input = $(`#${chipId}`);
      if (self.hasAutocomplete) {
        curr_options.autocompleteOptions.onAutocomplete = function (val) {
          self.addChip({ tag: val }, $chips);
          input.val('');
          input.focus();
        };
        input.autocomplete(curr_options.autocompleteOptions);
      }
    };

    /**
     * Render chip jQuery element.
     * @param {Object} elem
     * @return {jQuery}
     */
    this.renderChip = function (elem) {
      if (!elem.tag) return;

      const $renderedChip = $('<div class="chip"></div>');
      $renderedChip.text(elem.tag);
      if (elem.image) {
        $renderedChip.prepend($('<img />').attr('src', elem.image));
      }
      $renderedChip.append($('<i class="material-icons close">close</i>'));
      return $renderedChip;
    };

    this.setPlaceholder = function ($chips) {
      if (($chips.data('chips') !== undefined && !$chips.data('chips').length) && curr_options.placeholder) {
        $chips.find('input').prop('placeholder', curr_options.placeholder);
      } else if (($chips.data('chips') === undefined || !!$chips.data('chips').length) && curr_options.secondaryPlaceholder) {
        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
      }
    };

    this.isValid = function ($chips, elem) {
      const chips = $chips.data('chips');
      let exists = false;
      for (let i = 0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
          exists = true;
          return;
        }
      }
      return elem.tag !== '' && !exists;
    };

    this.addChip = function (elem, $chips) {
      if (!self.isValid($chips, elem)) {
        return;
      }
      const $renderedChip = self.renderChip(elem);
      const newData = [];
      const oldData = $chips.data('chips');
      for (let i = 0; i < oldData.length; i++) {
        newData.push(oldData[i]);
      }
      newData.push(elem);

      $chips.data('chips', newData);
      $renderedChip.insertBefore($chips.find('input'));
      $chips.trigger('chip.add', elem);
      self.setPlaceholder($chips);
    };

    this.deleteChip = function (chipIndex, $chips) {
      const chip = $chips.data('chips')[chipIndex];
      $chips.find('.chip').eq(chipIndex).remove();

      const newData = [];
      const oldData = $chips.data('chips');
      for (let i = 0; i < oldData.length; i++) {
        if (i !== chipIndex) {
          newData.push(oldData[i]);
        }
      }

      $chips.data('chips', newData);
      $chips.trigger('chip.delete', chip);
      self.setPlaceholder($chips);
    };

    this.selectChip = function (chipIndex, $chips) {
      const $chip = $chips.find('.chip').eq(chipIndex);
      if ($chip && $chip.hasClass('selected') === false) {
        $chip.addClass('selected');
        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
      }
    };

    this.getChipsElement = function (index, $chips) {
      return $chips.eq(index);
    };

    // init
    this.init();

    this.handleEvents();
  };
}(jQuery));
