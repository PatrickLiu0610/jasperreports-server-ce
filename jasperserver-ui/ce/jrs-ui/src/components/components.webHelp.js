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
/**
 * @version: $Id$
 */
import __jrsConfigs__ from 'js-sdk/src/jrs.configs';

var webHelpModule = {
    currentContext: 'default',
    displayWebHelp: function () {
        // If webHelpModuleState is undefined doesn't display Web Help
        var webHelpModuleState = __jrsConfigs__.webHelpModuleState;
        if (!webHelpModuleState) {
            return;
        }
        var helpURL = webHelpModuleState.hostURL + '/' + webHelpModuleState.pagePrefix + webHelpModule.getPageForContext();
        window.name = '';
        var runPopup = window.open(helpURL, 'MCWebHelp');
        runPopup.focus();
    },
    getPageForContext: function () {
        return __jrsConfigs__.webHelpModuleState.contextMap[webHelpModule.currentContext];
    },
    setCurrentContext: function (context) {
        webHelpModule.currentContext = context;
    }
};

export default webHelpModule;