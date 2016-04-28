/**
 * 
 * @authors      Benjamin (cuew1987@gmail.com)
 * @link         https://github.com/benjamin-zuo
 * @date         2016-03-21 17:03:51
 * @description  Form组件
 * @module       Form
 */

var fmui = require('/static/ui/core/fmui');

(function(fmui, $, undefined) {
    require('/static/ui/validate/validate');

    fmui.define('Form', {
        /**
         * 初始化
         * @private
         */
        _init: function() {
            var me = this,
                $el = this.getEl();

            me.on('ready', function() {
                $el.attr('novalidate', 'novalidate');

                me._validError = $.validateError();
            }) 
        },

        /**
         * 表单字段校验
         * @method validate
         * @public
         * @return {Boolean} true or false
         */
        validate: function() {
            var me = this,

                $el = this.getEl(),

                supportValidate = !!$.fn.validate,

                params = $el.serializeArray(),

                param, name, value, type, required, $ele,

                i = 0,

                ilen = params.length;

            for (; i < ilen; i++) {

                param = params[i];

                name = param.name;

                $ele = $el.find('[name=' + name + ']');

                if (!$ele.length || !supportValidate) continue;

                type = $ele[0].type;

                switch (type) {
                    case 'select-one':
                    case 'select-multiple':
                        if(!$ele.prop('required') ) {
                            continue;
                        }else {
                            if( $.trim(param.value) ) {
                                continue;
                            }else {
                                var msg = '请选择' + $ele.closest('.fm-list-item').find('.fm-list-label').text();

                                me._validError.show($ele[0], msg);

                                // 绑定事件
                                $ele.on('change', function() {
                                    var $t = $(this);
                                    if ( $t.val() ) {
                                        // 移除
                                        me._validError.destroy();
                                        $t.off();
                                    }
                                });

                                return false;
                            }
                        }
                        break;
                    case 'hidden':
                    case 'text':
                    case 'password':
                    case 'tel':
                    case 'number':
                        if ($ele.validate && $ele.validate('isValid')) {
                            continue;
                        } else {
                            return false;
                        }
                        break;
                }
            }
            return true;
        }
    });

})(fmui, fmui.$);


