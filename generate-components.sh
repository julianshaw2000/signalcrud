#!/bin/bash

# Array of components to be created
components=(
  "home"
  "login"
  "lessons"
  "course"
  "linked-signal"
  "resource-demo"
)

# Generate components
for component in "${components[@]}"
do
  echo "Generating component: $component"
  ng generate component "$component" --standalone --style=scss
done

echo "Generating Course Resolvers"
ng generate resolver course/course --flat
ng generate resolver course/course-lessons --flat

echo "Generating Auth Guard"
ng generate guard guards/auth --flat --implements CanActivate

echo "All components, resolvers, and guards have been created successfully!"
