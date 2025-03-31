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

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz) # Assumes you have a factory for Quiz
    @question = create(:question, quiz: @quiz)
  end

  def test_valid_question
    assert @question.valid?
  end

  def test_invalid_without_question_text
    @question.question_text = nil
    assert_not @question.valid?
    assert_includes @question.errors[:question_text], I18n.t("question.validations.blank_text")
  end

  def test_invalid_with_short_question_text
    @question.question_text = "Hi"
    assert_not @question.valid?
    assert_includes @question.errors[:question_text], I18n.t("question.validations.short_text", count: 5)
  end

  def test_invalid_without_quiz
    @question.quiz = nil
    assert_not @question.valid?
    assert_includes @question.errors[:quiz_id], I18n.t("question.validations.blank_text")
  end

  def test_question_cannot_have_more_than_six_options
    6.times { create(:option, question: @question) }
    @question.reload
    extra_option = build(:option, question: @question)

    @question.options << extra_option

    assert_not @question.valid?
    assert_includes @question.errors[:base], I18n.t("question.validations.max_options", count: 6)
  end

  def test_question_must_have_only_one_correct_option
    op1 = build(:option, question: @question, is_correct: true)
    op2 = build(:option, question: @question, is_correct: true)
    @question.options << [op1, op2]
    error_message = I18n.t("question.validations.only_one_correct_option")

    assert_raises(ActiveRecord::RecordInvalid, error_message) do
      puts @question.save!
    end
  end
end
