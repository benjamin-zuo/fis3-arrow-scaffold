/**
 * @authors      XieWenBo
 * @contributors Benjamin
 * @email        https://github.com/futureUser,https://github.com/benjamin-zuo
 * @date         2016-04-22 15:18:43
 * @description  Slider轮播组件
 * 
 */
var fmui = require('/static/ui/core/fmui');

(function(fmui, $, undefined) {
	fmui.define('Slider', {
		/**
		 * @property {Number}        interval  动画间隔，默认2000，单位ms
		 * @property {Number}        speed     动画速度，默认600，单位ms
		 * @property {Boolean}       autoPlay  自动播放，默认true
		 * @property {Number}        index     初始化索引，默认0
		 * @property {Number|String} width     容器宽度，默认'auto'
		 * @property {Number|String} height    容器高度，默认'auto'
		 * @property {String}        direction 轮播方向，[RTL,LTR]，默认'RTL'
		 * @property {Boolean}       dots      圆点显示，默认true
		 */
		options: {
			interval: 2000,
			speed: 600,
			autoPlay: true,
			index: 0,
			width: 'auto',
			height: 'auto',
			direction: 'RTL',
			dots: true
		},
		/**
		 * 初始化
		 * @private
		 */
		_init: function() {
			var me = this,
				index = me._options.index,
				$el = me.getEl(),
				$items = $el.find('div.fm-slider-item');

			// 缓存数据
			me.data = {
				slider: $el,
				items: $items,
				now: index
			};

			if ($items.length < 3) {
				alert('轮播的图片不得小于三张');
				return false;
			}

			me._initLayout();
			me._initEvent();
		},
		/**
		 * 设置transform样式
		 * @private
		 */
		_translate: function(offset, time, index) {
			var index = index || false,
				obj = {},
				speed = time ? time : 0;

			obj['-webkit-transition'] = '-webkit-transform ' + speed + 'ms ease';
			obj['transition'] = 'transform ' + speed + 'ms ease';
			obj['-webkit-transform'] = 'translate3d(' + offset + 'px, 0px, 0px)';
			obj['transform'] = 'translate3d(' + offset + 'px, 0px, 0px)';

			if (index) {
				obj['z-index'] = index;
			}

			return obj;
		},
		/**
		 * 初始化css样式
		 * @private
		 */
		_initLayout: function() {
			var me = this,
				data = me.data,
				opts = me._options,
				slider = data.slider,
				parent = slider.parent(),
				translate = me._translate,
				width = data.width = opts.width == 'auto' ? parent.width() : opts.width,
				height = data.height = opts.height == 'auto' ? parent.height() : opts.height,
				items = data.items,
				length = items.length;


			slider.css({
				'width': width,
				'height': height
			})

			me._updateIndex(opts.direction);
			//初始化样式
			for (var i = 0; i < length; i++) {
				var _items = items.eq(i),
					obj;
				if (i == data.next) {
					obj = translate(width, 0, 9)
				} else if (i == data.prev) {
					obj = translate(0 - width, 0, 9);
				} else if (i == data.now) {
					obj = translate(0, 0, 9);
				} else {
					obj = translate(0, 0, 8);
				};

				_items.css($.extend({
					'width': width,
					'height': data.height
				}, obj));
			};
			//根据参数判断是否进行小圆点的初始化
			opts.dots && me._initDots();

			me._interval();
		},
		/**
		 * 更新索引
		 * @private
		 */
		_updateIndex: function(direction) {
			var data = this.data,
				length = data.items.length;
			data[direction == 'RTL' ? 'prev' : 'next'] = data.now == 0 ? length - 1 : data.now - 1;
			data[direction == 'RTL' ? 'next' : 'prev'] = data.now == length - 1 ? 0 : data.now + 1;
		},
		/**
		 * 重排
		 * @private
		 */
		_reflow: function(stockIndex, direction) {
			var me = this,
				data = me.data,
				width = data.width,
				translate = me._translate,
				items = data.items,
				opts = me._options,
				offset;

			me._doSlide(direction);
			items.eq(stockIndex).css(translate(0, 0, 8));

			data.now = direction == 'RTL' ? data.next : data.prev;
			me._updateIndex(opts.direction);

			offset = direction == 'RTL' ? width : 0 - width;
			items.eq(direction == 'RTL' ? data.next : data.prev).css(translate(offset, 0, 9));
			opts.dots && me._selectedDots();
		},
		/**
		 * 执行动画
		 * @private
		 */
		_doSlide: function(direction) {
			var me = this,
				data = me.data,
				width = data.width,
				items = data.items,
				offsetList = {
					now: {
						index: data.now,
						offset: {
							RTL: 0 - width,
							LTR: width,
							normal: 0
						}
					},
					prev: {
						index: data.prev,
						offset: {
							RTL: 0 - 2 * width,
							LTR: 0,
							normal: 0 - width
						}
					},
					next: {
						index: data.next,
						offset: {
							RTL: 0,
							LTR: 2 * width,
							normal: width
						}
					}
				};

			$.map(offsetList, function(value, key) {				
				items.eq(value['index']).css(me._translate(value['offset'][direction], me._options.speed))
			});
		},
		/**
		 * 初始化事件
		 * @private
		 */
		_initEvent: function() {
			var me = this,
				data = me.data,
				width = data.width,
				// 临界值
				flag = width / 10,
				slider = data.slider,
				start;

			//绑定 touchstart 事件
			slider.on('touchstart', function(e) {
				if (e.touches.length == 1) {
					clearInterval(me.timeout);
					start = e.targetTouches[0].clientX;
				}
			}).on('touchmove', function(e) {
				e.preventDefault();
				if (e.targetTouches.length == 1) {
					var slide = e.targetTouches[0].clientX - start,
						items = data.items,
						_obj = {};

					_obj[data.next] = width + slide;
					_obj[data.prev] = slide - width;
					_obj[data.now] = slide;

					$.map(_obj, function(value, key) {
						items.eq(key).css(me._translate(value, 0));
					});
				}
			}).on('touchend', function(e) {
				if (e.touches.length == 0) {
					var offset = e.changedTouches[0].clientX - start,
						left = offset < 0 && Math.abs(offset) >= flag,
						normal = (offset < 0 && Math.abs(offset) < flag) || (offset > 0 && offset < flag),
						right = offset > 0 && offset > flag,
						float = me._reflow;

					left && float.call(me, data.prev, 'RTL');
					right && float.call(me, data.next, 'LTR');

					normal && me._doSlide('normal');

					me._options.dots && me._selectedDots();

					me._interval();
				}
			})

			$(window).on($.support.orientation ? 'orientationchange' : 'resize', function(e) {
				clearInterval(me.timeout);

				me._initLayout();
			});
		},
		/**
		 * 圆点切换
		 * @private
		 */
		_selectedDots: function() {
			var data = this.data,
				item = data._$dots.find('.fm-slider-dots-item').eq(data.now);

			item.addClass('selected').siblings().removeClass('selected');
		},
		/**
		 * 开启定时器
		 * @private
		 */
		_interval: function() {
			var me = this,
				opts = me._options;
			opts.autoPlay && (me.timeout = setInterval(function() {
				var data = me.data,
					direction = opts.direction,
					stockIndex = direction == 'RTL' ? data.prev : data.next;
				me._reflow(stockIndex, direction);
			}, opts.interval))
		},
		/**
		 * 圆点初始化
		 * @private
		 */
		_initDots: function() {
			var me = this,
				data = this.data,
				slider = data.slider,
				dots = data._$dots,
				html = [];

			if(!dots){
				dots = data._$dots = $("<div class='fm-slider-dots'></div>");

				for (var i = 0,ilen = data.items.length; i < ilen; i++) {
					html.push("<div class='fm-slider-dots-item'></div>");
				};

				dots.html(html.join('\n'));
				slider.append(dots);

				me._options.dots && me._selectedDots();
			}

			dots.css({
				'left': (data.width - dots.width()) / 2
			});
		}
	})
})(fmui, fmui.$);