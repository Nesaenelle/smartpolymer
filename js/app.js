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

var LANG = 'ua';

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
        LANG = nextVal.toLowerCase();
        value.next().removeClass('active');
        translateRun();
    });
});

var translateConfig = {
    ua: {
        production: 'Продукция',
        about_company: 'О компании',
        partners: 'Партнеры',
        contacts: 'Контакты',
        back_to_site: 'вернуться на сайт',
        delivery_sales: 'Поставки и продажа <br> полимерного <br> сырья',
        meet_product: 'ОЗНАКОМИТЬCЯ С ПРОДУКЦИЕЙ',
        contact_us: 'СВЯЗАТЬСЯ С НАМИ',
        production_that_we_realize: 'Продукция реализуемая нашей компанией',
        product_1_name: 'Вспененный полистирол',
        product_2_name: 'Ударопрочный полистирол',
        product_3_name: 'Полистирол общего назначения',
        product_4_name: 'Термопластичный полимер пропилена',
        product_5_name: 'Линейный полиэтилен высокого давления',
        product_6_name: 'Полиэтилен низкого давления',
        product_7_name: 'Полиэтилен высокого давления',
        product_1_descr: 'Продукт имеет вид твердых шариков с молочно-белым цветом. Важными свойствами материала являются отличная термоизоляция, низкая теплопроводность. Применение полистирола различно и вариативно, благодаря его превосходному диапазону свойств, включая хорошую теплоизоляцию, хорошие демпфирующие свойства и чрезвычайно легкий вес.',
        product_2_descr: 'Лист HIPS обладает предельной устойчивостью к ударам и разрывам, хотя его можно модифицировать резиновой добавкой, чтобы повысить его долговечность. Он нашел применение в производстве корпусов телевизоров и оргтехники, канцелярских изделий, деталей салона автомобилей и в 3D печати',
        product_3_descr: 'Это прозрачный полимер, который обладает высокой жесткостью, хорошей стабильностью размеров, низким удельным весом и превосходными электрическими свойствами. Он обладает несколькими преимуществами по сравнению с другими полимерами из-за своей прозрачности и простоты обработки. Также имеет относительно низкую стоимость.',
        product_4_descr: 'Это термопластичный полимер многократного использования, который широко применяется во многих различных продуктах.Он прост в использовании, легкий и очень гибкий, имеет высокую температуру плавления и низкий уровень электропроводности. РР долговечен и устойчив к различным химическим растворителям, кислотам и основаниям. Идентификационный код смолы - PP - 5, и он пригоден для вторичной переработки.',
        product_5_descr: 'Полимер со значительным количеством коротких ответвлений, обычно получаемый сополимеризацией этилена с короткоцепными альфа-олефинами. Он имеет более высокую прочность к разрывам, чем LDPE, а также более высокую стойкость к ударам и проколам. LLDPE используется преимущественно в пленочных применениях благодаря своей прочности, гибкости и относительной прозрачности. Примеры продукции варьируются от сельскохозяйственных пленок, сарановой и пузырчатой пленок до многослойных и композитных пленок.',
        product_6_descr: 'Термопласт, изготовленный из нефти. Иногда его называют «алкатен» при использовании для изготовления труб. Благодаря высокому соотношению прочности и плотности HDPE используется при изготовлении пластиковых емкостей, коррозионностойких труб, геомембран и пластиковых пиломатериалов.',
        product_7_descr: 'Имеет хорошую химическую стойкость и электрические свойства, но обладает высоким тепловым расширением и имеет тенденцию к ухудшению при механических и тепловых нагрузках. Основными областями применения являются упаковочные пленки, мешки для мусора и сельскохозяйственная пленка, изоляция проводов и кабелей, игрушки и предметы домашнего обихода.',
        text_1: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>',
        successful_partners: 'Успешные деловые партнеры',
        text_2: '<p>Мы - одна из самых крупных и успешных компаний на рынке нефтехимического сырья. Компания успешно занимается поставками полимерных продуктов для государственных и частных предприятий различных отраслей промышленности на протяжении уже нескольких лет.</p><br><p>Мы доставим полиэтилен, полистирол и полипропилен по всей территории Украины быстро и в срок. Гибкая ценовая политика, возможность стабильных поставок сырья в любом количестве и индивидуальный подход к каждому покупателю создают прекрасные условия для долгосрочного сотрудничества с потребителями полимерного сырья. Правильно построенная организация складской логистики позволяет производить необходимое количество продукта во всех регионах Украины в кратчайшие сроки.</p><br><p>Наша компания всегда старается сглаживать негативные последствия колебаний рыночных цен для своих клиентов и делает сотрудничество взаимовыгодным и приятным благодаря хорошо организованной работе аналитического и финансового отделов компании. Наши сотрудники - это опытные профессионалы, успешные деловые партнеры и просто коммуникабельные люди, которые любят свое дело.</p>',
        shipments: 'Поставки со всего мира',
        text_3: 'Наша компания всегда стремится предоставить своим клиентам только лучшие материалы и широкий ассортимент продукции. Именно поэтому мы работаем с лучшими поставщиками полимерного сырья со всего мира:',
        you_could: 'Вы можете связаться с нами любым доступным способом',
        your_name: 'Ваше Имя',
        your_email: 'Ваш Email',
        write_to_us: 'Напишите нам',
        send: 'ОТПРАВИТЬ',
        office: 'Офис',
        phone: 'Телефоны',
        social: 'Social',
        address: 'Киев <br> ул. Юрия Ильенко 81 А</a>',
        subscribe: 'Подпишитесь на обновления',
        subscribe_and_be_updated: 'Подпишись и будь в курсе все событий',
        we_wont_annoy: 'Мы не будем вам надоедать частыми письмами'
    },
    ru: {
        production: 'Продукция',
        about_company: 'О компании',
        partners: 'Партнеры',
        contacts: 'Контакты',
        back_to_site: 'вернуться на сайт',
        delivery_sales: 'Поставки и продажа <br> полимерного <br> сырья',
        meet_product: 'ОЗНАКОМИТЬCЯ С ПРОДУКЦИЕЙ',
        contact_us: 'СВЯЗАТЬСЯ С НАМИ',
        production_that_we_realize: 'Продукция реализуемая нашей компанией',
        product_1_name: 'Вспененный полистирол',
        product_2_name: 'Ударопрочный полистирол',
        product_3_name: 'Полистирол общего назначения',
        product_4_name: 'Термопластичный полимер пропилена',
        product_5_name: 'Линейный полиэтилен высокого давления',
        product_6_name: 'Полиэтилен низкого давления',
        product_7_name: 'Полиэтилен высокого давления',
        product_1_descr: 'Продукт имеет вид твердых шариков с молочно-белым цветом. Важными свойствами материала являются отличная термоизоляция, низкая теплопроводность. Применение полистирола различно и вариативно, благодаря его превосходному диапазону свойств, включая хорошую теплоизоляцию, хорошие демпфирующие свойства и чрезвычайно легкий вес.',
        product_2_descr: 'Лист HIPS обладает предельной устойчивостью к ударам и разрывам, хотя его можно модифицировать резиновой добавкой, чтобы повысить его долговечность. Он нашел применение в производстве корпусов телевизоров и оргтехники, канцелярских изделий, деталей салона автомобилей и в 3D печати',
        product_3_descr: 'Это прозрачный полимер, который обладает высокой жесткостью, хорошей стабильностью размеров, низким удельным весом и превосходными электрическими свойствами. Он обладает несколькими преимуществами по сравнению с другими полимерами из-за своей прозрачности и простоты обработки. Также имеет относительно низкую стоимость.',
        product_4_descr: 'Это термопластичный полимер многократного использования, который широко применяется во многих различных продуктах.Он прост в использовании, легкий и очень гибкий, имеет высокую температуру плавления и низкий уровень электропроводности. РР долговечен и устойчив к различным химическим растворителям, кислотам и основаниям. Идентификационный код смолы - PP - 5, и он пригоден для вторичной переработки.',
        product_5_descr: 'Полимер со значительным количеством коротких ответвлений, обычно получаемый сополимеризацией этилена с короткоцепными альфа-олефинами. Он имеет более высокую прочность к разрывам, чем LDPE, а также более высокую стойкость к ударам и проколам. LLDPE используется преимущественно в пленочных применениях благодаря своей прочности, гибкости и относительной прозрачности. Примеры продукции варьируются от сельскохозяйственных пленок, сарановой и пузырчатой пленок до многослойных и композитных пленок.',
        product_6_descr: 'Термопласт, изготовленный из нефти. Иногда его называют «алкатен» при использовании для изготовления труб. Благодаря высокому соотношению прочности и плотности HDPE используется при изготовлении пластиковых емкостей, коррозионностойких труб, геомембран и пластиковых пиломатериалов.',
        product_7_descr: 'Имеет хорошую химическую стойкость и электрические свойства, но обладает высоким тепловым расширением и имеет тенденцию к ухудшению при механических и тепловых нагрузках. Основными областями применения являются упаковочные пленки, мешки для мусора и сельскохозяйственная пленка, изоляция проводов и кабелей, игрушки и предметы домашнего обихода.',
        text_1: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>',
        successful_partners: 'Успешные деловые партнеры',
        text_2: '<p>Мы - одна из самых крупных и успешных компаний на рынке нефтехимического сырья. Компания успешно занимается поставками полимерных продуктов для государственных и частных предприятий различных отраслей промышленности на протяжении уже нескольких лет.</p><br><p>Мы доставим полиэтилен, полистирол и полипропилен по всей территории Украины быстро и в срок. Гибкая ценовая политика, возможность стабильных поставок сырья в любом количестве и индивидуальный подход к каждому покупателю создают прекрасные условия для долгосрочного сотрудничества с потребителями полимерного сырья. Правильно построенная организация складской логистики позволяет производить необходимое количество продукта во всех регионах Украины в кратчайшие сроки.</p><br><p>Наша компания всегда старается сглаживать негативные последствия колебаний рыночных цен для своих клиентов и делает сотрудничество взаимовыгодным и приятным благодаря хорошо организованной работе аналитического и финансового отделов компании. Наши сотрудники - это опытные профессионалы, успешные деловые партнеры и просто коммуникабельные люди, которые любят свое дело.</p>',
        shipments: 'Поставки со всего мира',
        text_3: 'Наша компания всегда стремится предоставить своим клиентам только лучшие материалы и широкий ассортимент продукции. Именно поэтому мы работаем с лучшими поставщиками полимерного сырья со всего мира:',
        you_could: 'Вы можете связаться с нами любым доступным способом',
        your_name: 'Ваше Имя',
        your_email: 'Ваш Email',
        write_to_us: 'Напишите нам',
        send: 'ОТПРАВИТЬ',
        office: 'Офис',
        phone: 'Телефоны',
        social: 'Social',
        address: 'Киев <br> ул. Юрия Ильенко 81 А</a>',
        subscribe: 'Подпишитесь на обновления',
        subscribe_and_be_updated: 'Подпишись и будь в курсе все событий',
        we_wont_annoy: 'Мы не будем вам надоедать частыми письмами'
    },
    en: {
        production: 'Продукция',
        about_company: 'О компании',
        partners: 'Партнеры',
        contacts: 'Контакты',
        back_to_site: 'вернуться на сайт',
        delivery_sales: 'Поставки и продажа <br> полимерного <br> сырья',
        meet_product: 'ОЗНАКОМИТЬCЯ С ПРОДУКЦИЕЙ',
        contact_us: 'СВЯЗАТЬСЯ С НАМИ',
        production_that_we_realize: 'Продукция реализуемая нашей компанией',
        product_1_name: 'Вспененный полистирол',
        product_2_name: 'Ударопрочный полистирол',
        product_3_name: 'Полистирол общего назначения',
        product_4_name: 'Термопластичный полимер пропилена',
        product_5_name: 'Линейный полиэтилен высокого давления',
        product_6_name: 'Полиэтилен низкого давления',
        product_7_name: 'Полиэтилен высокого давления',
        product_1_descr: 'Продукт имеет вид твердых шариков с молочно-белым цветом. Важными свойствами материала являются отличная термоизоляция, низкая теплопроводность. Применение полистирола различно и вариативно, благодаря его превосходному диапазону свойств, включая хорошую теплоизоляцию, хорошие демпфирующие свойства и чрезвычайно легкий вес.',
        product_2_descr: 'Лист HIPS обладает предельной устойчивостью к ударам и разрывам, хотя его можно модифицировать резиновой добавкой, чтобы повысить его долговечность. Он нашел применение в производстве корпусов телевизоров и оргтехники, канцелярских изделий, деталей салона автомобилей и в 3D печати',
        product_3_descr: 'Это прозрачный полимер, который обладает высокой жесткостью, хорошей стабильностью размеров, низким удельным весом и превосходными электрическими свойствами. Он обладает несколькими преимуществами по сравнению с другими полимерами из-за своей прозрачности и простоты обработки. Также имеет относительно низкую стоимость.',
        product_4_descr: 'Это термопластичный полимер многократного использования, который широко применяется во многих различных продуктах.Он прост в использовании, легкий и очень гибкий, имеет высокую температуру плавления и низкий уровень электропроводности. РР долговечен и устойчив к различным химическим растворителям, кислотам и основаниям. Идентификационный код смолы - PP - 5, и он пригоден для вторичной переработки.',
        product_5_descr: 'Полимер со значительным количеством коротких ответвлений, обычно получаемый сополимеризацией этилена с короткоцепными альфа-олефинами. Он имеет более высокую прочность к разрывам, чем LDPE, а также более высокую стойкость к ударам и проколам. LLDPE используется преимущественно в пленочных применениях благодаря своей прочности, гибкости и относительной прозрачности. Примеры продукции варьируются от сельскохозяйственных пленок, сарановой и пузырчатой пленок до многослойных и композитных пленок.',
        product_6_descr: 'Термопласт, изготовленный из нефти. Иногда его называют «алкатен» при использовании для изготовления труб. Благодаря высокому соотношению прочности и плотности HDPE используется при изготовлении пластиковых емкостей, коррозионностойких труб, геомембран и пластиковых пиломатериалов.',
        product_7_descr: 'Имеет хорошую химическую стойкость и электрические свойства, но обладает высоким тепловым расширением и имеет тенденцию к ухудшению при механических и тепловых нагрузках. Основными областями применения являются упаковочные пленки, мешки для мусора и сельскохозяйственная пленка, изоляция проводов и кабелей, игрушки и предметы домашнего обихода.',
        text_1: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p><p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>',
        successful_partners: 'Успешные деловые партнеры',
        text_2: '<p>Мы - одна из самых крупных и успешных компаний на рынке нефтехимического сырья. Компания успешно занимается поставками полимерных продуктов для государственных и частных предприятий различных отраслей промышленности на протяжении уже нескольких лет.</p><br><p>Мы доставим полиэтилен, полистирол и полипропилен по всей территории Украины быстро и в срок. Гибкая ценовая политика, возможность стабильных поставок сырья в любом количестве и индивидуальный подход к каждому покупателю создают прекрасные условия для долгосрочного сотрудничества с потребителями полимерного сырья. Правильно построенная организация складской логистики позволяет производить необходимое количество продукта во всех регионах Украины в кратчайшие сроки.</p><br><p>Наша компания всегда старается сглаживать негативные последствия колебаний рыночных цен для своих клиентов и делает сотрудничество взаимовыгодным и приятным благодаря хорошо организованной работе аналитического и финансового отделов компании. Наши сотрудники - это опытные профессионалы, успешные деловые партнеры и просто коммуникабельные люди, которые любят свое дело.</p>',
        shipments: 'Поставки со всего мира',
        text_3: 'Наша компания всегда стремится предоставить своим клиентам только лучшие материалы и широкий ассортимент продукции. Именно поэтому мы работаем с лучшими поставщиками полимерного сырья со всего мира:',
        you_could: 'Вы можете связаться с нами любым доступным способом',
        your_name: 'Ваше Имя',
        your_email: 'Ваш Email',
        write_to_us: 'Напишите нам',
        send: 'ОТПРАВИТЬ',
        office: 'Офис',
        phone: 'Телефоны',
        social: 'Social',
        address: 'Киев <br> ул. Юрия Ильенко 81 А</a>',
        subscribe: 'Подпишитесь на обновления',
        subscribe_and_be_updated: 'Подпишись и будь в курсе все событий',
        we_wont_annoy: 'Мы не будем вам надоедать частыми письмами'
    }
};

function translateRun() {
    $('[data-translate]').each(function() {
        var translate = $(this).data('translate')
        var text = translateConfig[LANG][translate];
        $(this).html(text);
    });
}

translateRun();