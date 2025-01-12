# Build stage
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /build

# Copy pom.xml from book-network
COPY book-network/pom.xml .

# Download dependencies
RUN mvn -B dependency:go-offline

# Copy the entire source code
COPY book-network/src ./src

# Build the application
RUN mvn -B clean package -DskipTests

# Runtime stage
FROM amazoncorretto:21
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /build/target/book-network-*.jar /app/

# Expose application port
EXPOSE 8088

# Set environment variables
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
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

# Run the application
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar
