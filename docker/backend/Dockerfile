# Use the official Maven image to build the application with Java 17
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory for the build process
WORKDIR /Taskitory

# Copy the pom.xml and source code to the working directory
COPY pom.xml .
COPY src ./src

# Package the application and skip tests
RUN mvn clean package -DskipTests=true

# Use a different OpenJDK image to run the application with Java 17
FROM openjdk:17-slim

# Set the working directory for the runtime container
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /Taskitory/target/*.jar app.jar

# Set environment variables for the database connection and Spring configuration
ENV DB_HOST=dpg-cu1q9hrtq21c73bk9r7g-a.oregon-postgres.render.com
ENV DB_PORT=5432
ENV DB_NAME=ebook_86j1
ENV DB_USERNAME=zoro
ENV DB_PASSWORD=R49F0vgaUz9X9VSuoYBlPW3BYyTtRLGv
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
ENV SPRING_DATASOURCE_USERNAME=${DB_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
ENV SPRING_DATASOURCE_DRIVER-CLASS-NAME=org.postgresql.Driver
ENV SPRING_JPA_HIBERNATE_DDL-AUTO=update
ENV SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
ENV SPRING_APPLICATION_NAME=DVD-Library

# Expose the application port
EXPOSE 8080

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
