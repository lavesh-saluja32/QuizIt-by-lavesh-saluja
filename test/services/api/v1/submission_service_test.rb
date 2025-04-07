# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionServiceTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz)
    @question1 = create(:question, quiz: @quiz)
    @question2 = create(:question, quiz: @quiz)
    @correct_option_q1 = @question1.options.find(&:is_correct)
    @wrong_option_q1 = @question1.options.reject(&:is_correct).first
    @correct_option_q2 = @question2.options.find(&:is_correct)
    @wrong_option_q2 = @question2.options.reject(&:is_correct).first
    @submission = create(:submission, quiz: @quiz)
  end

  def test_returns_correct_score_for_all_correct_answers
    answers = {
      @question1.id.to_s => @correct_option_q1.id,
      @question2.id.to_s => @correct_option_q2.id
    }

    result = Api::V1::SubmissionService.new(@submission, { answers: answers }).process!

    assert_equal 2, result[:correct_answers]
    assert_equal 0, result[:wrong_answers]
    assert_equal 0, result[:unanswered]
    assert_equal "completed", result[:status].to_s
    assert result[:submission_time].present?
  end

  def test_returns_correct_score_for_some_wrong_answers
    answers = {
      @question1.id.to_s => @wrong_option_q1.id,
      @question2.id.to_s => @correct_option_q2.id
    }

    result = Api::V1::SubmissionService.new(@submission, { answers: answers }).process!

    assert_equal 1, result[:correct_answers]
    assert_equal 1, result[:wrong_answers]
    assert_equal 0, result[:unanswered]
  end

  def test_returns_unanswered_count
    answers = {
      @question1.id.to_s => @correct_option_q1.id
      # question2 not answered
    }

    result = Api::V1::SubmissionService.new(@submission, { answers: answers }).process!

    assert_equal 1, result[:correct_answers]
    assert_equal 0, result[:wrong_answers]
    assert_equal 1, result[:unanswered]
  end

  def test_handles_invalid_option_ids_gracefully
    answers = {
      @question1.id.to_s => "nonexistent_option_id",
      @question2.id.to_s => @correct_option_q2.id
    }

    result = Api::V1::SubmissionService.new(@submission, { answers: answers }).process!

    assert_equal 1, result[:correct_answers]
    assert_equal 1, result[:wrong_answers]
    assert_equal 0, result[:unanswered]
  end
end
