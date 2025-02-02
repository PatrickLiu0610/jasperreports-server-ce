/*
 * Copyright (C) 2005 - 2019 TIBCO Software Inc. All rights reserved.
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

import resourceDataType from '../../resource/resource.dataType';
import _ from 'underscore';
import $ from 'jquery';
import CalendarInputComponent from '../../components/components.calendarInput';
import jrsConfigs from 'js-sdk/src/jrs.configs';
import resource from '../../resource/resource.base';
import {isIPad} from "../../util/utils.common";

var options = jrsConfigs.addDataType.localContext.initOptions;
_.extend(window.localContext, jrsConfigs.addDataType.localContext);
_.extend(resource.messages, jrsConfigs.addDataType.resource.messages);
if (hasDateOrTimePickers()) {
    var minPicker = new CalendarInputComponent(jrsConfigs.addDataType.minValueText);
    minPicker.container = $('label.minPicker');
    minPicker.create();
    var maxPicker = new CalendarInputComponent(jrsConfigs.addDataType.maxValueText);
    maxPicker.container = $('label.maxPicker');
    maxPicker.create();
}
resourceDataType.initialize(options);
isIPad() && resource.initSwipeScroll();    //workraround to make jquery-ui work properly with 'jr' prefix
//workraround to make jquery-ui work properly with 'jr' prefix
$('body').addClass('jr');

function hasDateOrTimePickers() {
    return _.indexOf([
        3,
        4,
        5
    ], jrsConfigs.addDataType.type) > -1;
}