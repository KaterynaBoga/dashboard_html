'use strict';

jQuery(document).ready(function(){

    $('[data-toggle="datepicker"]').datepicker();
//    $('.file-upload').file_upload();

    $('select.select2').select2();

    $("form.js-dropzone").each(function () {
        let $me = $(this);
        $me.dropzone({
            url: $me.attr('action'),
            paramName: $me.find('input').attr('name')
        });
    });

});
