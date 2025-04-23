# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.partial! "api/v1/quizzes/quiz", locals: { quiz: quiz }
end

json.total_size @total_size
json.status_counts @status_counts
json.organization_name @current_user.organization.name
