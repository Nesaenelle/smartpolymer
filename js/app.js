$('.form').on('submit', (e) => {
    e.preventDefault();

    var controls = [...e.target.elements].filter(r => r.localName === 'input');

    if (e.target.checkValidity()) {
        // var modalId = $(e.target).data('modal-id');
        e.target.reset();

        // openModal(modalId);
        e.target.classList.add('submitted');
        e.target.querySelector('.btn').innerText = 'ОТПРАВЛЕНО';
        controls.forEach(c => {
            resetValidaty(c);
        });
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
    // checkValidity(e.target);
    var controls = [...$(e.target).closest('form')[0].elements].filter(r => r.localName === 'input');
    controls.forEach(c => {
        checkValidity(c);
    });
    // var targetInput = controls.filter(r=> !r.classList.contains('success') || r.classList.contains('error'))[0];

    // if(targetInput) {
    //     $('.payment__step').eq(1).removeClass('active');
    // } else {
    //     $('.payment__step').eq(1).addClass('active');
    // }
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
    // $('.payment__step').eq(1).removeClass('active');
}


;
(function() {
    var $menuBtn = $('[data-menu-btn]');
    var $menu = $('[data-menu]');
    // var $nav = $('header nav');

    $menuBtn.on('click', function(e) {
        e.stopPropagation();
        $menuBtn.toggleClass('opened');
        $menu.toggleClass('opened');
        // $nav.toggleClass('opened');
    })


    window.addEventListener('click', function(e) {
        if (!$menu[0].contains(e.target)) {
            $menu.removeClass('opened');
            $menuBtn.removeClass('opened');
            // $nav.removeClass('opened');
        }

        if(e.target.localName === 'a' && $(e.target).closest('.dropdown-menu').length) {
            $menu.removeClass('opened');
            $menuBtn.removeClass('opened');
        }
    }, false);
})();


$('.go-btn-down').on('click', function() {
    var body = $("html, body");
    body.stop().animate({ scrollTop: window.innerHeight }, 500);
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



// ; (function () {
//     var elements = $('[data-animate]');
//     function update() {
//         elements.each(function (i, elem) {
//             if (isInViewport(elem, 150)) {
//                 if (!elem.getAttribute('data-animate')) {
//                     elem.setAttribute('data-animate', true);
//                 }
//             }
//         });
//     }

//     update();
//     window.addEventListener('scroll', function () {
//         update();
//     });


//     function isInViewport(el, offset) {
//         var top = el.offsetTop + offset;
//         var left = el.offsetLeft;
//         var width = el.offsetWidth;
//         var height = el.offsetHeight;

//         while (el.offsetParent) {
//             el = el.offsetParent;
//             top += el.offsetTop;
//             left += el.offsetLeft;
//         }

//         return (
//             top < (window.pageYOffset + window.innerHeight) &&
//             left < (window.pageXOffset + window.innerWidth) &&
//             (top + height) > window.pageYOffset &&
//             (left + width) > window.pageXOffset
//         );
//     };
// })();