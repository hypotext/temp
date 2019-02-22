/*
 * botui 0.3.4
 * A JS library to build the UI for your bot
 * https://botui.org
 *
 * Copyright 2018, Moin Uddin
 * Released under the MIT license.
 */

! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function() {
	return t.BotUI = e(t)
    }) : t.BotUI = e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";
    return function(e, n) {
	function o(t, e, n, o) {
	    return "<a class='botui-message-content-link' target='" + (o ? "blank" : "") + "' href='" + n + "'>" + e + "</a>"
	}

	function i(t) {
	    return t.replace(g.image, "<img class='botui-message-content-image' src='$2' alt='$1' />").replace(g.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>").replace(g.link, o)
	}

	function a(t, e) {
	    var n = document.createElement("script");
	    n.type = "text/javascript", n.src = t, e && (n.onload = e), document.body.appendChild(n)
	}

	function s(t) {
	    y.action.addMessage && m.message.human({
		delay: 100,
		content: t
	    }), y.action.show = !y.action.autoHide
	}

	function c(t) {
	    if (!t.loading && !t.content) throw Error('BotUI: "content" is required in a non-loading message object.');
	    t.type = t.type || "text", t.visible = !t.delay && !t.loading;
	    var e = y.messages.push(t) - 1;
	    return new Promise(function(n, o) {
		setTimeout(function() {
		    t.delay && (t.visible = !0, t.loading && (t.loading = !1)), n(e)
		}, t.delay || 0)
	    })
	}

	function u(t) {
	    return "string" == typeof t && (t = {
		content: t
	    }), t || {}
	}

	function r(t, e) {
	    for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
	}

	function l(t) {
	    if (!t.action && !t.actionButton && !t.actionText) throw Error('BotUI: "action" property is required.')
	}

	function h(t) {
	    return l(t), r({
		type: "text",
		cssClass: "",
		autoHide: !0,
		addMessage: !0
	    }, t), y.action.type = t.type, y.action.cssClass = t.cssClass, y.action.autoHide = t.autoHide, y.action.addMessage = t.addMessage, new Promise(function(e, n) {
		v = e, setTimeout(function() {
		    y.action.show = !0
		}, t.delay || 0)
	    })
	}
	if (n = n || {}, !e) throw Error("BotUI: Container id is required as first argument.");
	if (!document.getElementById(e)) throw Error("BotUI: Element with id #" + e + " does not exist.");
	if (!t.Vue && !n.vue) throw Error("BotUI: Vue is required but not found.");
	var d, f, v, p = {
	    debug: !1,
	    fontawesome: !0,
	    searchselect: !0
	},
	    m = {},
	    g = {
		icon: /!\(([^\)]+)\)/gim,
		image: /!\[(.*?)\]\((.*?)\)/gim,
		link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/gim
	    };
	t.Vue = t.Vue || n.vue;
	for (var b in p) n.hasOwnProperty(b) && (p[b] = n[b]);
	t.Promise || Promise || options.promise || a("https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js");
	var x = {
	    template: "<div class=\"botui botui-container\" v-botui-container><div class=\"botui-messages-container\"><div v-for=\"msg in messages\" class=\"botui-message\" :class=\"msg.cssClass\" v-botui-scroll><transition name=\"slide-fade\"><div v-if=\"msg.visible\" :class=\"[{human: msg.human, \'botui-message-content\': true}, msg.type]\"><span v-if=\"msg.type == \'text\'\" v-text=\"msg.content\" v-botui-markdown v-botui-scroll></span> <iframe v-if=\"msg.type == \'embed\'\" :src=\"msg.content\" frameborder=\"0\" allowfullscreen></iframe></div></transition><div v-if=\"msg.loading\" class=\"botui-message-content loading\"><i class=\"dot\"></i><i class=\"dot\"></i><i class=\"dot\"></i></div></div></div><div class=\"botui-actions-container\"><transition name=\"slide-fade\"><div v-if=\"action.show\" v-botui-scroll><form v-if=\"action.type == \'text\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\" action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button></form><form v-if=\"action.type == \'select\'\" class=\"botui-actions-select\" @submit.prevent=\"handle_action_select()\" :class=\"action.cssClass\"><i v-if=\"action.select.icon\" class=\"botui-icon botui-action-select-icon fa\" :class=\"\'fa-\' + action.select.icon\"></i><v-select v-if=\"action.select.searchselect && !action.select.multipleselect\" v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select><v-select v-else-if=\"action.select.searchselect && action.select.multipleselect\" multiple v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select> <select v-else v-model=\"action.select.value\" class=\"botui-actions-text-select\" :placeholder=\"action.select.placeholder\" :size=\"action.select.size\" :class=\"action.select.cssClass\" required v-focus><option v-for=\"option in action.select.options\" :class=\"action.select.optionClass\" v-bind:value=\"option.value\" :disabled=\"(option.value == \'\')?true:false\" :selected=\"(action.select.value == option.value)?\'selected\':\'\'\"> {{ option.text }}</option></select> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.select.button, \'botui-actions-select-submit\': !action.select.button}\"><i v-if=\"action.select.button && action.select.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.select.button.icon\"></i> <span>{{(action.select.button && action.select.button.label) || \'Ok\'}}</span></button></form><div v-if=\"action.type == \'button\'\" class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div><form v-if=\"action.type == \'buttontext\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\"action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button><div class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div></form></div></transition></div></div>",
	    data: function() {
		return {
		    action: {
			text: {
			    size: 30,
			    placeholder: "Write here .."
			},
			button: {},
			show: !1,
			type: "text",
			autoHide: !0,
			addMessage: !0
		    },
		    messages: []
		}
	    },
	    computed: {
		isMobile: function() {
		    return t.innerWidth && t.innerWidth <= 768
		}
	    },
	    methods: {
		handle_action_button: function(t) {
		    s(t.text);
		    var e = {
			type: "button",
			text: t.text,
			value: t.value
		    };
		    for (var n in t) t.hasOwnProperty(n) && "type" !== n && "text" !== n && "value" !== n && (e[n] = t[n]);
		    v(e)
		},
		handle_action_text: function() {
		    this.action.text.value && (s(this.action.text.value), v({
			type: "text",
			value: this.action.text.value
		    }), this.action.text.value = "")
		},
		handle_action_select: function() {
		    if (this.action.select.searchselect && !this.action.select.multipleselect) {
			if (!this.action.select.value.value) return;
			s(this.action.select.value[this.action.select.label]), v({
			    type: "text",
			    value: this.action.select.value.value,
			    text: this.action.select.value.text,
			    obj: this.action.select.value
			})
		    }
		    if (this.action.select.searchselect && this.action.select.multipleselect) {
			if (!this.action.select.value) return;
			for (var t = new Array, e = new Array, n = 0; n < this.action.select.value.length; n++) t.push(this.action.select.value[n].value), e.push(this.action.select.value[n][this.action.select.label]);
			s(e.join(", ")), v({
			    type: "text",
			    value: t.join(", "),
			    text: e.join(", "),
			    obj: this.action.select.value
			})
		    } else {
			if (!this.action.select.value) return;
			for (var n = 0; n < this.action.select.options.length; n++) this.action.select.options[n].value == this.action.select.value && (s(this.action.select.options[n].text), v({
			    type: "text",
			    value: this.action.select.value,
			    text: this.action.select.options[n].text
			}))
		    }
		}
	    }
	};
	t.Vue.directive("botui-markdown", function(t, e) {
	    "false" != e.value && (t.innerHTML = i(t.textContent))
	}), t.Vue.directive("botui-scroll", {
	    inserted: function(t) {
		f.scrollTop = f.scrollHeight
	    }
	}), t.Vue.directive("focus", {
	    inserted: function(t) {
		t.focus()
	    }
	}), t.Vue.directive("botui-container", {
	    inserted: function(t) {
		f = t
	    }
	}), d = new t.Vue({
	    components: {
		"bot-ui": x
	    }
	}).$mount("#" + e);
	var y = d.$children[0];
	return m.message = {
	    add: function(t) {
		return c(u(t))
	    },
	    bot: function(t) {
		return t = u(t), c(t)
	    },
	    human: function(t) {
		return t = u(t), t.human = !0, c(t)
	    },
	    get: function(t) {
		return Promise.resolve(y.messages[t])
	    },
	    remove: function(t) {
		return y.messages.splice(t, 1), Promise.resolve()
	    },
	    update: function(t, e) {
		var n = y.messages[t];
		return n.content = e.content, n.visible = !e.loading, n.loading = !!e.loading, Promise.resolve(e.content)
	    },
	    removeAll: function() {
		return y.messages.splice(0, y.messages.length), Promise.resolve()
	    }
	}, m.action = {
	    show: h,
	    hide: function() {
		return y.action.show = !1, Promise.resolve()
	    },
	    text: function(t) {
		return l(t), y.action.text = t.action, h(t)
	    },
	    button: function(t) {
		return l(t), t.type = "button", y.action.button.buttons = t.action, h(t)
	    },
	    select: function(t) {
		if (l(t), t.type = "select", t.action.label = t.action.label || "text", t.action.value = t.action.value || "", t.action.searchselect = t.action.searchselect || p.searchselect, t.action.multipleselect = t.action.multipleselect || !1, t.action.searchselect && "string" == typeof t.action.value)
		    if (t.action.multipleselect) {
			var e = t.action.value.split(",");
			t.action.value = new Array;
			for (var n = 0; n < t.action.options.length; n++)
			    for (var o = 0; o < e.length; o++) t.action.options[n].value == e[o] && t.action.value.push(t.action.options[n])
		    } else
			for (var n = 0; n < t.action.options.length; n++) t.action.options[n].value == t.action.value && (t.action.value = t.action.options[n]);
		return t.action.searchselect || t.action.options.unshift({
		    value: "",
		    text: t.action.placeholder
		}), y.action.button = t.action.button, y.action.select = t.action, h(t)
	    },
	    buttontext: function(t) {
		return l(t), t.type = "buttontext", y.action.button.buttons = t.actionButton, y.action.text = t.actionText, h(t)
	    }
	}, p.fontawesome && a("https://use.fontawesome.com/ea731dcb6f.js"), p.searchselect && a("https://unpkg.com/vue-select@2.4.0/dist/vue-select.js", function() {
	    Vue.component("v-select", VueSelect.VueSelect)
	}), p.debug && (m._botApp = d), m
    }
});
