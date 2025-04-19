# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.extract! quiz, :id, :name, :status, :total_questions, :created_at, :slug
  json.submission_count quiz.submissions.size
  json.category_name quiz.category.name
  json.total_questions quiz.questions.count
end

json.total_size @total_size
json.status_counts @status_counts
json.organization_name Organization.first.name
