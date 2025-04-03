# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    association :quiz
    question_text { "What is the capital of France?" }

    after(:build) do |question|
      question.options << build(:option, question: question, is_correct: true)
      question.options << build(:option, question: question, is_correct: false)
    end
  end
end
