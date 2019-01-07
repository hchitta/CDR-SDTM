package com.cdr.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "sdtmEntityManagerFactory",
    transactionManagerRef = "sdtmTransactionManager", basePackages = {"com.cdr.sdtm.repository"})
public class SdtmDbConfig {
	
	  @Primary
	  @Bean(name = "sdtmDataSource")
	  @ConfigurationProperties(prefix = "sdtm.datasource") 
	  public DataSource dataSource() {
	    return DataSourceBuilder.create().build();
	  }

	  @Primary
	  @Bean(name = "sdtmEntityManagerFactory")
	  public LocalContainerEntityManagerFactoryBean sdtmEntityManagerFactory(
	      EntityManagerFactoryBuilder builder, @Qualifier("sdtmDataSource") DataSource dataSource) {
	    return builder.dataSource(dataSource).packages("com.cdr.sdtm.model").persistenceUnit("sdtm")
	        .build();
	  }

	  @Primary
	  @Bean(name = "sdtmTransactionManager")
	  public PlatformTransactionManager sdtmTransactionManager(
	      @Qualifier("sdtmEntityManagerFactory") EntityManagerFactory sdtmEntityManagerFactory) {
	    return new JpaTransactionManager(sdtmEntityManagerFactory);
	  }

}
