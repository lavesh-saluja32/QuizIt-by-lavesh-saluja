# frozen_string_literal: true

json.questions @questions do |question|
  json.extract! question, :id, :question_text, :quiz_id, :created_at, :updated_at, :description
  json.options question.options do |option|
    json.id option.id
    json.option_text option.option_text
    json.is_correct option.is_correct
  end
end
