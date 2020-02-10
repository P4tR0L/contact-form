/* --- global scripts v0.15 @pk - 10/02/20 --- */

jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /[a-z\s]+$/i.test(value);
}, "Wpisz tylko litery");

jQuery.validator.addMethod("valEmail", function (value, element, arg) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}, "Wpisz poprawny adres e-mail");


$("#contact-form").validate({
    rules: {
        name: {
            required: true,
            lettersonly: true
        },
        surname: {
            required: true,
            lettersonly: true
        },
        email_address: {
            required: true,
            valEmail: true
        },
        phone_number: {
            digits: true,
            minlength: 9,
            maxlength: 9
        },
        subject: {
            required: true
        },
        subject_custom: {
            required: true
        },
        message: {
            required: true,
            minlength: 20,
            maxlength: 80
        },
        terms_accept: {
            required: true
        }
    },
    messages: {
        name: {
            required: "Podaj imię"
        },
        surname: {
            required: "Podaj nazwisko"
        },
        email_address: {
            required: "Podaj adres e-mail"
        },
        phone_number: {
            digits: "Dozwolone są tylko cyfry",
            minlength: "Numer telefonu powinien się składać z 9 cyfr",
            maxlength: "Numer telefonu powinien się składać z 9 cyfr",
        },
        subject: {
            required: "Wybierz temat wiadomości"
        },
        subject_custom: {
            required: "Temat wiadomości jest wymagany"
        },
        message: {
            required: "Wpisz wiadomość",
            minlength: "Wiadomość musi zawierać minimum 20 znaków",
            maxlength: "Wiadomość nie może przekraczać 80 znaków"
        },
        terms_accept: {
            required: "Należy zaakceptować regulamin"
        }
    },
    submitHandler: function (form) {
        event.preventDefault();
        ajaxSubForm();
    }
});

function customSubject() {
    $('#subject').change(function () {
        let val = $(this).val();
        if (val == "Inny") {
            $('.custom-subject').show();
        } else {
            $('.custom-subject').hide();
        }
    })
}

function termsModal() {
    $('.terms-popup').click(function () {
        $('.terms-bg').css('display', 'flex');
    });
    $('.terms-modal-close').click(function () {
        $('.terms-bg').css('display', 'none');
    });
}

function infoBox() {
    $('.info-box-close').click(function () {
        $('.success-box').hide();
        $('.danger-box').hide();
        $('.danger-box p').text('');
    });
}

function ajaxSubForm() {
    const urlLink = "sendmail.php"
    const dataList = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        email: $('#email_address').val(),
        phone: $('#phone_number').val(),
        subject: $('#subject').val(),
        customsubject: $('#subject_custom').val(),
        message: $('#message').val()
    }

    $.ajax({
        type: 'post',
        url: urlLink,
        data: dataList,
        timeout: 10000,
        beforeSend: function () {
            $('.send-button').prop('disabled', true);
        },
        cache: false,
        success: function () {
            setTimeout(function () {
                $('#name').val('');
                $('#surname').val('');
                $('#email_address').val('');
                $('#phone_number').val('');
                $('#subject').val('');
                $('#subject_custom').val('');
                $('#message').val('');
                $('#message').val('');
                $('#terms_accept').prop('checked', false)
                $('.send-button').prop('disabled', false);
                $('.danger-box').hide();
                $('.success-box').show();
            }, 1000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            let errorMes = 'nastąpił nieoczekiwany problem. Spróbuj ponownie.';
            if (XMLHttpRequest.status == 400) {
                // Wrong request
                errorMes = 'podałeś błędne dane, sprawdź formularz. Spróbuj ponownie.';
            }
            else if (XMLHttpRequest.responseText == 'NOT_AUTHORIZED') {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                errorMes = 'nie jesteś upoważniony do tej czynności. Spróbuj ponownie.';
            }
            else if (XMLHttpRequest.readyState == 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                errorMes = 'wystąpił problem techniczny. Spróbuj ponownie.';
            }
            else if (XMLHttpRequest.readyState == 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                errorMes = 'wystąpił błąd sieci. Spróbuj ponownie.';
            }
            else if (textStatus == 'timeout') {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                errorMes = 'przekroczono czas oczekiwania. Spróbuj ponownie.';
            }

            let mess = "Przepraszamy, " + errorMes;
            if ($('.danger-box p').text('')) {
                $('.danger-box p').append(mess);
            }
            $('.danger-box').show();
        },
        complete: function () {
            setTimeout(function () {
                $('.send-button').prop('disabled', false);
            }, 3000);
        }
    });
};


customSubject();
termsModal();
infoBox();