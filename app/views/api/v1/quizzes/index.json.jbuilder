# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.partial! "api/v1/quizzes/quiz", locals: { quiz: quiz }
end

json.organization_name Organization.first.name
