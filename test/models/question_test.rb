# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz)
    @question = build(:question, quiz: @quiz)
  end

  def test_valid_question
    @question.options = [
      build(:option, is_correct: true),
      build(:option, is_correct: false)
    ]
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

  def test_question_must_have_at_least_two_options
    @question.options = [build(:option)]
    assert_not @question.valid?
    assert_includes @question.errors[:base], I18n.t("question.validations.min_options", count: 2)
  end

  def test_question_cannot_have_more_than_six_options
    @question.options = build_list(:option, 7, question: @question)
    assert_not @question.valid?
    assert_includes @question.errors[:base], I18n.t("question.validations.max_options", count: 6)
  end

  def test_question_must_have_exactly_one_correct_option
    @question.options = [
      build(:option, is_correct: true),
      build(:option, is_correct: true)
    ]
    assert_not @question.valid?
    assert_includes @question.errors[:base], I18n.t("question.validations.only_one_correct_option")
  end

  def test_question_is_valid_with_exactly_one_correct_option
    @question.options = [
      build(:option, is_correct: true),
      build(:option, is_correct: false)
    ]
    assert @question.valid?
  end

  def test_question_is_invalid_without_any_correct_option
    @question.options = [
      build(:option, is_correct: false),
      build(:option, is_correct: false)
    ]
    assert_not @question.valid?
    assert_includes @question.errors[:base], I18n.t("question.validations.only_one_correct_option")
  end

  def test_question_with_mixed_correct_and_incorrect_options_is_valid
    @question.options = [
      build(:option, is_correct: true, option_text: "Correct Answer"),
      build(:option, is_correct: false, option_text: "Wrong Answer")
    ]
    assert @question.valid?
  end
end
