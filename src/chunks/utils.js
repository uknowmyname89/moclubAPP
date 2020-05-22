var namespace = 'http://tuchkovo-club.ru';
require("@fancyapps/fancybox");

(function ($) {
  $.fn.initialYandexMap = function() {
    return this.each(function() {
      var $container = $(this);
      var lat = $container.data('lat');
      var lon = $container.data('lon');

      if (!lat || !lon) {
        return false;
      }

      var map = new ymaps.Map($container[0], {
        center: [lat.replace(',', '.'), lon.replace(',', '.')],
        zoom: $container.data('zoom') || 12,
        controls: ['zoomControl']
      });

      var mark$ = new ymaps.Placemark([lat.replace(',', '.'), lon.replace(',', '.')]);

      map.behaviors.disable('scrollZoom');
      map.geoObjects.add(mark$);
    });
  };

  $.fn.ajaxFormSubmit = function () {
    return this.each(function() {
      var $form = $(this);

      $form.bind('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var cb = $form.data('callback') || function () { return false; };
        var head = $form.data('head') || 'Готово';
        var text = $form.data('text') || 'Благодарим за обращение, наши менеджеры скоро свяжутся с Вами';
        var csrftoken = getCookie('csrftoken');
        var data = $form.serializeArray();

        data['csrfmiddlewaretoken'] = csrftoken;

        $.ajax({
          'type': 'PUT',
          'url': $form.attr('action'),
          'data': data,
          'success': function () {
            $('.modal').modal('hide');
            $form[0].reset();

            Swal(head, text, 'success');
            cb();
          },
          'beforeSend': function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        });
      })
    });
  };
})(jQuery);


$(function () {
  var $body = $('body');

  $("[data-fancybox]").fancybox();
  $body.find('[data-form-pjax]').ajaxFormSubmit();
  $body.on('click' + namespace, '.ajax-modal', function(){
    $($obj+' .modal-content').html(getLoader());
    $($obj+' .modal-content').load($(this).data("remote"),function(){
      $($obj).find('[data-form-pjax]').ajaxFormSubmit();
      $($obj).modal({show:true});
    });
  });

  if (window.ymaps) {
    ymaps.ready(function() {
      $("#map").initialYandexMap();
    });
  }
});


