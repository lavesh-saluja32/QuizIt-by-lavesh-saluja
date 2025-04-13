# frozen_string_literal: true

require "test_helper"

class Api::V1::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @category = create(:category, organization: @organization)
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
      get api_v1_quiz_questions_path(@quiz.id), as: :json
      response
    end
end
