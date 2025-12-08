$(document).ready(function() {

  $('.location-card').hover(
    function() {
      $(this).css('transform', 'translateY(-4px)');
    },
    function() {
      $(this).css('transform', 'translateY(0)');
    }
  );

  
  $('.location-card').on('click', function() {
    const location = $(this).data('location');
    const title = $(this).find('.location-title').text();
    
    
    $('.location-card').removeClass('active');
    $(this).addClass('active');
    
    
    console.log('Selected location:', location, title);
    
   
    $(this).find('.location-icon-wrapper').css({
      'animation': 'pulse 0.5s ease-in-out'
    });
    
    setTimeout(() => {
      $(this).find('.location-icon-wrapper').css('animation', '');
    }, 500);
  });

  
  $('a[href="#map"]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#map').offset().top - 80
    }, 800);
  });


  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    $('.location-card').each(function() {
      observer.observe(this);
    });
  }
});


const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  
  .location-card.active {
    border-color: hsl(35, 85%, 65%);
    box-shadow: 0 0 20px rgba(244, 162, 97, 0.3);
  }
`;
document.head.appendChild(style);
