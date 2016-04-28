/**
 * 
 * @authors      Benjamin (cuew1987@gmail.com)
 * @link         https://github.com/benjamin-zuo
 * @date         2016-03-21 17:22:19
 * @description  Form Validate 组件
 * @module       Validate
 */


var fmui = require('/static/ui/core/fmui');

(function(fmui, $, undefined) {

    require('./validateError');

    fmui.define('Validate', {
        /**
         * @property {Boolean}        required       是否必填项
         * @property {String|Array}   validType      校验类型
         * @property {String}         message        必填项提示信息
         * @property {Object}         rules          默认校验规则，可扩展
         */
        options: {
            required: false,

            validType: null,

            message: "该字段不能为空",

            rules: {
                tel: {
                    validator: function(value, param) {
                        return /^(?:13|14|15|17|18)\d{9}$/.test(value);
                    },
                    message: '请填写正确的手机号'
                },
                sms: {
                    validator: function(value, param) {
                        return new RegExp('^\\d{' + param[0] + '}$').test(value);
                    },
                    message: '请填写{0}位短信验证码'
                }
            }
        },

        /**
         * 初始化
         * @private
         */
        _init: function() {
            var me  = this,
                $el = me.getEl();

            me.on('ready', function() {
                $el.on('input.validate blur.validate', function(e) {
                    me._eventName = e.type;

                    // do validate
                    me._validate();
                });

                me._validError = $.validateError();

                // autoclear绑定事件
                $('body').on('tap', '.fm-list-clear', function() {
                    var $item = $(this).closest('.fm-list-item');
                    
                    $item.removeClass('fm-input-autoclear').find('input').val('');

                    // 移除错误提示
                    me._validError.destroy();
                });
            })   
        },

        /**
         * 执行校验
         * @private
         */
        _validate: function() {
            var me = this,

                $el = me.getEl(),

                $item = $el.closest('.fm-list-item'),

                opts, val, validType,

                _doValid = function(type) {
                    var result = /([a-zA-Z_]+)(.*)/.exec(type),
                        rule = opts.rules[result[1]],
                        param = eval(result[2]);

                    if (rule) {
                        // 验证不通过
                        if (!rule['validator'](val, param)) {
                            var message = rule["message"];

                            for (var i = 0, ilen = param ? param.length : 0; i < ilen; i++) {
                                message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
                            }

                            me._validError.show($el[0], message || $el.attr('placeholder'));

                            return false;
                        } else {
                            // 验证通过
                            me._validError.destroy();
                        }
                    }
                    return true;
                };

            opts = me._options;

            val = $el.val() ? $el.val().trim() : '';

            validType = opts.validType;


            // autoclear交互
            if(val) {
                !$item.hasClass('fm-input-autoclear') ? $item.addClass('fm-input-autoclear') : '';
            }else {
                $item.removeClass('fm-input-autoclear');
            }

            if(me._eventName == 'input') {
                // 无错误提示，用户输入不进行input监听
                if( !me._validError.has() ) {
                    return;
                }else {
                    // 出现为空错误提示时，再进行输入则清除空错误提示，不进行校验
                    if(me._requiredError) {
                        me._validError.destroy();
                        me._requiredError = false;
                        return;
                    }
                }
            }

            // 只读和禁用按钮不进行校验
            if ($el.prop('readonly') || $el.prop('disabled')) {
                // 移除提示信息
                me._validError.destroy();

                return true;
            }

            // required 处理
            opts.required = $el.prop('required') ? $el.prop('required') : opts.required;

            if(opts.required && !val) {
                // 显示错误提示
                me._validError.show($el[0], opts.message);

                me._requiredError = true;

                return false;
            }

            if(!opts.required && !val) return true;

            validType = typeof validType === 'string' ? [validType] : validType;

            // 数组
            for ( i = 0,ilen = Array.isArray(validType) ? validType.length : 0; i < ilen; i++) {
                if (!_doValid(validType[i])) {
                    return false;
                }
            }

            return true;
        },

        /**
         * 字段是否有效
         * @method isValid
         * @public
         * @return {Boolean} true or false
         *
         */
        isValid: function() {
            return this._validate();
        }
    })
})(fmui, fmui.$);

