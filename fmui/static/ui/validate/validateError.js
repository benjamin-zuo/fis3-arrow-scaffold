/**
 * 
 * @authors      Benjamin (cuew1987@gmail.com)
 * @link         https://github.com/benjamin-zuo
 * @date         2016-03-23 14:08:29
 * @description  Validate Error
 * @module       ValidateError
 */


var fmui = require('/static/ui/core/fmui');

(function(fmui, $, undefined) {

    fmui.define('ValidateError', {
        isNotShared: true,

        /**
         * 显示表单校验错误提示
         * @method show
         * @public
         * @param  {Object} ele 当前对象
         * @param  {String} msg 提示信息
         * @return this
         */
        show: function(ele, msg) {
            var $error, $item;

            if( this.has() ) {
                this._error.text(msg);
                return;
            }

            $error = $('<div class="fm-validate-error"></div>');
            $item  = $(ele).closest('.fm-list-item');

            this._error = $error;
            this._item  = $item;

            $error.text(msg);

            $item.addClass('fm-validate').after($error);

            return this.trigger('show');
        },

        /**
         * 销毁表单错误提示
         * @method destroy
         * @public
         * @return this
         */
        destroy: function() {
            var $error = this._error,
                $item  = this._item;

            $error ? $error.remove() : '';
            $item  ? $item.removeClass('fm-validate') : '';

            this._error = null;
            this._item  = null;

            return this.$super('destroy');
        },

        /**
         * 是否有错误提示
         * @method has
         * @public
         * @return {Boolean} true or false
         */
        has: function() {
            return !!this._error;
        }
    });
})(fmui, fmui.$);
