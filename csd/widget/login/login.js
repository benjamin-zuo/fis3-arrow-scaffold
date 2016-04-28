var $ = require('fmui:components/zepto');

var notice = require('fmui:static/ui/notice/notice');

var form = require('fmui:static/ui/form/form');


$('body')

.on('tap', '[data-action]', function() {
    alert('CSD-form submit');
})