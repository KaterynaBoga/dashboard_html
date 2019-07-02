$(function () {
    let $messenger = $('.js-messenger');

    if(!$messenger.length) {
        return;
    }

    let $contacts = $('.js-messenger-contacts');
    let $searchContactsInput = $('.js-messenger-search-contacts');
    let $messengerChat = $('.js-messenger-chat');
    let $body = $('body');
    let contactsRequest = null;
    let chatInterval = null;
    let activeThread = null;

    // setInterval(updateContacts, 15000);

    $searchContactsInput.on('input', function () {
       searchContacts($searchContactsInput.val());
    });

    $body.on('click', '.js-messenger-thread', function (event) {
        let $thread = $(event.currentTarget);
        activeThread = $thread.data('id');
        $('.js-messenger-thread').removeClass('active');
        $thread.addClass('active');
        if(chatInterval) {
            clearInterval(chatInterval);
            chatInterval = null;
        }
        updateChat($thread);
        // chatInterval = setInterval(function () {
        //     updateChat($thread);
        // }, 15000)
    });

    $body.on('submit', '.js-messenger-form', function (event) {
        event.preventDefault();

        let $form = $(event.currentTarget);
        $.post($form.attr('action'), $form.serialize(), function (data) {
            $messengerChat.html(data);
        });
    });

    $body.on('click', '.js-clear-chat', function (event) {
        event.preventDefault();

        let $link = $(event.currentTarget);
        $.get($link.attr('href'), function () {
            updateContacts();
        })
    });

    function updateContacts() {
        if($searchContactsInput.val()) {
            return
        }
        $contacts.load($contacts.data('url'));
        if(activeThread) {
            $contacts.find('.js-messenger-thread[data-id='+activeThread+']').addClass('active');
        }
    }

    function searchContacts(q) {
        if(contactsRequest) {
            contactsRequest.abort();
        }

        contactsRequest = $.get($searchContactsInput.data('url') + '?q=' + encodeURIComponent(q), function (data) {
            contactsRequest = null;
            $contacts.html(data);
        });
    }

    function updateChat($thread) {
        $messengerChat.load($thread.data('url'), function () {
            $messengerChat.each(function () {
                $(this).find('.chaat-mass-area').get(0).scrollTop = 5000000;
            })
        });
    }
});