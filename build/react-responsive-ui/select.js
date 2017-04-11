'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n\twrapper\n\t\t// Sometimes (e.g. when using mobile dropdown menus)\n\t\t// "position: relative" could be overridden to "static"\n\t\t// to allow for the menu stretching to full screen width.\n\t\t// Therefore it was moved to CSS from inline styles.\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\tlist\n\t\tlist-style-type : none\n\t\toverflow-x      : hidden\n\n\tselected\n\t\tbox-sizing : border-box\n\n\tselected_flex_wrapper\n\t\tdisplay     : flex\n\t\talign-items : center\n\n\tselected_label\n\t\tflex          : 1\n\t\toverflow      : hidden\n\t\ttext-overflow : ellipsis\n\n\tarrow\n\n\tseparator\n\t\tpadding     : 0\n\t\tline-height : 0\n\t\tfont-size   : 0\n\n\tlabel\n\t\tposition    : absolute\n\t\twhite-space : nowrap\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\t\t// Vertically align\n\t\tdisplay     : flex\n\t\talign-items : center\n\t\theight      : 100%\n\n\tnative_expanded_select_container\n\t\tdisplay : inline-block\n'], ['\n\twrapper\n\t\t// Sometimes (e.g. when using mobile dropdown menus)\n\t\t// "position: relative" could be overridden to "static"\n\t\t// to allow for the menu stretching to full screen width.\n\t\t// Therefore it was moved to CSS from inline styles.\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\tlist\n\t\tlist-style-type : none\n\t\toverflow-x      : hidden\n\n\tselected\n\t\tbox-sizing : border-box\n\n\tselected_flex_wrapper\n\t\tdisplay     : flex\n\t\talign-items : center\n\n\tselected_label\n\t\tflex          : 1\n\t\toverflow      : hidden\n\t\ttext-overflow : ellipsis\n\n\tarrow\n\n\tseparator\n\t\tpadding     : 0\n\t\tline-height : 0\n\t\tfont-size   : 0\n\n\tlabel\n\t\tposition    : absolute\n\t\twhite-space : nowrap\n\n\t\t-webkit-user-select : none\n\t\t-moz-user-select    : none\n\t\t-ms-user-select     : none\n\t\tuser-select         : none\n\n\t\t// Vertically align\n\t\tdisplay     : flex\n\t\talign-items : center\n\t\theight      : 100%\n\n\tnative_expanded_select_container\n\t\tdisplay : inline-block\n']); // https://github.com/halt-hammerzeit/react-responsive-ui/blob/master/source/select.js

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactStyling = require('react-styling');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('./misc/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Possible enhancements:
//
//  * If the menu is close to a screen edge,
//    automatically reposition it so that it fits on the screen
//  * Maybe show menu immediately above the toggler
//    (like in Material design), not below it.
//
// https://material.google.com/components/menus.html

var Empty_value_option_value = '';

var value_prop_type = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]);

