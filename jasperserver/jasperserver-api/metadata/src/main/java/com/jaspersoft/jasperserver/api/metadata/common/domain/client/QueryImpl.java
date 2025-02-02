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
package com.jaspersoft.jasperserver.api.metadata.common.domain.client;

import com.jaspersoft.jasperserver.api.metadata.common.domain.Query;
import com.jaspersoft.jasperserver.api.metadata.common.domain.QueryParameterDescriptor;
import com.jaspersoft.jasperserver.api.metadata.common.domain.ResourceReference;
import com.jaspersoft.jasperserver.api.metadata.common.domain.ResourceVisitor;
import com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.ReportDataSource;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * @author Ionut Nedelcu (ionutned@users.sourceforge.net)
 * @version $Id$
 */
public class QueryImpl extends ResourceImpl implements Query
{
	private ResourceReference dataSource = null;
	private String language;
	private String sql;
    private List<QueryParameterDescriptor> params;

	
	/**
	 * 
	 */
	public ResourceReference getDataSource()
	{
		return dataSource;
	}
	
	/**
	 * 
	 */
	public void setDataSource(ResourceReference dataSource)
	{
		this.dataSource = dataSource;
	}


	/**
	 * 
	 */
	public void setDataSource(ReportDataSource dataSource) {
		setDataSource(new ResourceReference(dataSource));
	}


	/**
	 * 
	 */
	public void setDataSourceReference(String referenceURI) {
		setDataSource(new ResourceReference(referenceURI));
	}

	
	public String getSql()
	{
		return sql;
	}

	public void setSql(String sql)
	{
		this.sql = sql;
	}

	protected Class getImplementingItf() {
		return Query.class;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

    @Override
    public void setParameters(List<QueryParameterDescriptor> descriptors) {
        params = descriptors;
    }

    @Override
    public List<QueryParameterDescriptor> getParameters() {
        return params;
    }

    @Override
    public void accept(ResourceVisitor visitor) {
        super.accept(visitor);
        Stream.of(dataSource).filter(Objects::nonNull).forEach(o -> o.accept(visitor));
    }
}
