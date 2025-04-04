# frozen_string_literal: true

# == Schema Information
#
# Table name: questions
#
#  id            :uuid             not null, primary key
#  question_text :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  quiz_id       :uuid             not null
#
# Indexes
#
#  index_questions_on_quiz_id  (quiz_id)
#
# Foreign Keys
#
#  fk_rails_...  (quiz_id => quizzes.id)
#
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