var Select = function (_PureComponent) {
	(0, _inherits3.default)(Select, _PureComponent);

	function Select(props) {
		(0, _classCallCheck3.default)(this, Select);

		// Shouldn't memory leak because
		// the set of options is assumed to be constant.
		var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));

		_initialiseProps.call(_this);

		_this.options = {};

		var value = props.value,
		    autocomplete = props.autocomplete,
		    options = props.options,
		    children = props.children,
		    menu = props.menu,
		    toggler = props.toggler,
		    onChange = props.onChange;


		if (autocomplete) {
			if (!options) {
				throw new Error('"options" property is required for an "autocomplete" select');
			}

			_this.state.matching_options = _this.get_matching_options(options, value);
		}

		if (children && !menu) {
			_react2.default.Children.forEach(children, function (element) {
				if (!element.props.value) {
					throw new Error('You must specify "value" prop on each child of <Select/>');
				}

				if (!element.props.label) {
					throw new Error('You must specify "label" prop on each child of <Select/>');
				}
			});
		}

		if (menu && !toggler) {
			throw new Error('Supply a "toggler" component when enabling "menu" in <Select/>');
		}

		if (!menu && !onChange) {
			throw new Error('"onChange" property must be specified for <Select/>');
		}
		return _this;
	}

	// Client side rendering, javascript is enabled


	(0, _createClass3.default)(Select, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    fallback = _props.fallback,
			    nativeExpanded = _props.nativeExpanded;


			document.addEventListener('click', this.document_clicked);

			if (fallback) {
				this.setState({ javascript: true });
			}

			if (nativeExpanded) {
				this.resize_native_expanded_select();
				window.addEventListener('resize', this.resize_native_expanded_select);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(previous_props, previous_state) {
			var _props2 = this.props,
			    nativeExpanded = _props2.nativeExpanded,
			    value = _props2.value;
			var _state = this.state,
			    expanded = _state.expanded,
			    height = _state.height;


			if (expanded !== previous_state.expanded) {
				if (expanded && this.should_animate()) {
					if (height === undefined) {
						this.calculate_height();
					}
				}
			}

			// If the `value` changed then resize the native expanded `<select/>`
			if (nativeExpanded && value !== previous_props.value) {
				this.resize_native_expanded_select();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var nativeExpanded = this.props.nativeExpanded;


			document.removeEventListener('click', this.document_clicked);

			if (nativeExpanded) {
				window.removeEventListener('resize', this.resize_native_expanded_select);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props,
			    id = _props3.id,
			    upward = _props3.upward,
			    scroll = _props3.scroll,
			    children = _props3.children,
			    menu = _props3.menu,
			    toggler = _props3.toggler,
			    alignment = _props3.alignment,
			    autocomplete = _props3.autocomplete,
			    saveOnIcons = _props3.saveOnIcons,
			    fallback = _props3.fallback,
			    native = _props3.native,
			    nativeExpanded = _props3.nativeExpanded,
			    disabled = _props3.disabled,
			    placeholder = _props3.placeholder,
			    label = _props3.label,
			    error = _props3.error,
			    indicateInvalid = _props3.indicateInvalid,
			    style = _props3.style,
			    className = _props3.className;
			var _state2 = this.state,
			    expanded = _state2.expanded,
			    list_height = _state2.list_height;


			var options = this.get_options();

			var list_style = styles.list;

			// Makes the options list scrollable (only when not in `autocomplete` mode).
			if (this.is_scrollable() && this.state.list_height !== undefined) {
				list_style = (0, _extends3.default)({}, list_style, { maxHeight: list_height + 'px' });
			}

			var overflow = scroll && options && this.overflown();

			var list_items = void 0;

			// If a list of options is supplied as an array of `{ value, label }`,
			// then transform those elements to <buttons/>
			if (options) {
				list_items = options.map(function (_ref, index) {
					var value = _ref.value,
					    label = _ref.label,
					    icon = _ref.icon;

					return _this2.render_list_item({ index: index, value: value, label: label, icon: !saveOnIcons && icon, overflow: overflow });
				});
			}
			// Else, if a list of options is supplied as a set of child React elements,
			// then render those elements.
			else {
					list_items = _react2.default.Children.map(children, function (element, index) {
						if (!element) {
							return;
						}

						return _this2.render_list_item({ index: index, element: element });
					});
				}

			var wrapper_style = (0, _extends3.default)({}, styles.wrapper, { textAlign: alignment });

			var selected = this.get_selected_option();

			var markup = _react2.default.createElement(
				'div',
				{
					ref: function ref(_ref4) {
						return _this2.select = _ref4;
					},
					onKeyDown: this.on_key_down_in_container,
					style: style ? (0, _extends3.default)({}, wrapper_style, style) : wrapper_style,
					className: (0, _classnames2.default)('rrui__select', {
						'rrui__rich': fallback,
						'rrui__select--upward': upward,
						'rrui__select--expanded': expanded,
						'rrui__select--collapsed': !expanded,
						'rrui__select--disabled': disabled
					}, className) },
				!menu && !native && this.render_selected_item(),
				label && (this.get_selected_option() || placeholder) && _react2.default.createElement(
					'label',
					{
						htmlFor: id,
						className: (0, _classnames2.default)('rrui__input-label', {
							'rrui__input-label--invalid': error && indicateInvalid
						}),
						style: styles.label },
					label
				),
				menu && _react2.default.createElement(
					'div',
					{
						ref: function ref(_ref2) {
							return _this2.menu_toggler;
						},
						className: 'rrui__select__toggler' },
					_react2.default.cloneElement(toggler, { onClick: this.toggle })
				),
				!native && !nativeExpanded && _react2.default.createElement(
					'ul',
					{
						ref: function ref(_ref3) {
							return _this2.list = _ref3;
						},
						style: list_style,
						className: (0, _classnames2.default)('rrui__expandable', 'rrui__expandable--overlay', 'rrui__select__options', 'rrui__shadow', {
							'rrui__expandable--expanded': expanded,
							'rrui__select__options--expanded': expanded,
							'rrui__expandable--left-aligned': alignment === 'left',
							'rrui__expandable--right-aligned': alignment === 'right',
							'rrui__select__options--simple-left-aligned': !children && alignment === 'left',
							'rrui__select__options--simple-right-aligned': !children && alignment === 'right',
							// CSS selector performance optimization
							'rrui__select__options--upward': upward,
							'rrui__select__options--downward': !upward
						}) },
					list_items
				),
				(native || fallback && !this.state.javascript) && this.render_static(),
				error && indicateInvalid && _react2.default.createElement(
					'div',
					{ className: 'rrui__input-error' },
					error
				)
			);

			return markup;
		}
	}, {
		key: 'render_list_item',
		value: function render_list_item(_ref5) // , first, last
		{
			var _this3 = this;

			var index = _ref5.index,
			    element = _ref5.element,
			    value = _ref5.value,
			    label = _ref5.label,
			    icon = _ref5.icon,
			    overflow = _ref5.overflow;
			var _props4 = this.props,
			    disabled = _props4.disabled,
			    menu = _props4.menu,
			    scrollbarPadding = _props4.scrollbarPadding;
			var _state3 = this.state,
			    focused_option_value = _state3.focused_option_value,
			    expanded = _state3.expanded;

			// If a list of options is supplied as a set of child React elements,
			// then extract values from their props.

			if (element) {
				value = element.props.value;
			}

			var is_focused = !menu && value === focused_option_value;

			var item_style = void 0;

			// on overflow the vertical scrollbar will take up space
			// reducing padding-right and the only way to fix that
			// is to add additional padding-right
			//
			// a hack to restore padding-right taken up by a vertical scrollbar
			if (overflow && scrollbarPadding) {
				item_style = { marginRight: (0, _dom.get_scrollbar_width)() + 'px' };
			}

			var button = void 0;

			// If a list of options is supplied as a set of child React elements,
			// then enhance those elements with extra props.
			if (element) {
				var extra_props = {
					style: item_style ? (0, _extends3.default)({}, item_style, element.props.style) : element.props.style,
					className: (0, _classnames2.default)('rrui__select__option', {
						'rrui__select__option--focused': is_focused
					}, element.props.className)
				};

				var onClick = element.props.onClick;

				extra_props.onClick = function (event) {
					if (menu) {
						_this3.toggle();
					} else {
						_this3.item_clicked(value, event);
					}

					if (onClick) {
						onClick(event);
					}
				};

				button = _react2.default.cloneElement(element, extra_props);
			}
			// Else, if a list of options is supplied as an array of `{ value, label }`,
			// then transform those options to <buttons/>
			else {
					button = _react2.default.createElement(
						'button',
						{
							type: 'button',
							onClick: function onClick(event) {
								return _this3.item_clicked(value, event);
							},
							disabled: disabled,
							tabIndex: '-1',
							className: (0, _classnames2.default)('rrui__select__option', {
								'rrui__select__option--focused': is_focused,
								// CSS selector performance optimization
								'rrui__select__option--disabled': disabled
							}),
							style: item_style },
						icon && _react2.default.cloneElement(icon, { className: (0, _classnames2.default)(icon.props.className, 'rrui__select__option-icon') }),
						label
					);
				}

			var markup = _react2.default.createElement(
				'li',
				{
					key: get_option_key(value),
					ref: function ref(_ref6) {
						return _this3.options[get_option_key(value)] = _ref6;
					},
					className: (0, _classnames2.default)('rrui__expandable__content', 'rrui__select__options-list-item', {
						'rrui__select__separator-option': element && element.type === Select.Separator,
						'rrui__expandable__content--expanded': expanded,
						// CSS selector performance optimization
						'rrui__select__options-list-item--expanded': expanded
					}) },
				button
			);

			return markup;
		}

		// Renders the selected option
		// and possibly a transparent native `<select/>` above it
		// so that the native `<select/>` expands upon click
		// on the selected option
		// (in case of `nativeExpanded` setting).

	}, {
		key: 'render_selected_item',
		value: function render_selected_item() {
			var nativeExpanded = this.props.nativeExpanded;


			var selected = this.render_selected_item_only();

			if (!nativeExpanded) {
				return selected;
			}

			var markup = _react2.default.createElement(
				'div',
				{ style: styles.native_expanded_select_container },
				this.render_static(),
				selected
			);

			return markup;
		}
	}, {
		key: 'render_selected_item_only',
		value: function render_selected_item_only() {
			var _this4 = this;

			var _props5 = this.props,
			    children = _props5.children,
			    value = _props5.value,
			    placeholder = _props5.placeholder,
			    label = _props5.label,
			    disabled = _props5.disabled,
			    autocomplete = _props5.autocomplete,
			    concise = _props5.concise;
			var _state4 = this.state,
			    expanded = _state4.expanded,
			    autocomplete_width = _state4.autocomplete_width,
			    autocomplete_input_value = _state4.autocomplete_input_value;


			var selected = this.get_selected_option();
			var selected_label = this.get_selected_option_label();

			var selected_text = selected ? selected_label : placeholder || label;

			var style = styles.selected;

			if (autocomplete && expanded) {
				// style = { ...style, width: autocomplete_width + 'px' }

				var _markup = _react2.default.createElement('input', {
					type: 'text',
					ref: function ref(_ref7) {
						return _this4.autocomplete = _ref7;
					},
					placeholder: selected_text,
					value: autocomplete_input_value,
					onChange: this.on_autocomplete_input_change,
					onKeyDown: this.on_key_down,
					style: style,
					className: (0, _classnames2.default)('rrui__input', 'rrui__select__selected', 'rrui__select__selected--autocomplete', {
						'rrui__select__selected--nothing': !selected_label,
						// CSS selector performance optimization
						'rrui__select__selected--expanded': expanded,
						'rrui__select__selected--disabled': disabled
					}) });

				return _markup;
			}

			var markup = _react2.default.createElement(
				'button',
				{
					ref: function ref(_ref8) {
						return _this4.selected = _ref8;
					},
					type: 'button',
					disabled: disabled,
					onClick: this.toggle,
					onKeyDown: this.on_key_down,
					style: style,
					className: (0, _classnames2.default)('rrui__input', 'rrui__select__selected', {
						'rrui__select__selected--nothing': !selected_label
					}) },
				_react2.default.createElement(
					'div',
					{
						style: styles.selected_flex_wrapper,
						className: 'rrui__select__selected-content' },
					_react2.default.createElement(
						'div',
						{
							style: styles.selected_label,
							className: 'rrui__select__selected-label' },
						concise && selected && selected.icon ? _react2.default.cloneElement(selected.icon, { title: selected_label }) : selected_text
					),
					_react2.default.createElement('div', {
						className: (0, _classnames2.default)('rrui__select__arrow', {
							// CSS selector performance optimization
							'rrui__select__arrow--expanded': expanded
						}),
						style: styles.arrow })
				)
			);

			return markup;
		}

		// supports disabled javascript

	}, {
		key: 'render_static',
		value: function render_static() {
			var _this5 = this;

			var _props6 = this.props,
			    id = _props6.id,
			    name = _props6.name,
			    value = _props6.value,
			    label = _props6.label,
			    disabled = _props6.disabled,
			    options = _props6.options,
			    menu = _props6.menu,
			    toggler = _props6.toggler,
			    fallback = _props6.fallback,
			    nativeExpanded = _props6.nativeExpanded,
			    children = _props6.children;


			if (menu) {
				var _markup2 = _react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)({
							'rrui__rich__fallback': fallback
						}) },
					toggler
				);

				return _markup2;
			}

			var markup = _react2.default.createElement(
				'select',
				{
					ref: function ref(_ref9) {
						return _this5.native = _ref9;
					},
					id: id,
					name: name,
					value: value_is_empty(value) ? Empty_value_option_value : value,
					disabled: disabled,
					onChange: this.native_select_on_change,
					className: (0, _classnames2.default)('rrui__input', 'rrui__select__native', {
						'rrui__select__native-expanded': nativeExpanded,
						'rrui__rich__fallback': fallback
					}) },
				options ? this.render_native_select_options(options, value_is_empty(value)) : _react2.default.Children.map(children, function (child) {
					if (!child) {
						return;
					}

					var markup = _react2.default.createElement(
						'option',
						{
							className: 'rrui__select__native-option',
							key: child.props.value,
							value: child.props.value },
						child.props.label
					);

					return markup;
				})
			);

			return markup;
		}
	}, {
		key: 'render_native_select_options',
		value: function render_native_select_options(options, empty_option_is_selected) {
			var placeholder = this.props.placeholder;


			var empty_option_present = false;

			var rendered_options = options.map(function (option) {
				var value = option.value,
				    label = option.label;


				if (value_is_empty(value)) {
					empty_option_present = true;
					value = Empty_value_option_value;
				}

				var markup = _react2.default.createElement(
					'option',
					{
						className: 'rrui__select__native-option',
						key: get_option_key(value),
						value: value },
					label
				);

				return markup;
			});

			if (empty_option_is_selected && !empty_option_present) {
				rendered_options.unshift(_react2.default.createElement(
					'option',
					{
						className: 'rrui__select__native-option',
						key: get_option_key(undefined),
						value: '' },
					placeholder
				));
			}

			return rendered_options;
		}
	}, {
		key: 'get_selected_option',
		value: function get_selected_option() {
			var value = this.props.value;


			return this.get_option(value);
		}
	}, {
		key: 'get_option',
		value: function get_option(value) {
			var _props7 = this.props,
			    options = _props7.options,
			    children = _props7.children;


			if (options) {
				return options.filter(function (x) {
					return x.value === value;
				})[0];
			}

			var option = void 0;

			_react2.default.Children.forEach(children, function (child) {
				if (child.props.value === value) {
					option = child;
				}
			});

			return option;
		}
	}, {
		key: 'get_option_index',
		value: function get_option_index(option) {
			var _props8 = this.props,
			    options = _props8.options,
			    children = _props8.children;


			if (options) {
				return options.indexOf(option);
			}

			var option_index = void 0;

			_react2.default.Children.forEach(children, function (child, index) {
				if (child.props.value === option.value) {
					option_index = index;
				}
			});

			return option_index;
		}
	}, {
		key: 'get_selected_option_label',
		value: function get_selected_option_label() {
			var options = this.props.options;


			var selected = this.get_selected_option();

			if (!selected) {
				return;
			}

			if (options) {
				return selected.label;
			}

			return selected.props.label;
		}
	}, {
		key: 'overflown',
		value: function overflown() {
			var _props9 = this.props,
			    options = _props9.options,
			    maxItems = _props9.maxItems;


			return options.length > maxItems;
		}
	}, {
		key: 'scrollable_list_height',
		value: function scrollable_list_height() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
			var maxItems = this.props.maxItems;

			// (Adding vertical padding so that it shows these `maxItems` options fully)

			return (state.height - 2 * state.vertical_padding) * (maxItems / this.get_options().length) + state.vertical_padding;
		}
	}, {
		key: 'should_animate',
		value: function should_animate() {
			return true;

			// return this.props.options.length >= this.props.transition_item_count_min
		}
	}, {
		key: 'item_clicked',
		value: function item_clicked(value, event) {
			if (event) {
				event.preventDefault();
			}

			var _props10 = this.props,
			    disabled = _props10.disabled,
			    onChange = _props10.onChange,
			    autocomplete = _props10.autocomplete,
			    focusUponSelection = _props10.focusUponSelection;


			if (disabled) {
				return;
			}

			// Focus the toggler
			if (focusUponSelection) {
				if (autocomplete) {
					this.autocomplete.focus();
				} else {
					this.selected.focus();
				}
			}

			this.toggle(undefined, { callback: function callback() {
					return onChange(value);
				} });
		}

		// Would have used `onBlur()` handler here
		// with `container.contains(event.relatedTarget)`,
		// but it has an IE bug in React.
		// https://github.com/facebook/react/issues/3751
		//
		// Therefore, using the hacky `document.onClick` handlers
		// and this `onKeyDown` Tab handler
		// until `event.relatedTarget` support is consistent in React.
		//

	}, {
		key: 'get_options',
		value: function get_options() {
			var _props11 = this.props,
			    autocomplete = _props11.autocomplete,
			    autocompleteShowAll = _props11.autocompleteShowAll,
			    maxItems = _props11.maxItems,
			    options = _props11.options;
			var matching_options = this.state.matching_options;


			if (!autocomplete) {
				return options;
			}

			if (autocompleteShowAll) {
				return matching_options;
			}

			return matching_options.slice(0, maxItems);
		}

		// Get the previous option (relative to the currently focused option)

	}, {
		key: 'previous_focusable_option',
		value: function previous_focusable_option() {
			var options = this.get_options();
			var focused_option_value = this.state.focused_option_value;


			var i = 0;
			while (i < options.length) {
				if (options[i].value === focused_option_value) {
					if (i - 1 >= 0) {
						return options[i - 1];
					}
				}
				i++;
			}
		}

		// Get the next option (relative to the currently focused option)

	}, {
		key: 'next_focusable_option',
		value: function next_focusable_option() {
			var options = this.get_options();
			var focused_option_value = this.state.focused_option_value;


			var i = 0;
			while (i < options.length) {
				if (options[i].value === focused_option_value) {
					if (i + 1 < options.length) {
						return options[i + 1];
					}
				}
				i++;
			}
		}

		// Scrolls to an option having the value

	}, {
		key: 'scroll_to',
		value: function scroll_to(value) {
			var option_element = _reactDom2.default.findDOMNode(this.options[get_option_key(value)]);

			// If this option isn't even shown
			// (e.g. autocomplete)
			// then don't scroll to it because there's nothing to scroll to.
			if (!option_element) {
				return;
			}

			_reactDom2.default.findDOMNode(this.list).scrollTop = option_element.offsetTop;
		}

		// Fully shows an option having the `value` (scrolls to it if neccessary)

	}, {
		key: 'show_option',
		value: function show_option(value, gravity) {
			var option_element = _reactDom2.default.findDOMNode(this.options[get_option_key(value)]);
			var list = _reactDom2.default.findDOMNode(this.list);

			switch (gravity) {
				case 'top':
					if (option_element.offsetTop < list.scrollTop) {
						list.scrollTop = option_element.offsetTop;
					}
					return;

				case 'bottom':
					if (option_element.offsetTop + option_element.offsetHeight > list.scrollTop + list.offsetHeight) {
						list.scrollTop = option_element.offsetTop + option_element.offsetHeight - list.offsetHeight;
					}
					return;
			}
		}

		// Calculates height of the expanded item list

	}, {
		key: 'calculate_height',
		value: function calculate_height() {
			var options = this.props.options;


			var list_dom_node = _reactDom2.default.findDOMNode(this.list);
			var border = parseInt(window.getComputedStyle(list_dom_node).borderTopWidth);
			var height = list_dom_node.scrollHeight; // + 2 * border // inner height + 2 * border

			var vertical_padding = parseInt(window.getComputedStyle(list_dom_node.firstChild).paddingTop);

			// For things like "accordeon".
			//
			// const images = list_dom_node.querySelectorAll('img')
			//
			// if (images.length > 0)
			// {
			// 	return this.preload_images(list_dom_node, images)
			// }

			var state = { height: height, vertical_padding: vertical_padding, border: border };

			if (this.is_scrollable() && options && this.overflown()) {
				state.list_height = this.scrollable_list_height(state);
			}

			this.setState(state);
		}
	}, {
		key: 'is_scrollable',
		value: function is_scrollable() {
			var _props12 = this.props,
			    menu = _props12.menu,
			    autocomplete = _props12.autocomplete,
			    autocompleteShowAll = _props12.autocompleteShowAll,
			    scroll = _props12.scroll;


			return !menu && (autocomplete && autocompleteShowAll || !autocomplete) && scroll;
		}

		// This turned out not to work for `autocomplete`
		// because not all options are ever shown.
		// get_widest_label_width()
		// {
		// 	// <ul/> -> <li/> -> <button/>
		// 	const label = ReactDOM.findDOMNode(this.list).firstChild.firstChild
		//
		// 	const style = getComputedStyle(label)
		//
		// 	const width = parseFloat(style.width)
		// 	const side_padding = parseFloat(style.paddingLeft)
		//
		// 	return width - 2 * side_padding
		// }

	}, {
		key: 'get_matching_options',


		// // https://github.com/daviferreira/react-sanfona/blob/master/src/AccordionItem/index.jsx#L54
		// // Wait for images to load before calculating maxHeight
		// preload_images(node, images)
		// {
		// 	let images_loaded = 0
		//
		// 	const image_loaded = () =>
		// 	{
		// 		images_loaded++
		//
		// 		if (images_loaded === images.length)
		// 		{
		// 			this.setState
		// 			({
		// 				height: this.props.expanded ? node.scrollHeight : 0
		// 			})
		// 		}
		// 	}
		//
		// 	for (let i = 0; i < images.length; i += 1)
		// 	{
		// 		const image = new Image()
		// 		image.src = images[i].src
		// 		image.onload = image.onerror = image_loaded
		// 	}
		// }
		value: function get_matching_options(options, value) {
			// If the autocomplete value is `undefined` or empty
			if (!value) {
				return options;
			}

			value = value.toLowerCase();

			return options.filter(function (_ref10) {
				var label = _ref10.label,
				    verbose = _ref10.verbose;

				return (verbose || label).toLowerCase().indexOf(value) >= 0;
			});
		}
	}]);
	return Select;
}(_react.PureComponent);

