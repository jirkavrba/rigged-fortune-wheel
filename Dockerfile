FROM node:18.2-alpine AS frontend

RUN mkdir /client
WORKDIR /client

COPY ./client/package.json       /client/package.json
COPY ./client/package-lock.json  /client/package-lock.json
COPY ./client/tsconfig.json      /client/tsconfig.json
COPY ./client/postcss.config.js  /client/postcss.config.js
COPY ./client/tailwind.config.js /client/tailwind.config.js

RUN npm install

COPY ./client/public /client/public
COPY ./client/src    /client/src

RUN npm run build


FROM gradle:7.4.2-jdk17-alpine AS backend

RUN mkdir /build
WORKDIR /build

COPY ./gradlew             /build/gradlew
COPY ./gradle              /build/gradle
COPY ./settings.gradle.kts /build/settings.gradle.kts
COPY ./build.gradle.kts    /build/build.gradle.kts

RUN ./gradlew clean build

COPY ./src /build/src
COPY --from=frontend /client/build /build/src/main/resources/static

RUN ./gradlew bootJar


FROM amazoncorretto:17-alpine-jdk

RUN mkdir /app
WORKDIR /app

COPY --from=backend /build/build/libs/rigged-fortune-wheel-0.0.1-SNAPSHOT.jar /app/application.jar

ENTRYPOINT ["java", "-jar", "/app/application.jar"]
EXPOSE 8080
