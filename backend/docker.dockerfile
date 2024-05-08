# img with maven and java both installed for build
FROM maven:3.8.4-openjdk-17-slim AS builder

# make backend working dir
WORKDIR /backend

# cp pom.xml file to the container
COPY pom.xml .

# download pom.xml dependancies
RUN mvn -f /backend/pom.xml clean package -DskipTests

COPY src ./src

RUN mvn package -DskipTests

# this is the image that will be used to run it
FROM adoptopenjdk:17-jre-hotspot

# Set the working directory in the container
WORKDIR /backend

# Copy the JAR file from the builder stage to the container
COPY --from=builder /backend/target/*.jar ./app.jar

# Expose the port that the application runs on
EXPOSE 8080

# Define the command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]
