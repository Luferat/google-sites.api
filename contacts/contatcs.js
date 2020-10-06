var siteName = location.search.replace('?', '');
function main() {
    $('#siteName').html(siteName);
    $(document).on('submit', '#contact', sendForm);
}
function sendForm() {
    var contact = {
        'name': $('#contact-name').val().trim(),
        'email': $('#contact-email').val().trim(),
        'subject': $('#contact-subject').val().trim(),
        'message': $('#contact-message').val().trim(),
        'date': new Date().toJSON(),
        'site': siteName
    }
    db.collection('contacts').add(contact)
        .then(function (docRef) {
            var msg = `<blockquote>Seu contato foi enviado com sucesso.</blockquote>`;
            feedback(contact.name, msg);
        })
        .catch(function (error) {
            var msg = `<p class="danger">Ocorreu uma faha que impediu o envio do seu contato.</p><p class="danger">A equipe do site já foi avisada sobre a falha.</p><p>Por favor, tente mais tarde.</p>`;
            feedback(contact.name, msg);
        });
    return false;
}
function feedback(name, msg) {
    var out = `<h4>Olá ${name}!</h4>${msg}<p><em>Obrigado...</em></p>`;
    $('#feedback').html(out);
    $('#contact').hide('fast');
    $('#feedback').show('fast');
}
$(document).ready(main);