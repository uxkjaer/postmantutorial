/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides helper sap.m.BadgeEnabler
sap.ui.define(
	['sap/m/BadgeCustomData', 	'sap/base/Log'],
	function(BadgeCustomData, Log) {
		"use strict";

		var IBADGE_CSS_CLASS = "sapMBadge";

		var IBADGE_POSITION_CLASSES = {
			topLeft: "sapMBadgeTopLeft",

			topRight: "sapMBadgeTopRight",

			inline: "sapMBadgeInline"
		};

		/**
		 * @class A helper class for implementing the {@link sap.m.IBadge} interface.
		 *
		 * The class represents a utility for visualising and updating the <code>badge</code> indicator for
		 * <code>sap.ui.core.Control</code> instances. It should be created once per <code>IBadge</code> instance.
		 *
		 * On its initialization, <codeBadgeEnabler</code> can accept a settings object.
		 * The settings object contains the following properties:
		 *
		 * <ul>
		 * <li><code>position</code> - accepts three predefined string values which
		 * add relative CSS classes to the badge element and position it accordingly:
		 * <code>topLeft</code>, <code>topRight</code> and <code>inline</code></li>
		 *
		 * <li><code>accentColor</code> - accepts string values equal to theme-specific accent colors.
		 * For more information, see the
		 * {@link https://experience.sap.com/fiori-design-web/quartz-light-colors/#accent-colors
		 * SAP Fiori Design Guidelines}.</li>
		 *
		 * <li><code>selector</code> - accepts Object, containing one property which is named either
		 * <code>selector</code> or <code>suffix</code>. If no selector is passed, the main ID of the
		 * control is automatically set as selector value.</li>
		 * </ul>
		 *
		 * @since 1.80
		 * @protected
		 * @alias sap.m.IBadgeEnabler
		 */
		var BadgeEnabler = function () {

			// Ensure only Controls are enhanced
			if (typeof this.isA !== "function" || !this.isA("sap.ui.core.Control")) {
				Log.error("Badge enablement could be applied over controls only");
				return;
			}

			// Attaching configuration and eventDelegate
			this.initBadgeEnablement = function (oConfig) {
				this._oBadgeConfig = oConfig;
				this.addEventDelegate({
					onAfterRendering: _renderBadgeDom
				}, this);
			};

			//Selects specific DOM element, for the badge to be applied in
			function _getContainerDomElement(oContainerSelector, oControl) {
				if (oContainerSelector.suffix) {
					return oControl.$(oContainerSelector.suffix);
				}
				if (oContainerSelector.selector) {
					return oControl.$().find(oContainerSelector.selector).first();
				}
			}

			//Adding badge DOM element
			function _renderBadgeDom() {

				this._isBadgeAttached = false;

				if (!this.getBadgeCustomData() || !isValidValue(this.getBadgeCustomData().getValue())) {
					return false;
				}

				this._oBadgeContainer = this._oBadgeConfig && this._oBadgeConfig.selector ?
					_getContainerDomElement(this._oBadgeConfig.selector, this) :
					this.$();
				var _oNode = jQuery('<div></div>').addClass(IBADGE_CSS_CLASS + "Indicator");
				_oNode.attr("id", this.getId() + IBADGE_CSS_CLASS);
				_oNode.attr("data-badge", this._oBadgeCustomData.getValue());
				_oNode.appendTo(this._oBadgeContainer);
				this._oBadgeContainer.addClass(IBADGE_CSS_CLASS);

				this._isBadgeAttached = true;

				if (!this._oBadgeConfig) {
					return this;
				}

				if (this._oBadgeConfig.position) {
					this._oBadgeContainer.addClass(IBADGE_POSITION_CLASSES[this._oBadgeConfig.position]);
				}

				if (this._oBadgeConfig.accentColor) {
					this._oBadgeContainer.addClass(IBADGE_CSS_CLASS + this._oBadgeConfig.accentColor);
				}

				return this;
			}

			//removing badge DOM element
			function _removeBadgeDom() {
				this._oBadgeContainer.removeClass(IBADGE_CSS_CLASS);
				jQuery("#" + this.getId() + IBADGE_CSS_CLASS).remove();
				this._isBadgeAttached = false;

				return this;
			}

			//Manually updating the 'span', containing badge
			this.updateBadge = function (sValue) {
				if (isValidValue(sValue)) {
					if (this._isBadgeAttached) {
						jQuery('#' + this.getId() + IBADGE_CSS_CLASS).attr("data-badge", sValue);
					} else {
						_renderBadgeDom.call(this);

					}
				} else if (this._isBadgeAttached) {
					_removeBadgeDom.call(this);
				}
			};

			//Validating the input for the badge
			function isValidValue (sValue) {
				return sValue !== undefined && sValue !== "undefined" && sValue !== "";
			}

			// Override for the initial 1..n aggregation method for adding new one,
			//to make it 1:1
			this.addCustomData = function (oCustomData) {
				if (oCustomData.isA("sap.m.BadgeCustomData")) {

					this.removeAggregation("customData", this._oBadgeCustomData, true);
					this._oBadgeCustomData = oCustomData;


					this.addAggregation("customData", oCustomData, true);
					return this.updateBadge(oCustomData.getValue());
				}

				return this.addAggregation("customData", oCustomData);
			};

			// Override for the initial 1..n aggregation method for inserting new one,
			//to make it 1:1
			this.insertCustomData = function (oCustomData) {
				if (oCustomData.isA("sap.m.BadgeCustomData")) {

					this.updateBadge(oCustomData.getValue());
					this.removeAggregation("customData", this._oBadgeCustomData, true);
					this._oBadgeCustomData = oCustomData;

					return this.addAggregation("customData", oCustomData, true);
				}

				return this.insertAggregation("customData", oCustomData);
			};

			this.getBadgeCustomData = function () {
				var oBadgeCustomData = this.getCustomData().filter(function(item) {return item instanceof BadgeCustomData;});
				return oBadgeCustomData.length ? oBadgeCustomData[0] : undefined;
			};

			this.removeBadgeCustomData = function () {
				var oBadgeCustomData;
				oBadgeCustomData = this._oBadgeCustomData;
				this._oBadgeCustomData = null;
				this.updateBadge();
				return this.removeAggregation("customData", oBadgeCustomData, true);
			};

		};
	return BadgeEnabler;
});
