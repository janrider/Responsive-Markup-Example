var isMobile = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = 1;
}

$(document).ready(function() {
  $(window).resize(resize);
  resize();

  if (isMobile) {
    $('header .menu li a').click(function(){
      if ($(this).next().hasClass('submenu')) {
        return false;
      }
    })
    $('nav.mainNav .innerGrid > li .menu-item').click(function(){
      return false;
    })
  }

  // scroll on top
  $('footer .up').click(function(){
    $('body,html').animate({scrollTop:0},600);
    return false
  });
  // scroll on top


  // menu hovers
  var timer;
  $('nav.mainNav .innerGrid > li').hover(
      function(){
        var item = $(this);
        timer = setTimeout(function(){
          //item.addClass('hover')
          item.find('.mega').show();
        },200)
      },
      function(){
        var item = $(this);
        clearTimeout(timer);
        //$(this).removeClass('hover')
        setTimeout(function(){
          item.find('.mega').hide();
        },200);
      }
  )
  // menu hovers


  // forms
  var ch_num = 1;
  $('form a.add-child').click(function(){
    var blockClone = $(this).closest('form').find('.child.blank').clone();
    //blockClone.removeClass('blank');
    blockClone.insertBefore($(this));
    blockClone.find('input, select').each(function(){
      $(this).prop('disabled',false);
    })
    ch_num++;
    blockClone.slideDown().removeClass('blank');
    return false
  });
  // forms


  // popups
  $('.showPopup').click(function(){
    $('#'+$(this).data('id')).fadeIn().addClass('active').css('top',$(window).scrollTop()+50).find('form label:first-child input').focus();
    $('#fader').fadeIn();
    return false
  });
  $('#fader, #faderAll').click(function(){
    $('div.popup.active').fadeOut();
    $('#fader').fadeOut();
    $('#faderAll').fadeOut();
    return false
  });
  $('div.popup .close').on('click',function(){
    $(this).closest('.popup').fadeOut();
    $('#fader').fadeOut();
    $('#faderAll').fadeOut();
    return false
  });
  $(document).keypress(function(e){
    if (e.keyCode == 27 && $('#fader').is(':visible')) {
      $('div.popup.active').fadeOut();
      $('#fader').fadeOut();
      $('#faderAll').fadeOut();
    }
  });
  // popups

  // filters
  $('.filter li a').click(function(){
    $('.filter li a').removeClass('selected').filter($(this)).addClass('selected');
    var filtr = $(this).data('show');
    $(this).closest('.filter').next().find('li').show();
    if (filtr != 0)
      $(this).closest('.filter').next().find('li[data-show!="'+filtr+'"]').hide();
    return false;
  });
  // filters

});

function resize() {
  if ($('body').hasClass('frontpage')) {
    if ($(window).width() > 870) {
      $('#main-slider').height($(window).width()/1411*650)
    }
  }
}