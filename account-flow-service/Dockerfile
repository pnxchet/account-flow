FROM maven:3.9.6-eclipse-temurin-22 AS builder

WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:22.0.1_8-jdk AS runtime
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
