#!/bin/sh

PACKAGE_NAME=$(grep name package.json | sed 's/.*"name": "\(.*\)".*/\1/')
SONAR_HOST=$(grep "gtb.sonar.host.url" ~/.gradle/gradle.properties | cut -d'=' -f2)
SONAR_LOGIN=$(grep "gtb.sonar.login" ~/.gradle/gradle.properties | cut -d'=' -f2)
STUDENT_TERM=$(grep "gtb.sonar.student.term" ~/.gradle/gradle.properties | cut -d'=' -f2)
STUDENT_NAME=$(grep "gtb.sonar.student.name" ~/.gradle/gradle.properties | cut -d'=' -f2)

sonar-scanner \
   -Dsonar.host.url="${SONAR_HOST}" \
   -Dsonar.login="${SONAR_LOGIN}" \
   -Dsonar.projectKey="${STUDENT_NAME}:${STUDENT_TERM}:${PACKAGE_NAME}" \
   -Dsonar.exclusions=**/*.test.js,**/*.spec.js
