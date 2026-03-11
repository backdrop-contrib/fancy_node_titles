(function ($) {

  /**
   * Attach tag-insertion toolbars, display title toggle, and icon preview.
   */
  Backdrop.behaviors.fancyNodeTitlesToolbar = {
    attach: function (context, settings) {
      if (!settings.fancyNodeTitles || !settings.fancyNodeTitles.allowedTags) {
        return;
      }

      var s            = settings.fancyNodeTitles;
      var tags         = s.allowedTags;
      var displayMode  = s.displayTitleMode || 'always';
      var hasCustom    = s.hasCustom || false;
      var previewPath  = s.iconPreviewPath || '';

      var labels = {
        strong: 'Bold',
        em:     'Italic',
        sup:    'Sup',
        sub:    'Sub',
        span:   'Span',
        a:      'Link',
        abbr:   'Abbr'
      };

      // Attach toolbar to the display_title input only.
      $('input.form-text[name="display_title"]', context)
        .once('fancy-node-titles-toolbar', function () {
          attachToolbar($(this), tags, labels);
        });

      // Icon preview.
      var $iconInput = $('input.fancy-node-titles-icon-input', context)
        .once('fancy-node-titles-icon-preview');
      if ($iconInput.length && previewPath) {
        var $preview = $('<span class="fancy-node-titles-icon-preview"></span>');
        $iconInput.after($preview);
        updateIconPreview($iconInput.val(), $preview, previewPath);

        var previewTimer;
        $iconInput.on('input', function () {
          clearTimeout(previewTimer);
          var val = $(this).val();
          previewTimer = setTimeout(function () {
            updateIconPreview(val, $preview, previewPath);
          }, 350);
        });
      }

      // Display title / icon toggle for on-demand mode.
      // Order is: Title, Display title, Icon — hide the bottom two.
      if (displayMode === 'on_demand' && !hasCustom) {
        var $displayItem = $('.form-item-display-title', context).once('fancy-node-titles-toggle');
        var $iconItem    = $('.form-item-icon', context).once('fancy-node-titles-toggle');

        if ($displayItem.length || $iconItem.length) {
          $displayItem.hide();
          $iconItem.hide();

          var $toggle = $(
            '<a href="#" class="fancy-node-titles-display-toggle">' +
            Backdrop.t('+ Customize title display') + '</a>'
          );
          $toggle.on('click', function (e) {
            e.preventDefault();
            $displayItem.show();
            $iconItem.show();
            $toggle.hide();
            $displayItem.find('input').focus();
          });

          // Insert toggle after the title field, before the display title.
          $displayItem.before($toggle);
        }
      }
    }
  };

  /**
   * Fetches and displays an icon preview for the given icon name.
   */
  function updateIconPreview(iconName, $preview, previewPath) {
    iconName = $.trim(iconName);
    if (!iconName) {
      $preview.empty().removeClass('fancy-node-titles-icon-invalid');
      return;
    }
    $.getJSON(previewPath + '/' + encodeURIComponent(iconName), function (data) {
      if (data.valid) {
        $preview.html(data.html).removeClass('fancy-node-titles-icon-invalid');
      }
      else {
        $preview.html(Backdrop.t('Icon not found')).addClass('fancy-node-titles-icon-invalid');
      }
    });
  }

  /**
   * Builds and inserts a tag toolbar after the given input.
   */
  function attachToolbar($input, tags, labels) {
    var $toolbar = $('<div class="fancy-node-titles-toolbar"></div>');
    var $label   = $('<span class="fancy-node-titles-toolbar-label">' + Backdrop.t('Insert tag:') + '</span>');
    $toolbar.append($label);

    var $clear = $(
      '<button type="button" class="fancy-node-titles-btn fancy-node-titles-clear-btn" title="' +
      Backdrop.t('Remove all HTML tags') + '">' + Backdrop.t('Clear') + '</button>'
    );
    $clear.on('click', function (e) {
      e.preventDefault();
      $input[0].value = $input[0].value.replace(/<[^>]*>/g, '');
      $input[0].focus();
    });
    $toolbar.append($clear);

    $.each(tags, function (i, tag) {
      var label = labels[tag] || tag;
      var $btn  = $(
        '<button type="button" class="fancy-node-titles-btn" title="' +
        Backdrop.t('Wrap selection in &lt;@tag&gt;', {'@tag': tag}) +
        '">' + label + '</button>'
      );
      $btn.on('click', function (e) {
        e.preventDefault();
        insertTag($input[0], tag);
      });
      $toolbar.append($btn);
    });

    $input.after($toolbar);
  }

  var voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'];

  /**
   * Inserts an HTML tag at the cursor or around the current selection.
   */
  function insertTag(input, tag) {
    var start    = input.selectionStart;
    var end      = input.selectionEnd;
    var val      = input.value;
    var selected = val.substring(start, end);
    var replacement, cursor;

    if (voidTags.indexOf(tag) !== -1) {
      replacement = '<' + tag + '>';
      cursor      = start + replacement.length;
    }
    else {
      var open  = '<' + tag + '>';
      var close = '</' + tag + '>';
      replacement = open + selected + close;
      cursor = selected.length ? start + replacement.length : start + open.length;
    }

    input.value = val.substring(0, start) + replacement + val.substring(end);
    input.setSelectionRange(cursor, cursor);
    input.focus();
  }

})(jQuery);
