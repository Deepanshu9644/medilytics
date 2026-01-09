
# ---------------- BUILD STAGE ----------------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

# RUN mvn -q -e -DskipTests clean package
RUN mvn clean package -DskipTests






FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Install Tesseract and English language pack
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    && apt-get clean

    # Create uploads directory
RUN mkdir -p /uploads

# Tesseract stores its data in: /usr/share/tesseract-ocr/4.00/tessdata/
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata/

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV JAVA_OPTS="-Xms512m -Xmx1024m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
# ENTRYPOINT ["java", "-jar", "app.jar"]



