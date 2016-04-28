var $ = require('fmui:components/zepto');

require('fmui:static/ui/notice/notice');

require('fmui:static/ui/form/form');


$('body')

.on('tap', '[data-action]', function() {
    alert('CFQ-form submit');
})