# frozen_string_literal: true

json.extract! @quiz, :id, :name, :status, :submission_count, :total_questions, :created_at
json.category_name @quiz.category.name
json.author @quiz.user.name
