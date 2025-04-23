# frozen_string_literal: true

json.extract! quiz, :id, :name, :status, :total_questions, :created_at, :slug
json.submission_count quiz.submissions.size
json.category_name quiz.category.name
json.total_questions quiz.questions.count
