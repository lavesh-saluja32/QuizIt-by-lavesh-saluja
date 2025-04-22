# frozen_string_literal: true

json.question do
  json.extract! @question, :id, :question_text, :quiz_id, :created_at, :updated_at, :description

  json.options @question.options do |option|
    json.extract! option, :id, :option_text, :is_correct
  end
end