Select.propTypes = {
	// A list of selectable options
	options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		// Option value (may be `undefined`)
		value: value_prop_type,
		// Option label (may be `undefined`)
		label: _react2.default.PropTypes.string,
		// Option icon
		icon: _react2.default.PropTypes.node
	})),

	// HTML form input `name` attribute
	name: _react.PropTypes.string,

	// Label which is placed above the select
	label: _react.PropTypes.string,

	// Placeholder (like "Choose")
	placeholder: _react.PropTypes.string,

	// Whether to use native `<select/>`
	native: _react.PropTypes.bool.isRequired,

	// Whether to use native `<select/>` when expanded
	nativeExpanded: _react.PropTypes.bool.isRequired,

	// Show icon only for selected item,
	// and only if `concise` is `true`.
	saveOnIcons: _react.PropTypes.bool,

	// Disables this control
	disabled: _react.PropTypes.bool,

	// Selected option value
	value: value_prop_type,

	// Is called when an option is selected
	onChange: _react.PropTypes.func,

	// (exotic use case)
	// Falls back to a plain HTML input
	// when javascript is disabled (e.g. Tor)
	fallback: _react.PropTypes.bool.isRequired,

	// CSS class
	className: _react.PropTypes.string,

	// CSS style object
	style: _react.PropTypes.object,

	// If this flag is set to `true`,
	// and `icon` is specified for a selected option,
	// then the selected option will be displayed
	// as icon only, without the label.
	concise: _react.PropTypes.bool,

	// If set to `true`, autocompletion is available
	// upon expanding the options list.
	autocomplete: _react.PropTypes.bool,

	// If set to `true`, autocomple will show all
	// matching options instead of just `maxItems`.
	autocompleteShowAll: _react.PropTypes.bool,

	// Options list alignment ("left", "right")
	alignment: _react.PropTypes.oneOf(['left', 'right']),

	// If `menu` flag is set to `true`
	// then it's gonna be a dropdown menu
	// with `children` elements inside.
	menu: _react.PropTypes.bool,

	// If `menu` flag is set to `true`
	// then `toggler` is the dropdown menu button.
	toggler: _react.PropTypes.element,

	// If `scroll` is `false`, then options list
	// is not limited in height.
	// Is `true` by default (scrollable).
	scroll: _react.PropTypes.bool.isRequired,

	// If this flag is set to `true`,
	// then the dropdown expands itself upward.
	// (as opposed to the default downward)
	upward: _react.PropTypes.bool,

	// Maximum items fitting the options list height (scrollable).
	// In case of `autocomplete` that's the maximum number of matched items shown.
	// Is `6` by default.
	maxItems: _react.PropTypes.number.isRequired,

	// Is `true` by default (only when the list of options is scrollable)
	scrollbarPadding: _react.PropTypes.bool,

	focusUponSelection: _react.PropTypes.bool.isRequired,

	onTabOut: _react.PropTypes.func,

	onToggle: _react.PropTypes.func

	// transition_item_count_min : PropTypes.number,
	// transition_duration_min : PropTypes.number,
	// transition_duration_max : PropTypes.number
};
Select.defaultProps = {
	alignment: 'left',
	scroll: true,
	maxItems: 6,
	scrollbarPadding: true,
	focusUponSelection: true,
	fallback: false,
	native: false,
	nativeExpanded: false

};

