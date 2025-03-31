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
class Question < ApplicationRecord
  MINIMUM_QUESTION_LENGTH = 5
  MAX_OPTIONS_PER_QUESTION = 6

  belongs_to :quiz
  has_many :options

  validates :question_text, presence: true, length: { minimum: MINIMUM_QUESTION_LENGTH }
  validates :quiz_id, presence: true

  validate :validate_max_options_per_question
  validate :validate_only_one_correct_option

  accepts_nested_attributes_for :options, allow_destroy: true

  private

    def validate_max_options_per_question
      if options.length > MAX_OPTIONS_PER_QUESTION
        puts "hello 2"
        errors.add(:base, I18n.t("question.validations.max_options", count: MAX_OPTIONS_PER_QUESTION))
      end
    end

    def validate_only_one_correct_option
      correct_options = options.select(&:is_correct)

      if correct_options.size > 1
        raise ActiveRecord::RecordInvalid.new(self), I18n.t("question.validations.only_one_correct_option")
      end
    end
end
