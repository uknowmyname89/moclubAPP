require('../scss/styles.scss');

$(function () {
  $('.navbar-toggler').click(function(){
    $('.sidenav').toggleClass('active');
  });
  $('.r-modal-toggler').click(function(){
    $('.r-modal').toggleClass('active');
  });
  $('.option').click(function(){
    $(this).closest('.option-wrapper').toggleClass('active');
  });
  $('.map__marker').click(function(){
    $('.map__bottom').toggleClass('active');
  });

  $('.closeNav').click(function(){
    $('.sidenav').toggleClass('active');
  });
  $('.closeMod').click(function(){
    $('.r-modal').toggleClass('active');
  });
  $('.closeMap').click(function(){
    $('.map__bottom').toggleClass('active');
  });
});
