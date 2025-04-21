# frozen_string_literal: true

json.questions @questions do |question|
  json.extract! question, :id, :question_text

  json.options @quiz.shuffle_options ? question.options.shuffle : question.options do |option|
    json.extract! option, :id, :option_text
  end
end
