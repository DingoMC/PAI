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
    fetch('navlinks.json')
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
    fetch('karty.json')
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
    fetch('karty.json')
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
$(document).ready(function () {
    let path = window.location.pathname;
    let page = path.split('/').pop();
    if (page !== 'success.html') setNavContent();
    setFooterContent();
    if (page === 'index.html') setCardContent();
    if (page === 'kursy.html') setCourseList();
});