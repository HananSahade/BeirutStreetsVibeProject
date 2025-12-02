$('.scroll-indicator').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#featured').offset().top
    }, 800);
});

$('.hero-buttons .btn-primary').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#street-of-week').offset().top
    }, 800);
});

$('.hero-buttons .btn-outline').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#featured').offset().top
    }, 800);
});

$('.feature-card').hover(
    function() {
        $(this).css('transform', 'translateY(-5px)');
    },
    function() {
        $(this).css('transform', 'translateY(0)');
    }
);

$('.featured-image-card').on('click', function() {
    const imgSrc = $(this).find('img').attr('src');
    const title = $(this).find('h3').text();
    
    const modal = $('<div>', {
        class: 'image-modal',
        css: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            padding: '20px'
        }
    });

    const img = $('<img>', {
        src: imgSrc,
        css: {
            maxWidth: '90%',
            maxHeight: '80%',
            borderRadius: '12px',
            boxShadow: '0 0 50px rgba(255, 204, 0, 0.3)'
        }
    });

    const titleEl = $('<h2>', {
        text: title,
        css: {
            color: 'hsl(45, 100%, 55%)',
            marginTop: '20px',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '2rem',
            letterSpacing: '2px'
        }
    });

    modal.append(img).append(titleEl);
    $('body').append(modal);

    modal.hide().fadeIn(300);

    modal.on('click', function() {
        $(this).fadeOut(300, function() {
            $(this).remove();
        });
    });
});

$('#contact-form').on('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        location: $('#location').val(),
        message: $('#message').val()
    };

    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    
    submitBtn.prop('disabled', true).html('Sending...');

    setTimeout(function() {
        showNotification('Thank you! Your story has been submitted successfully!', 'success');
        $('#contact-form')[0].reset();
        submitBtn.prop('disabled', false).html(originalText);
    }, 1500);
});

function showNotification(message, type) {
    const notification = $('<div>', {
        class: 'notification',
        text: message,
        css: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            backgroundColor: type === 'success' ? 'hsl(120, 70%, 50%)' : 'hsl(0, 70%, 50%)',
            color: 'white',
            fontWeight: '600',
            zIndex: 10000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            maxWidth: '300px'
        }
    });

    $('body').append(notification);
    notification.hide().fadeIn(300);

    setTimeout(function() {
        notification.fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}

function checkScroll() {
    $('.feature-card, .featured-image-card, .week-card').each(function() {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            $(this).addClass('animate-fade-in');
        }
    });
}

checkScroll();

$(window).on('scroll', function() {
    checkScroll();
});

$('.footer-links a').hover(
    function() {
        $(this).css('padding-left', '5px');
    },
    function() {
        $(this).css('padding-left', '0');
    }
);

$('.week-card .btn-gradient').on('click', function() {
    showNotification('Interactive map feature coming soon!', 'success');
});

$(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('.hero-section').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
});

