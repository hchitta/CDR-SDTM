package com.cdr.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "dqEntityManagerFactory",
    transactionManagerRef = "dqTransactionManager", basePackages = {"com.cdr.dq.repository"})
public class DqDbConfig {
	
	@Bean(name = "dqDataSource")
	  @ConfigurationProperties(prefix = "dq.datasource") 
	  public DataSource dataSource() {
	    return DataSourceBuilder.create().build();
	  }

	  @Bean(name = "dqEntityManagerFactory")
	  public LocalContainerEntityManagerFactoryBean dqEntityManagerFactory(
	      EntityManagerFactoryBuilder builder, @Qualifier("dqDataSource") DataSource dataSource) {
	    return builder.dataSource(dataSource).packages("com.cdr.dq.model").persistenceUnit("dq")
	        .build();
	  }

	  @Bean(name = "dqTransactionManager")
	  public PlatformTransactionManager dqTransactionManager(
	      @Qualifier("dqEntityManagerFactory") EntityManagerFactory dqEntityManagerFactory) {
	    return new JpaTransactionManager(dqEntityManagerFactory);
	  }

}
