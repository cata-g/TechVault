# Use an official JDK base image
FROM openjdk:17-jdk-slim

# Copy the JAR file into the image
COPY target/*.jar app.jar

# Run the JAR
ENTRYPOINT ["java", "-jar", "/app.jar"]
