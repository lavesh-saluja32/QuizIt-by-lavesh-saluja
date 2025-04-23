# frozen_string_literal: true

json.array! @categories do |category|
  json.extract! category, :id, :name
  json.quizzes_count category.quizzes.count
end
