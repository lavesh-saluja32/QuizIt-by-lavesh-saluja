# frozen_string_literal: true

json.questions @questions do |question|
  json.extract! question, :id, :question_text

  json.options question.options do |option|
    json.extract! option, :id, :option_text
  end
end