var _initialiseProps = function _initialiseProps() {
	var _this6 = this;

	this.state = {};

	this.native_select_on_change = function (event) {
		var onChange = _this6.props.onChange;


		var value = event.target.value;

		// Convert back from an empty string to `undefined`
		if (value === Empty_value_option_value) {
			// `null` is not accounted for, use `undefined` instead.
			value = undefined;
		}

		onChange(value);
	};

	this.resize_native_expanded_select = function () {
		// For some strange reason 1px on the right side of the `<select/>`
		// still falls through to the underlying selected option label.
		_reactDom2.default.findDOMNode(_this6.native).style.width = _reactDom2.default.findDOMNode(_this6.selected).offsetWidth + 1 + 'px';
	};

	this.toggle = function (event) {
		var toggle_options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		if (event) {
			// Don't navigate away when clicking links
			event.preventDefault();

			// Not discarding the click event because
			// other expanded selects may be listening to it.
			// // Discard the click event so that it won't reach `document` click listener
			// event.stopPropagation() // doesn't work
			// event.nativeEvent.stopImmediatePropagation()
		}

		var _props13 = _this6.props,
		    disabled = _props13.disabled,
		    autocomplete = _props13.autocomplete,
		    options = _props13.options,
		    value = _props13.value,
		    focusUponSelection = _props13.focusUponSelection,
		    onToggle = _props13.onToggle,
		    nativeExpanded = _props13.nativeExpanded;


		if (nativeExpanded) {
			return;
		}

		if (disabled) {
			return;
		}

		var expanded = _this6.state.expanded;


		if (!expanded && autocomplete) {
			_this6.setState({
				// The input value can't be `undefined`
				// because in that case React would complain
				// about it being an "uncontrolled input"
				autocomplete_input_value: undefined,
				matching_options: options
			});

			// if (!this.state.autocomplete_width)
			// {
			// 	this.setState({ autocomplete_width: this.get_widest_label_width() })
			// }
		}

		// Deferring expanding the select upon click
		// because document.onClick should finish first,
		// otherwise `event.target` may be detached from the DOM
		// and it would immediately toggle back to collapsed state.
		setTimeout(function () {
			_this6.setState({
				expanded: !expanded
			});

			if (!expanded && options) {
				// Focus either the selected option
				// or the first option in the list.

				var focused_option_value = value || options[0].value;

				_this6.setState({ focused_option_value: focused_option_value });

				// Scroll down to the focused option
				_this6.scroll_to(focused_option_value);
			}

			// If it's autocomplete, then focus <input/> field
			// upon toggling the select component.
			if (autocomplete && !toggle_options.dont_focus_after_toggle) {
				if (!expanded || expanded && focusUponSelection) {
					setTimeout(function () {
						// Focus the toggler
						if (expanded) {
							_this6.selected.focus();
						} else {
							_this6.autocomplete.focus();
						}
					}, 0);
				}
			}

			if (onToggle) {
				onToggle(!expanded);
			}

			if (toggle_options.callback) {
				toggle_options.callback();
			}
		}, 0);
	};

	this.document_clicked = function (event) {
		var autocomplete = _reactDom2.default.findDOMNode(_this6.autocomplete);
		var selected_option = _reactDom2.default.findDOMNode(_this6.selected);
		var options_list = _reactDom2.default.findDOMNode(_this6.list);

		// Don't close the select if its expander button has been clicked,
		// or if autocomplete has been clicked,
		// or if an option was selected from the list.
		if (options_list && options_list.contains(event.target) || autocomplete && autocomplete.contains(event.target) || selected_option && selected_option.contains(event.target)) {
			return;
		}

		_this6.setState({ expanded: false });

		var onToggle = _this6.props.onToggle;


		if (onToggle) {
			onToggle(false);
		}
	};

	this.on_key_down_in_container = function (event) {
		if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
			return;
		}

		var expanded = _this6.state.expanded;


		switch (event.keyCode) {
			// Toggle on Tab out
			case 9:
				if (expanded) {
					_this6.toggle(undefined, { dont_focus_after_toggle: true });

					var onTabOut = _this6.props.onTabOut;


					if (onTabOut) {
						onTabOut(event);
					}
				}
				return;
		}
	};

	this.on_key_down = function (event) {
		if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
			return;
		}

		var _props14 = _this6.props,
		    options = _props14.options,
		    value = _props14.value,
		    autocomplete = _props14.autocomplete;
		var _state5 = _this6.state,
		    expanded = _state5.expanded,
		    focused_option_value = _state5.focused_option_value;

		// Maybe add support for `children` arrow navigation in future

		if (options) {
			switch (event.keyCode) {
				// Select the previous option (if present) on up arrow
				case 38:
					event.preventDefault();

					var previous = _this6.previous_focusable_option();

					if (previous) {
						_this6.show_option(previous.value, 'top');
						return _this6.setState({ focused_option_value: previous.value });
					}

					return;

				// Select the next option (if present) on down arrow
				case 40:
					event.preventDefault();

					var next = _this6.next_focusable_option();

					if (next) {
						_this6.show_option(next.value, 'bottom');
						return _this6.setState({ focused_option_value: next.value });
					}

					return;

				// Collapse on Escape
				//
				// Maybe add this kind of support for "Escape" key in some future:
				//  hiding the item list, cancelling current item selection process
				//  and restoring the selection present before the item list was toggled.
				//
				case 27:
					// Collapse the list if it's expanded
					if (_this6.state.expanded) {
						_this6.toggle();

						// Restore focus when the list is collapsed
						setTimeout(function () {
							_this6.selected.focus();
						}, 0);
					}

					return;

				// on Enter
				case 13:
					// Choose the focused item on Enter
					if (expanded) {
						event.preventDefault();

						// If an item is focused
						// (which may not be a case
						//  when autocomplete is matching no items)
						// (still for non-autocomplete select
						//  it is valid to have a default option)
						if (_this6.get_options() && _this6.get_options().length > 0) {
							// Choose the focused item
							_this6.item_clicked(focused_option_value);
							// And collapse the select
							_this6.toggle();
						}
					}
					// Else it should have just submitted the form on Enter,
					// but it wouldn't because the select element activator is a <button/>
					// therefore hitting Enter while being focused on it just pushes that button.
					// So submit the enclosing form manually.
					else {
							if ((0, _dom.submit_parent_form)(_reactDom2.default.findDOMNode(_this6.select))) {
								event.preventDefault();
							}
						}

					return;

				// on Spacebar
				case 32:
					// Choose the focused item on Enter
					if (expanded) {
						// only if it it's an `options` select
						// and also if it's not an autocomplete
						if (_this6.get_options() && !autocomplete) {
							event.preventDefault();

							// `focused_option_value` could be non-existent
							// in case of `autocomplete`, but since
							// we're explicitly not handling autocomplete here
							// it is valid to select any options including the default ones.
							_this6.item_clicked(focused_option_value);
							_this6.toggle();
						}
					}
					// Expand the select otherwise
					else {
							event.preventDefault();
							_this6.toggle();
						}

					return;
			}
		}
	};

	this.on_autocomplete_input_change = function (event) {
		var options = _this6.props.options;

		var input = event.target.value;
		var matching_options = _this6.get_matching_options(options, input);

		_this6.setState({
			autocomplete_input_value: input,
			matching_options: matching_options,
			focused_option_value: matching_options.length > 0 ? matching_options[0].value : undefined
		});
	};
};

exports.default = Select;


Select.Separator = function (props) {
	return _react2.default.createElement('div', { className: 'rrui__select__separator', style: styles.separator });
};

var styles = (0, _reactStyling.flat)(_templateObject);

// There can be an `undefined` value,
// so just `{ value }` won't do here.
function get_option_key(value) {
	return value_is_empty(value) ? '@@rrui/select/undefined' : value;
}

function value_is_empty(value) {
	return value === null || value === undefined;
}
//# sourceMappingURL=select.js.map