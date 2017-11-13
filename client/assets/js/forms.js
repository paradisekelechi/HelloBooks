(function ($) {
  $(document).ready(() => {
    // Function to update labels of text fields
    Materialize.updateTextFields = function () {
      const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function (index, element) {
        const $this = $(this);
        if ($(element).val().length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== undefined) {
          $this.siblings('label').addClass('active');
        } else if ($(element)[0].validity) {
          $this.siblings('label').toggleClass('active', $(element)[0].validity.badInput === true);
        } else {
          $this.siblings('label').removeClass('active');
        }
      });
    };

    // Text based inputs
    const input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(() => {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', (e) => {
      const formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(() => {
          const reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, .prefix').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      const $inputElement = $(this);
      let selector = '.prefix';

      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        selector += ', label';
      }

      $inputElement.siblings(selector).removeClass('active');

      validate_field($inputElement);
    });

    window.validate_field = function (object) {
      const hasLength = object.attr('data-length') !== undefined;
      const lenAttr = parseInt(object.attr('data-length'));
      const len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false && !object.is(':required')) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      } else if (object.hasClass('validate')) {
        // Check for character counter attributes
        if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    };

    // Radio and Checkbox focus class
    const radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup.radio', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === 9) {
        $(this).addClass('tabbed');
        const $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
      }
    });

    // Textarea Auto Resize
    let hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    const text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      const fontFamily = $textarea.css('font-family');
      const fontSize = $textarea.css('font-size');
      const lineHeight = $textarea.css('line-height');
      const padding = $textarea.css('padding');

      if (fontSize) { hiddenDiv.css('font-size', fontSize); }
      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
      if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }
      if (padding) { hiddenDiv.css('padding', padding); }

      // Set original-height, if none
      if (!$textarea.data('original-height')) {
        $textarea.data('original-height', $textarea.height());
      }

      if ($textarea.attr('wrap') === 'off') {
        hiddenDiv.css('overflow-wrap', 'normal')
          .css('white-space', 'pre');
      }

      hiddenDiv.text(`${$textarea.val()}\n`);
      const content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);


      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      } else {
        hiddenDiv.css('width', $(window).width() / 2);
      }


      /**
       * Resize if the new height is greater than the
       * original height of the textarea
       */
      if ($textarea.data('original-height') <= hiddenDiv.height()) {
        $textarea.css('height', hiddenDiv.height());
      } else if ($textarea.val().length < $textarea.data('previous-length')) {
        /**
         * In case the new height is less than original height, it
         * means the textarea has less text than before
         * So we set the height to the original one
         */
        $textarea.css('height', $textarea.data('original-height'));
      }
      $textarea.data('previous-length', $textarea.val().length);
    }

    $(text_area_selector).each(function () {
      const $textarea = $(this);
      /**
       * Instead of resizing textarea on document load,
       * store the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', $textarea.val().length);
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      const file_field = $(this).closest('.file-field');
      const path_input = file_field.find('input.file-path');
      const files = $(this)[0].files;
      const file_names = [];
      for (let i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(', '));
      path_input.trigger('change');
    });

    /** **************
    *  Range Input  *
    *************** */

    const range_type = 'input[type=range]';
    let range_mousedown = false;
    let left;

    $(range_type).each(function () {
      const thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    const showRangeBubble = function (thumb) {
      const paddingLeft = parseInt(thumb.parent().css('padding-left'));
      const marginLeft = `${-7 + paddingLeft}px`;
      thumb.velocity({
        height: '30px', width: '30px', top: '-30px', marginLeft
      }, { duration: 300, easing: 'easeOutExpo' });
    };

    const calcRangeOffset = function (range) {
      const width = range.width() - 15;
      const max = parseFloat(range.attr('max'));
      const min = parseFloat(range.attr('min'));
      const percent = (parseFloat(range.val()) - min) / (max - min);
      return percent * width;
    };

    const range_wrapper = '.range-field';
    $(document).on('change', range_type, function (e) {
      const thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      const offsetLeft = calcRangeOffset($(this));
      thumb.addClass('active').css('left', offsetLeft);
    });

    $(document).on('mousedown touchstart', range_type, function (e) {
      let thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).after(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      if (e.type !== 'input') {
        const offsetLeft = calcRangeOffset($(this));
        thumb.addClass('active').css('left', offsetLeft);
      }
    });

    $(document).on('mouseup touchend', range_wrapper, function () {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('input mousemove touchmove', range_wrapper, function (e) {
      const thumb = $(this).children('.thumb');
      let left;
      const input = $(this).find(range_type);

      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          showRangeBubble(thumb);
        }

        const offsetLeft = calcRangeOffset(input);
        thumb.addClass('active').css('left', offsetLeft);
        thumb.find('.value').html(thumb.siblings(range_type).val());
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function () {
      if (!range_mousedown) {
        const thumb = $(this).children('.thumb');
        const paddingLeft = parseInt($(this).css('padding-left'));
        const marginLeft = `${7 + paddingLeft}px`;

        if (thumb.hasClass('active')) {
          thumb.velocity({
            height: '0', width: '0', top: '10px', marginLeft
          }, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });

    /** ************************
     * Auto complete plugin  *
     ************************ */
    $.fn.autocomplete = function (options) {
      // Defaults
      const defaults = {
        data: {},
        limit: Infinity,
        onAutocomplete: null,
        minLength: 1
      };

      options = $.extend(defaults, options);

      return this.each(function () {
        const $input = $(this);
        let data = options.data,
          count = 0,
          activeIndex = -1,
          oldVal,
          $inputDiv = $input.closest('.input-field'); // Div to append on

        // Check if data isn't empty
        if (!$.isEmptyObject(data)) {
          let $autocomplete = $('<ul class="autocomplete-content dropdown-content"></ul>');
          let $oldAutocomplete;

          // Append autocomplete element.
          // Prevent double structure init.
          if ($inputDiv.length) {
            $oldAutocomplete = $inputDiv.children('.autocomplete-content.dropdown-content').first();
            if (!$oldAutocomplete.length) {
              $inputDiv.append($autocomplete); // Set ul in body
            }
          } else {
            $oldAutocomplete = $input.next('.autocomplete-content.dropdown-content');
            if (!$oldAutocomplete.length) {
              $input.after($autocomplete);
            }
          }
          if ($oldAutocomplete.length) {
            $autocomplete = $oldAutocomplete;
          }

          // Highlight partial match.
          const highlight = function (string, $el) {
            const img = $el.find('img');
            let matchStart = $el.text().toLowerCase().indexOf(`${string.toLowerCase()}`),
              matchEnd = matchStart + string.length - 1,
              beforeMatch = $el.text().slice(0, matchStart),
              matchText = $el.text().slice(matchStart, matchEnd + 1),
              afterMatch = $el.text().slice(matchEnd + 1);
            $el.html(`<span>${beforeMatch}<span class='highlight'>${matchText}</span>${afterMatch}</span>`);
            if (img.length) {
              $el.prepend(img);
            }
          };

          // Reset current element position
          const resetCurrentElement = function () {
            activeIndex = -1;
            $autocomplete.find('.active').removeClass('active');
          };

          // Remove autocomplete elements
          const removeAutocomplete = function () {
            $autocomplete.empty();
            resetCurrentElement();
            oldVal = undefined;
          };

          $input.off('blur.autocomplete').on('blur.autocomplete', () => {
            removeAutocomplete();
          });

          // Perform search
          $input.off('keyup.autocomplete focus.autocomplete').on('keyup.autocomplete focus.autocomplete', (e) => {
            // Reset count.
            count = 0;
            const val = $input.val().toLowerCase();

            // Don't capture enter or arrow key usage.
            if (e.which === 13 ||
                e.which === 38 ||
                e.which === 40) {
              return;
            }


            // Check if the input isn't empty
            if (oldVal !== val) {
              removeAutocomplete();

              if (val.length >= options.minLength) {
                for (const key in data) {
                  if (data.hasOwnProperty(key) &&
                      key.toLowerCase().indexOf(val) !== -1) {
                    // Break if past limit
                    if (count >= options.limit) {
                      break;
                    }

                    const autocompleteOption = $('<li></li>');
                    if (data[key]) {
                      autocompleteOption.append(`<img src="${data[key]}" class="right circle"><span>${key}</span>`);
                    } else {
                      autocompleteOption.append(`<span>${key}</span>`);
                    }

                    $autocomplete.append(autocompleteOption);
                    highlight(val, autocompleteOption);
                    count++;
                  }
                }
              }
            }

            // Update oldVal
            oldVal = val;
          });

          $input.off('keydown.autocomplete').on('keydown.autocomplete', (e) => {
            // Arrow keys and enter key usage
            let keyCode = e.which,
              liElement,
              numItems = $autocomplete.children('li').length,
              $active = $autocomplete.children('.active').first();

            // select element on Enter
            if (keyCode === 13 && activeIndex >= 0) {
              liElement = $autocomplete.children('li').eq(activeIndex);
              if (liElement.length) {
                liElement.trigger('mousedown.autocomplete');
                e.preventDefault();
              }
              return;
            }

            // Capture up and down key
            if (keyCode === 38 || keyCode === 40) {
              e.preventDefault();

              if (keyCode === 38 &&
                  activeIndex > 0) {
                activeIndex--;
              }

              if (keyCode === 40 &&
                  activeIndex < (numItems - 1)) {
                activeIndex++;
              }

              $active.removeClass('active');
              if (activeIndex >= 0) {
                $autocomplete.children('li').eq(activeIndex).addClass('active');
              }
            }
          });

          // Set input value
          $autocomplete.off('mousedown.autocomplete touchstart.autocomplete').on('mousedown.autocomplete touchstart.autocomplete', 'li', function () {
            const text = $(this).text().trim();
            $input.val(text);
            $input.trigger('change');
            removeAutocomplete();

            // Handle onAutocomplete callback.
            if (typeof (options.onAutocomplete) === 'function') {
              options.onAutocomplete.call(this, text);
            }
          });

        // Empty data
        } else {
          $input.off('keyup.autocomplete focus.autocomplete');
        }
      });
    };
  }); // End of $(document).ready

  /** *****************
   *  Select Plugin  *
   ***************** */
  $.fn.material_select = function (callback) {
    $(this).each(function () {
      const $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      let multiple = !!$select.attr('multiple'),
        lastID = $select.attr('data-select-id'); // Tear down structure if Select needs to be rebuilt

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $(`ul#select-options-${lastID}`).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.removeAttr('data-select-id').removeClass('initialized');
        $(window).off('click.select');
        return;
      }

      const uniqueID = Materialize.guid();
      $select.attr('data-select-id', uniqueID);
      const wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      if ($select.is(':disabled')) { wrapper.addClass('disabled'); }
      let options = $(`<ul id="select-options-${uniqueID}" class="dropdown-content select-dropdown ${multiple ? 'multiple-select-dropdown' : ''}"></ul>`),
        selectChildren = $select.children('option, optgroup'),
        valuesSelected = [],
        optionsHover = false;

      const label = $select.find('option:selected').html() || $select.find('option:first').html() || '';

      // Function that renders and appends the option taking into
      // account type and possible image icon.
      const appendOptionWithIcon = function (select, option, type) {
        // Add disabled attr if disabled
        const disabledClass = (option.is(':disabled')) ? 'disabled ' : '';
        const optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
        const multipleCheckbox = multiple ? `<input type="checkbox"${disabledClass}/><label></label>` : '';

        // add icons
        const icon_url = option.data('icon');
        const classes = option.attr('class');
        if (icon_url) {
          let classString = '';
          if (classes) classString = ` class="${classes}"`;

          // Check for multiple type.
          options.append($(`<li class="${disabledClass}${optgroupClass}"><img alt="" src="${icon_url}"${classString}><span>${multipleCheckbox}${option.html()}</span></li>`));
          return true;
        }

        // Check for multiple type.
        options.append($(`<li class="${disabledClass}${optgroupClass}"><span>${multipleCheckbox}${option.html()}</span></li>`));
      };

      /* Create dropdown structure. */
      if (selectChildren.length) {
        selectChildren.each(function () {
          if ($(this).is('option')) {
            // Direct descendant option.
            if (multiple) {
              appendOptionWithIcon($select, $(this), 'multiple');
            } else {
              appendOptionWithIcon($select, $(this));
            }
          } else if ($(this).is('optgroup')) {
            // Optgroup.
            const selectOptions = $(this).children('option');
            options.append($(`<li class="optgroup"><span>${$(this).attr('label')}</span></li>`));

            selectOptions.each(function () {
              appendOptionWithIcon($select, $(this), 'optgroup-option');
            });
          }
        });
      }

      options.find('li:not(.optgroup)').each(function (i) {
        $(this).click(function (e) {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
            let selected = true;

            if (multiple) {
              $('input[type="checkbox"]', this).prop('checked', (i, v) => { return !v; });
              selected = toggleEntryFromArray(valuesSelected, i, $select);
              $newSelect.trigger('focus');
            } else {
              options.find('li').removeClass('active');
              $(this).toggleClass('active');
              $newSelect.val($(this).text());
            }

            activateOption(options, $(this));
            $select.find('option').eq(i).prop('selected', selected);
            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') callback();
          }

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      const dropdownIcon = $('<span class="caret">&#9660;</span>');

      // escape double quotes
      const sanitizedLabelHtml = label.replace(/"/g, '&quot;');

      var $newSelect = $(`<input type="text" class="select-dropdown" readonly="true" ${($select.is(':disabled')) ? 'disabled' : ''} data-activates="select-options-${uniqueID}" value="${sanitizedLabelHtml}"/>`);
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({ hover: false });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on({
        focus() {
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
            $(window).off('click.select');
          }
          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);
            let label = $(this).val();
            if (multiple && label.indexOf(',') >= 0) {
              label = label.split(',')[0];
            }

            const selectedOption = options.find('li').filter(function () {
              return $(this).text().toLowerCase() === label.toLowerCase();
            })[0];
            activateOption(options, selectedOption, true);

            $(window).off('click.select').on('click.select', () => {
              multiple && (optionsHover || $newSelect.trigger('close'));
              $(window).off('click.select');
            });
          }
        },
        click(e) {
          e.stopPropagation();
        }
      });

      $newSelect.on('blur', function () {
        if (!multiple) {
          $(this).trigger('close');
          $(window).off('click.select');
        }
        options.find('li.selected').removeClass('selected');
      });

      options.hover(() => {
        optionsHover = true;
      }, () => {
        optionsHover = false;
      });

      // Add initial multiple selections.
      if (multiple) {
        $select.find('option:selected:not(:disabled)').each(function () {
          const index = this.index;

          toggleEntryFromArray(valuesSelected, index, $select);
          options.find('li:not(.optgroup)').eq(index).find(':checkbox').prop('checked', true);
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       * @param {Boolean} firstActivation  If on first activation of select
       */
      var activateOption = function (collection, newOption, firstActivation) {
        if (newOption) {
          collection.find('li.selected').removeClass('selected');
          const option = $(newOption);
          option.addClass('selected');
          if (!multiple || !!firstActivation) {
            options.scrollTo(option);
          }
        }
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      let filterQuery = [],
        onKeyDown = function (e) {
          // TAB - switch to another input
          if (e.which == 9) {
            $newSelect.trigger('close');
            return;
          }

          // ARROW DOWN WHEN SELECT IS CLOSED - open select options
          if (e.which == 40 && !options.is(':visible')) {
            $newSelect.trigger('open');
            return;
          }

          // ENTER WHEN SELECT IS CLOSED - submit form
          if (e.which == 13 && !options.is(':visible')) {
            return;
          }

          e.preventDefault();

          // CASE WHEN USER TYPE LETTERS
          let letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
          if (letter && (nonLetters.indexOf(e.which) === -1)) {
            filterQuery.push(letter);

            var string = filterQuery.join(''),
              newOption = options.find('li').filter(function () {
                return $(this).text().toLowerCase().indexOf(string) === 0;
              })[0];

            if (newOption) {
              activateOption(options, newOption);
            }
          }

          // ENTER - select option and close when select options are opened
          if (e.which == 13) {
            const activeOption = options.find('li.selected:not(.disabled)')[0];
            if (activeOption) {
              $(activeOption).trigger('click');
              if (!multiple) {
                $newSelect.trigger('close');
              }
            }
          }

          // ARROW DOWN - move to next not disabled option
          if (e.which == 40) {
            if (options.find('li.selected').length) {
              newOption = options.find('li.selected').next('li:not(.disabled)')[0];
            } else {
              newOption = options.find('li:not(.disabled)')[0];
            }
            activateOption(options, newOption);
          }

          // ESC - close options
          if (e.which == 27) {
            $newSelect.trigger('close');
          }

          // ARROW UP - move to previous not disabled option
          if (e.which == 38) {
            newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
            if (newOption) { activateOption(options, newOption); }
          }

          // Automaticaly clean filter query so user can search again by starting letters
          setTimeout(() => { filterQuery = []; }, 1000);
        };

      $newSelect.on('keydown', onKeyDown);
    });

    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      let index = entriesArray.indexOf(entryIndex),
        notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      select.siblings('ul.dropdown-content').find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      select.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    function setValueToInput(entriesArray, select) {
      let value = '';

      for (let i = 0, count = entriesArray.length; i < count; i++) {
        const text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += `, ${text}`;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
  };
}(jQuery));
