/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import $ from 'jquery';
import logger from "../../logging/logger";
import stdnav from '../stdnav';


let localLogger = logger.register("stdnavPluginWorkflowCard");
let version = '0.0.1';
let singleton = null;
let gserial = 0;

let StdnavPluginWorkflowCard = function StdnavPluginWorkflowCard() {
    gserial++;
    this.serial = gserial;
};

$.extend(StdnavPluginWorkflowCard.prototype, {
    zinit: function zinit(selector) {
        localLogger.debug('stdnavPluginWorkflowCard.init(' + selector + ')\n');
        return this;
    },
    activate: function activate() {
        this.behavior = {
            'ariaprep': [this, this._ariaPrep, null],
            'ariarefresh': [this, this._ariaRefresh, null],
            'right': [this, this._onRight, null],
            'left': [this, this._onLeft, null],
            'fixfocus': [this, this._fixFocus, null],
            'fixsuperfocus': [this, this._fixSuperfocus, null],
            'focusin': [this, this._onFocusIn, null],
            'inherit': true,
            'inheritable': true
        };
        stdnav.registerNavtype(this.navtype, this.behavior, this.navtype_tags);
    },
    deactivate: function deactivate() {
        stdnav.unregisterNavtype('list2', this.behavior);
    },
    _ariaPrep: function _ariaPrep(el) {
        this._ariaRefresh(el);
    },
    _ariaRefresh: function _ariaRefresh(el) {
        let $list = $(el);
        $list.attr('role', 'application');
        let label = $list.attr('aria-label');
        let labelledBy = $list.attr('aria-labelledby');
        let $items = $list.children('li');
        let itemPlural = $list.attr('js-itemplural');

        if (itemPlural === '' || !itemPlural) {
            itemPlural = 'items';
        }

        let allItemsAreLinks = false;

        if (stdnav.nullOrUndefined(label) && stdnav.nullOrUndefined(labelledBy)) {
            let allLinks = $items.find('a');

            if (allLinks.length === $items.length) {
                $list.attr('aria-label', 'List of ' + $items.length + ' links.');
                allItemsAreLinks = true;
            } else {
                $list.attr('aria-label', 'List of ' + $items.length + itemPlural);
            }
        }

        $.each($items, function (index, item) {
            let $item = $(item);
            let $itemLinks = $item.find('a');

            if ($itemLinks.length > 0) {
                $item.attr('role', 'link');
                let itemLabel = $item.attr('aria-label');
                let itemLabelledBy = $item.attr('aria-labelledby');

                if (stdnav.nullOrUndefined(itemLabel) && stdnav.nullOrUndefined(itemLabelledBy)) {
                    let itemText = $item.text();
                    let itemLinkText = $($itemLinks[0]).text();
                    itemLabel = itemText + '. ' + (index + 1) + ' of ' + $items.length + ' ' + itemPlural + '.';
                    $item.attr('aria-label', itemLabel);
                }
            }
        });
        return null;
    },
    _fixFocus: function _fixFocus(element) {
        let $el = $(element);

        if ($el.is("li")) {
            element = $el.find("button").eq(0)[0];
        }

        return element;
    },
    _fixSuperfocus: function _fixSuperfocus(element) {
        let newSuperfocus;
        let $closestList = $(element).closest('li');

        if ($closestList.length > 0) {
            newSuperfocus = $closestList[0];
        } else {
            newSuperfocus = null;
        }

        return newSuperfocus;
    },

    _onClick: function _onClick(element) {
        $(element).closest('li').focus();
        stdnav.setSubfocus(this._fixSubfocus(element));
    },

    _onFocusIn: function _onFocusIn(element) {
        let $el = $(element);

        if (!$el.is("li>div button")) {
            element = $el.closest("li>div").find("button")[0];
        }

        return element;
    },
    _onLeft: function _onLeft() {
        let currentPosition = $("li.superfocus button").index($("button.subfocus"));
        let newPosition = currentPosition - 1;
        let newSelectedButton = $("li.superfocus button").eq(newPosition);
        return newPosition >= 0 && newSelectedButton[0];
    },
    _onRight: function _onRight() {
        let currentPosition = $("li.superfocus button").index($("button.subfocus"));
        let newPosition = currentPosition + 1;
        let newSelectedButton = $("li.superfocus button").eq(newPosition);
        return newSelectedButton.length && newSelectedButton[0];
    }
});
$.extend(StdnavPluginWorkflowCard.prototype, {
    navtype: 'workflowCard',
    navtype_tags: ['li', 'button']
});

let stdnavPluginWorkflowCard = new StdnavPluginWorkflowCard();
export default stdnavPluginWorkflowCard;

