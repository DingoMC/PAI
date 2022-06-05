// Ładowanie stopki
function setFooterContent () {
    let footerHTML = '';
    fetch('../json/footer.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.footer.length; i++) {
            footerHTML += '<span>' + data.footer[i] + '</span>';
        }
        $('footer')[0].innerHTML = footerHTML;
    })
    .catch(console.error);
}
// Ładowanie nawigacji
function setNavContent () {
    fetch('../json/navlinks.json')
    .then(response => response.json())
    .then(data => {
        let innerHTML = '';
        for (let i = 0; i < data.links.length; i++) {
            innerHTML += '<li class="nav-item"><a class="nav-link" href="' + data.links[i].href + '">' + data.links[i].title + '</a></li>';
        }
        $('#navlinks')[0].innerHTML = innerHTML;
    })
    .catch(console.error);
}
// Ładowanie kart (index)
function setCardContent () {
    fetch('../json/cards.json')
    .then(response => response.json())
    .then(data => {
        let innerHTML = '';
        for (let i = 0; i < data.cards.length; i++) {
            innerHTML += '<div class="col-md-4 col-sm-6 mb-5"><div class="card h-100 ' + data.cards[i].title.toLowerCase() + '"><div class="card-body">';
            innerHTML += '<h2 class="card-title"><img src="zdjecia/' + data.cards[i].title.toLowerCase() + '.png" />' + data.cards[i].title + '</h2>';
            innerHTML += '<p class="card-text">' + data.cards[i].content + '</p>';
            innerHTML += '</div>';
            innerHTML += '<div class="card-footer"><a class="btn btn-primary btn-sm" target="blank" href="' + data.cards[i].url + '">Czytaj więcej...</a></div>';
            innerHTML += '</div></div>';
        }
        $('#cards')[0].innerHTML = innerHTML;
    })
    .catch(console.error);
}
// Ładowanie listy kursów (kursy)
function setCourseList () {
    fetch('../json/cards.json')
    .then(response => response.json())
    .then(data => {
        let innerHTML = '';
        for (let i = 0; i < data.cards.length; i++) {
            innerHTML += '<option '+ (i == 0 ? 'selected="selected"' : '') +' value="' + data.cards[i].title.toLowerCase() + '" >' + data.cards[i].title + '</option><span class="option">' + data.cards[i].title + '</span>';
        }
        $('#kurs')[0].innerHTML = innerHTML;
    })
    .catch(console.error);
}
// Lista kursów do edycji (admin)
function setEditCourseList (selectedOption) {
    fetch('../json/cards.json')
    .then(response => response.json())
    .then(data => {
        let innerHTML = '';
        for (let i = 0; i < data.cards.length; i++) {
            option = data.cards[i].title.toLowerCase();
            innerHTML += '<option '+ (option == selectedOption ? 'selected="selected"' : '') +' value="' + option + '" >' + data.cards[i].title + '</option>';
        }
        $('#course')[0].innerHTML = innerHTML;
    })
    .catch(console.error);
}
// Ładowanie nagłówków kolumn (admin)
function setColumnHeaders () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (xhr) {
        let url = '../json/columns.json';
        xhr.open("GET", url);
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4) {
                let cols = xhr.response;
                let innerHTML = '', tr2 = '';
                for (let i = 0; i < cols.names.length; i++) {
                    innerHTML += '<th>' + cols.names[i] + '</th>';
                    if (i < cols.names.length - 1) tr2 += '<th><div id="wrap"><input type="button" class="sort" onclick="SortBy(' + i + ')" value="Sortuj" /><div class="sorting-arrows"><div class="arrow-up inactive au-col-' + i + '"></div><div class="arrow-none an-col-' + i + '"></div><div class="arrow-down inactive ad-col-' + i + '"></div></div></div></th>';
                    else tr2 += '<th></th>';
                }
                $('#theaders')[0].innerHTML = innerHTML;
                $('#tr2')[0].innerHTML = tr2;
            }
        });
        xhr.send(null);
    }
}
// Ładowanie danych kontaktowych
function setContactData () {
    fetch('../json/contact.json')
    .then(response => response.json())
    .then(data => {
        let innerHTML = '<h4>Dane adresowe</h4>';
        innerHTML += '<p>' + data.address.street + ' ' + data.address.bn + '</p>';
        innerHTML += '<p>' + data.address.postal_code + ' ' + data.address.city + '</p>';
        innerHTML += '<h4>Dane teleadresowe</h4>';
        innerHTML += '<p>Telefon: ' + data.contact.phone + '</p>';
        innerHTML += '<p>E-mail: ' + data.contact.email + '</p>'
        $('#contact-info')[0].innerHTML = innerHTML;
    })
    .catch(console.error);
}
$(document).ready(function () {
    let path = window.location.pathname;
    let page = path.split('/').pop();
    if (page !== 'success.html') setNavContent();
    setFooterContent();
    if (page === 'index.html') setCardContent();
    if (page === 'kursy.html') setCourseList();
    if (page === 'admin.html') setColumnHeaders();
    if (page === 'admin.html') setEditCourseList();
    if (page === 'kontakt.html') setContactData();
});