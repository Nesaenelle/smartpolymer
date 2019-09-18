$('.form').on('submit', (e) => {
    e.preventDefault();

    var controls = [...e.target.elements].filter(r => r.localName === 'input');

    if (e.target.checkValidity()) {
        // var modalId = $(e.target).data('modal-id');
        e.target.reset();
        controls.forEach(c => {
            resetValidaty(c);
        });

        if(e.target.id === 'modal-form') {
            closeModal();
        }

        if(e.target.id === 'form') {
            e.target.classList.add('submitted');
            e.target.querySelector('.btn').innerText = 'ОТПРАВЛЕНО';
        }

    } else {
        var targetInput = controls.filter(r => !r.classList.contains('success') || r.classList.contains('error'))[0];
        if (targetInput) {
            checkValidity(targetInput);
            targetInput.focus();
            // targetInput.scrollIntoView({block: "center", behavior: "smooth"});
        }
    }
});

$('.form').on('input', function(e) {
    var controls = [...$(e.target).closest('form')[0].elements].filter(r => r.localName === 'input');
    controls.forEach(c => {
        checkValidity(c);
    });
});

function checkValidity(el) {
    if (el.checkValidity()) {
        $(el).addClass('success');
        $(el).removeClass('error');
    } else {
        $(el).addClass('error');
        $(el).removeClass('success');
    }
}

function resetValidaty(el) {
    $(el).removeClass('success');
    $(el).removeClass('error');
}


// ;
// (function() {
    var $menuBtn = $('[data-menu-btn]');
    var $menu = $('[data-menu]');

    $menuBtn.on('click', function(e) {
        e.stopPropagation();
        $menuBtn.toggleClass('opened');
        $menu.toggleClass('opened');
    })


    window.addEventListener('click', function(e) {
        if (!$menu[0].contains(e.target)) {
            $menu.removeClass('opened');
            $menuBtn.removeClass('opened');
        }

        if(e.target.localName === 'a' && $(e.target).closest('.dropdown-menu').length) {
            $menu.removeClass('opened');
            $menuBtn.removeClass('opened');
        }

        if(!$(e.target).closest('[data-language]').length) {
            $('[data-language-list]').removeClass('active');
        }
    }, false);
// })();


$('.go-btn-down').on('click', function() {
    $('header a[href="#products"]').click();
});

$('.go-btn-back').on('click', function() {
    var body = $("html, body");
    body.stop().animate({ scrollTop: 0 }, 500);
});

var tabs = $('[data-navigation]');
var links = $('header a[href]');
var goBtnBack = $('.go-btn-back');

window.addEventListener('scroll', () => {
    tabs.each((i, elem) => {
        if (isScrolledIntoView(elem, 110)) {
            var id = elem.getAttribute('data-navigation');
            links.each((i, link) => {
                if (link.getAttribute('href').substr(1) === id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    var productEl = $('.product-list__item').eq(3);

    if ((productEl.offset().top - $(window).height()) < $(window).scrollTop()) {
        goBtnBack.addClass('active');
    } else {
        goBtnBack.removeClass('active');
    }
}, false);


function isScrolledIntoView(elem, offsetVal = 0) {
  var docViewTop = window.pageYOffset;
  var docViewBottom = docViewTop + window.innerHeight;
  var elemTop = offset(elem).top;
  var elemBottom = elemTop + elem.clientHeight;
  return docViewTop >= elemTop - (offsetVal) /*- window.innerHeight*/ ; // /((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }


$('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var body = $("html, body");
    body.stop().animate({ scrollTop: $('[data-navigation="'+id.substr(1)+'"]').offset().top - $('header').height() }, 500);
});



function closeModal() {
    var overlay = $('.modal-overlay');
    $('.modal').removeClass('opened');
    overlay.removeClass('opened');
}

function openModal(e) {
    if(e.target) {
        var $target = $(e.currentTarget);
        var id = $target.data('modal');
    } else {
        var id = e;
    }

    var modal = $('[data-modal-id="'+id+'"]');
    var overlay = $('.modal-overlay');

    modal.addClass('opened');
    overlay.addClass('opened');
}

$('[data-close-btn]').on('click', function () {
    closeModal();
});

$('.modal-close').on('click', function () {
    closeModal();
});

$('.modal-overlay').on('click', function () {
    closeModal();
});

$('[data-modal]').on('click', function (e) {
    openModal(e);
});


$('[data-language]').each(function(i, item) {
    var items = $(item).find('[data-language-item]');
    var value =  $(item).find('[data-language-value]');

    value.on('click', function() {
        value.next().toggleClass('active')
    });

    items.on('click', function() {
        var prevVal = value.text();
        var nextVal = $(this).text();
        value.text(nextVal);
        $(this).text(prevVal);
        value.next().removeClass('active')
    });
})