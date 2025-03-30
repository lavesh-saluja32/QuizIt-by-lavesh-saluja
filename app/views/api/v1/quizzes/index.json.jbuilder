# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.extract! quiz, :id, :name, :status, :submission_count, :total_questions, :created_at
  json.category_name quiz.category.name
  json.author quiz.user.name
end

json.total_size @total_size
