# # ----------- Build Stage -----------
# FROM maven:3.9.6-eclipse-temurin-21 AS build
# WORKDIR /app

# COPY pom.xml .
# COPY src ./src

# RUN mvn -q -e -DskipTests clean package

# # ----------- Run Stage -----------
# FROM eclipse-temurin:21-jdk-jammy
# WORKDIR /app

# # Install Tesseract OCR
# RUN apt-get update && \
#     apt-get install -y tesseract-ocr tesseract-ocr-eng && \
#     apt-get clean

# COPY --from=build /app/target/*.jar app.jar

# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]

# ---------------- BUILD STAGE ----------------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -q -e -DskipTests clean package


# ---------------- RUN STAGE ----------------
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Install Tesseract + English language pack
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    wget && \
    apt-get clean

# Ensure tessdata directory exists
RUN mkdir -p /usr/share/tesseract-ocr/tessdata/

# Download English trained data (backup to guarantee availability)
RUN wget -O /usr/share/tesseract-ocr/tessdata/eng.traineddata \
    https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata

# Set Tesseract data path
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/tessdata/

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
