<%@ page contentType="text/html; charset=utf-8" %>
<%--
  ~ Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~
  ~ Unless you have purchased a commercial license agreement from Jaspersoft,
  ~ the following license terms apply:
  ~
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU Affero General Public License as
  ~ published by the Free Software Foundation, either version 3 of the
  ~ License, or (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  ~ GNU Affero General Public License for more details.
  ~
  ~ You should have received a copy of the GNU Affero General Public License
  ~ along with this program. If not, see <http://www.gnu.org/licenses/>.
  --%>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%--main menu--%>
<div id='menu' class="menu vertical context hidden" aria-hidden="true" role="menuitem"></div>

<div id="commonMenu" class="hidden">
    <div class="content">
        <ul id="menuList_template" role="menubar">
        </ul>
        <js:xssNonce/>
    </div>
</div>

<ul class="hidden" aria-hidden="true" role="menubar">
    <%--simply action list option--%>
    <li id="menuList_simpleAction" class="leaf" role="menuitem"><p class="wrap button"><span class="icon"></span><!--Item text goes here--></p></li>

    <%--separator for menu--%>
    <li id="menuList_separator" class="leaf separator" role="separator"></li>

    <%--submenu list--%>
    <li id="menuList_flyout" class="node" role="menu"><p class="wrap button"><span class="icon"></span><!--Item text goes here--></p></li>

    <%--extra pop up menu--%>
    <li id="menuList_extraInput" class="leaf"><p class="wrap button"><span class="icon"></span><!--Item text goes here--></p></li>

    <%--dropdown list element--%>
    <li id="menuList_listItem" class="leaf" role="menuitem"><p class="wrap toggle button"><span class="icon"></span><!--Item text goes here--></p></li>

    <%--main navigation mutton--%>
    <%--<li id="navigation_mutton" class="leaf mutton up button" role="menuitem" js-navtype="actionmenu"><i class="icon"></i></li>--%>
    <li id="navigation_mutton" tabIndex="-1" class="node mutton" role="menuitem"><p class="wrap button"><span class="icon"></span></p></li>
</ul>