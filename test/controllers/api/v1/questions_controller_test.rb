# frozen_string_literal: true

require "test_helper"

class Api::V1::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category, name: "Sportt")
    @quiz = create(:quiz, category: @category, name: "sample quiz")
    create_questions_with_options(@quiz)
  end

  def create_questions_with_options(quiz)
    @question1 = create(:question, quiz: quiz)
    @question2 = create(:question, quiz: quiz)
  end

  def test_should_return_all_questions_with_options_without_is_correct
    response = fetch_quiz_questions

    assert_response :success
    body = response.parsed_body

    assert_equal 2, body["questions"].size
  end

  private

    def fetch_quiz_questions
      puts api_v1_quiz_questions_path(@quiz.id)
      get api_v1_quiz_questions_path(@quiz.id), as: :json
      response
    end
end
