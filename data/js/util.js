(function (n) {
	n.fn.navList = function () {
		var t = n(this);
		return $a = t.find("a"),
			b = [],
			$a.each(function () {
				var t = n(this),
					u = Math.max(0, t.parents("li").length - 1),
					i = t.attr("href"),
					r = t.attr("target");
				b.push('<a class="link depth-' + u + '"' + (typeof r != "undefined" && r != "" ? ' target="' + r + '"' : "") + (typeof i != "undefined" && i != "" ? ' href="' + i + '"' : "") + '><span class="indent-' + u + '"><\/span>' + t.text() + "<\/a>")
			}),
			b.join("")
	};
	n.fn.panel = function (t) {
		var u;
		if (this.length == 0) return i;
		if (this.length > 1) {
			for (u = 0; u < this.length; u++) n(this[u]).panel(t);
			return i
		}
		var i = n(this),
			e = n("body"),
			o = n(window),
			f = i.attr("id"),
			r;
		if (r = n.extend({
			delay: 0,
			hideOnClick: !1,
			hideOnEscape: !1,
			hideOnSwipe: !1,
			resetScroll: !1,
			resetForms: !1,
			side: null,
			target: i,
			visibleClass: "visible"
		},
			t), typeof r.target != "jQuery" && (r.target = n(r.target)), i._hide = function (n) {
				r.target.hasClass(r.visibleClass) && (n && (n.preventDefault(), n.stopPropagation()), r.target.removeClass(r.visibleClass), window.setTimeout(function () {
					r.resetScroll && i.scrollTop(0);
					r.resetForms && i.find("form").each(function () {
						this.reset()
					})
				},
					r.delay))
			},
			i.css("-ms-overflow-style", "-ms-autohiding-scrollbar").css("-webkit-overflow-scrolling", "touch"), r.hideOnClick) {
			i.find("a").css("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
			i.on("click", "a",
				function (t) {
					var e = n(this),
						u = e.attr("href"),
						o = e.attr("target");
					u && u != "#" && u != "" && u != "#" + f && (t.preventDefault(), t.stopPropagation(), i._hide(), window.setTimeout(function () {
						o == "_blank" ? window.open(u) : window.location.href = u
					},
						r.delay + 10))
				})
		}
		i.on("touchstart",
			function (n) {
				i.touchPosX = n.originalEvent.touches[0].pageX;
				i.touchPosY = n.originalEvent.touches[0].pageY
			});
		i.on("touchmove",
			function (n) {
				if (i.touchPosX !== null && i.touchPosY !== null) {
					var f = i.touchPosX - n.originalEvent.touches[0].pageX,
						t = i.touchPosY - n.originalEvent.touches[0].pageY,
						s = i.outerHeight(),
						h = i.get(0).scrollHeight - i.scrollTop();
					if (r.hideOnSwipe) {
						var e = !1,
							u = 20,
							o = 50;
						switch (r.side) {
							case "left":
								e = t < u && t > -1 * u && f > o;
								break;
							case "right":
								e = t < u && t > -1 * u && f < -1 * o;
								break;
							case "top":
								e = f < u && f > -1 * u && t > o;
								break;
							case "bottom":
								e = f < u && f > -1 * u && t < -1 * o
						}
						if (e) return i.touchPosX = null,
							i.touchPosY = null,
							i._hide(),
							!1
					} (i.scrollTop() < 0 && t < 0 || h > s - 2 && h < s + 2 && t > 0) && (n.preventDefault(), n.stopPropagation())
				}
			});
		i.on("click touchend touchstart touchmove",
			function (n) {
				n.stopPropagation()
			});
		i.on("click", 'a[href="#' + f + '"]',
			function (n) {
				n.preventDefault();
				n.stopPropagation();
				r.target.removeClass(r.visibleClass)
			});
		e.on("click touchend",
			function (n) {
				i._hide(n)
			});
		e.on("click", 'a[href="#' + f + '"]',
			function (n) {
				n.preventDefault();
				n.stopPropagation();
				r.target.toggleClass(r.visibleClass)
			});
		if (r.hideOnEscape) o.on("keydown",
			function (n) {
				n.keyCode == 27 && i._hide(n)
			});
		return i
	};
	n.fn.placeholder = function () {
		var i, t;
		if (typeof document.createElement("input").placeholder != "undefined") return n(this);
		if (this.length == 0) return t;
		if (this.length > 1) {
			for (i = 0; i < this.length; i++) n(this[i]).placeholder();
			return t
		}
		t = n(this);
		t.find("input[type=text],textarea").each(function () {
			var t = n(this); (t.val() == "" || t.val() == t.attr("placeholder")) && t.addClass("polyfill-placeholder").val(t.attr("placeholder"))
		}).on("blur",
			function () {
				var t = n(this);
				t.attr("name").match(/-polyfill-field$/) || t.val() == "" && t.addClass("polyfill-placeholder").val(t.attr("placeholder"))
			}).on("focus",
				function () {
					var t = n(this);
					t.attr("name").match(/-polyfill-field$/) || t.val() == t.attr("placeholder") && t.removeClass("polyfill-placeholder").val("")
				});
		t.find("input[type=password]").each(function () {
			var t = n(this),
				i = n(n("<div>").append(t.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, "type=text"));
			t.attr("id") != "" && i.attr("id", t.attr("id") + "-polyfill-field");
			t.attr("name") != "" && i.attr("name", t.attr("name") + "-polyfill-field");
			i.addClass("polyfill-placeholder").val(i.attr("placeholder")).insertAfter(t);
			t.val() == "" ? t.hide() : i.hide();
			t.on("blur",
				function (n) {
					n.preventDefault();
					var i = t.parent().find("input[name=" + t.attr("name") + "-polyfill-field]");
					t.val() == "" && (t.hide(), i.show())
				});
			i.on("focus",
				function (n) {
					n.preventDefault();
					var t = i.parent().find("input[name=" + i.attr("name").replace("-polyfill-field", "") + "]");
					i.hide();
					t.show().focus()
				}).on("keypress",
					function (n) {
						n.preventDefault();
						i.val("")
					})
		});
		t.on("submit",
			function () {
				t.find("input[type=text],input[type=password],textarea").each(function () {
					var t = n(this);
					t.attr("name").match(/-polyfill-field$/) && t.attr("name", "");
					t.val() == t.attr("placeholder") && (t.removeClass("polyfill-placeholder"), t.val(""))
				})
			}).on("reset",
				function (i) {
					i.preventDefault();
					t.find("select").val(n("option:first").val());
					t.find("input,textarea").each(function () {
						var t = n(this),
							i;
						t.removeClass("polyfill-placeholder");
						switch (this.type) {
							case "submit":
							case "reset":
								break;
							case "password":
								t.val(t.attr("defaultValue"));
								i = t.parent().find("input[name=" + t.attr("name") + "-polyfill-field]");
								t.val() == "" ? (t.hide(), i.show()) : (t.show(), i.hide());
								break;
							case "checkbox":
							case "radio":
								t.attr("checked", t.attr("defaultValue"));
								break;
							case "text":
							case "textarea":
								t.val(t.attr("defaultValue"));
								t.val() == "" && (t.addClass("polyfill-placeholder"), t.val(t.attr("placeholder")));
								break;
							default:
								t.val(t.attr("defaultValue"))
						}
					})
				});
		return t
	};
	n.prioritize = function (t, i) {
		var r = "__prioritize";
		typeof t != "jQuery" && (t = n(t));
		t.each(function () {
			var t = n(this),
				u,
				f = t.parent();
			if (f.length != 0) if (t.data(r)) {
				if (i) return;
				u = t.data(r);
				t.insertAfter(u);
				t.removeData(r)
			} else {
				if (!i) return;
				if (u = t.prev(), u.length == 0) return;
				t.prependTo(f);
				t.data(r, u)
			}
		})
	}
})(jQuery); (function ($) {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});
	$(function () {
		var $window = $(window),
			$document = $(document),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$footer = $('#footer');
		function removeLoadingClass() {
			$body.removeClass('is-loading-0');
			setTimeout(function () {
				$body.removeClass('is-loading-1')
			},
				1500)
		}
		$window.on('load',
			function () {
				setTimeout(removeLoadingClass, 100)
			});
		$('form').placeholder();
		var $panels = $wrapper.children('.panel'),
			locked = true;
		function setBackgroundImage($image, $img) {
			var position = $img.data('position');
			$image.css('background-image', 'url(' + $img.attr('src') + ')');
			if (position) $image.css('background-position', position);
			$img.hide()
		}
		$panels.not($panels.first()).addClass('inactive').hide();
		$panels.each(function () {
			var $this = $(this),
				$image = $this.children('.image'),
				$img = $image.find('img');
			setBackgroundImage($image, $img)
		});
		setTimeout(function () {
			locked = false
		},
			1250);
		$('a[href^="#"]').on('click',
			function (event) {
				var $this = $(this),
					id = $this.attr('href'),
					$panel = $(id),
					$ul = $this.parents('ul'),
					delay = 0;
				event.preventDefault();
				event.stopPropagation();
				if (locked) return;
				locked = true;
				$this.addClass('active');
				if ($ul.hasClass('spinX') || $ul.hasClass('spinY')) delay = 250;
				setTimeout(function () {
					$panels.addClass('inactive');
					$footer.addClass('inactive');
					setTimeout(function () {
						$panels.hide();
						$panel.show();
						$document.scrollTop(0);
						setTimeout(function () {
							$panel.removeClass('inactive');
							$this.removeClass('active');
							locked = false;
							$window.triggerHandler('--refresh');
							setTimeout(function () {
								$footer.removeClass('inactive')
							},
								250)
						},
							100)
					},
						350)
				},
					delay)
			});
		if (skel.vars.IEVersion < 12) {
			$window.on('--refresh',
				function () {
					$wrapper.css('height', 'auto');
					setTimeout(function () {
						var h = $wrapper.height(),
							wh = $window.height();
						if (h < wh) $wrapper.css('height', '100vh')
					},
						0);
					if (skel.vars.IEVersion < 10) {
						var $panel = $('.panel').not('.inactive'),
							$image = $panel.find('.image'),
							$content = $panel.find('.content'),
							ih = $image.height(),
							ch = $content.height(),
							x = Math.max(ih, ch);
						$image.css('min-height', x + 'px');
						$content.css('min-height', x + 'px')
					}
				});
			$window.on('load',
				function () {
					$window.triggerHandler('--refresh')
				});
			$('.spinX').removeClass('spinX');
			$('.spinY').removeClass('spinY')
		}
	})
})(jQuery);