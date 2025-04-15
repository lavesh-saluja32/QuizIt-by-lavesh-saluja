# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::QuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @organization = create(:organization)
    @admin = create(:user, role: :admin_user, organization: @organization)
    @standard_user = create(:user, role: :standard_user, organization: @organization)
    @category = create(:category, organization: @organization)
    @quiz = create(:quiz, user: @admin, category: @category)
    @question = create(:question, quiz: @quiz)
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_admin_should_get_questions
    create_list(:question, 3, quiz: @quiz)

    get api_v1_admin_quiz_questions_url(@quiz), headers: @admin_headers, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal @quiz.questions.count, response_json["questions"].length
  end

  def test_admin_should_create_question
    assert_difference("Question.count", 1) do
      post api_v1_admin_quiz_questions_url(@quiz),
        params: {
          question: {
            question_text: "What is 2 + 2?",
            options_attributes: [
                      { option_text: "4", is_correct: true },
                      { option_text: "3", is_correct: false },
                      { option_text: "5", is_correct: false }
                    ]
          }
        },
        headers: @admin_headers,
        as: :json
    end
    assert_response :success
  end

  def test_standard_user_should_not_create_question
    assert_no_difference("Question.count") do
      post api_v1_admin_quiz_questions_url(@quiz),
        params: {
          question: {
            question_text: "Hacked Question?",
            options_attributes: [
                      { option_text: "Yes", is_correct: true },
                      { option_text: "No", is_correct: false }
                    ]
          }
        },
        headers: @standard_user_headers,
        as: :json
    end
    assert_response :forbidden
  end

  def test_admin_can_update_question
    patch api_v1_admin_question_url(@question),
      params: { question: { question_text: "Updated Question", options_attributes: @question.options } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal "Updated Question", @question.reload.question_text
  end

  def test_standard_user_cannot_update_question
    patch api_v1_admin_question_url(@question),
      params: { question: { question_text: "Hacked Question" } },
      headers: @standard_user_headers,
      as: :json

    assert_response :forbidden
  end

  def test_admin_can_delete_question
    assert_difference("Question.count", -1) do
      delete api_v1_admin_question_url(@question), headers: @admin_headers, as: :json
    end
    assert_response :success
  end

  def test_standard_user_cannot_delete_question
    assert_no_difference("Question.count") do
      delete api_v1_admin_question_url(@question), headers: @standard_user_headers, as: :json
    end
    assert_response :forbidden
  end

  def test_cannot_create_question_without_text
    assert_no_difference("Question.count") do
      post api_v1_admin_quiz_questions_url(@quiz),
        params: { question: { question_text: "", options_attributes: [] } },
        headers: @admin_headers,
        as: :json
    end
    assert_response :unprocessable_entity
  end

  def test_cannot_create_question_with_more_than_six_options
    assert_no_difference("Question.count") do
      post api_v1_admin_quiz_questions_url(@quiz),
        params: {
          question: {
            question_text: "Too many options?",
            options_attributes: [
                      { option_text: "Option 1", is_correct: false },
                      { option_text: "Option 2", is_correct: false },
                      { option_text: "Option 3", is_correct: false },
                      { option_text: "Option 4", is_correct: false },
                      { option_text: "Option 5", is_correct: false },
                      { option_text: "Option 6", is_correct: false },
                      { option_text: "Option 7", is_correct: false } # Extra option
                    ]
          }
        },
        headers: @admin_headers,
        as: :json
    end
    assert_response :unprocessable_entity
  end

  def test_cannot_create_question_with_multiple_correct_options
    assert_no_difference("Question.count") do
      post api_v1_admin_quiz_questions_url(@quiz),
        params: {
          question: {
            question_text: "Which are correct?",
            options_attributes: [
                      { option_text: "Answer 1", is_correct: true },
                      { option_text: "Answer 2", is_correct: true } # Multiple correct answers
                    ]
          }
        },
        headers: @admin_headers,
        as: :json
    end
    assert_response :unprocessable_entity
  end

  def test_admin_can_view_question
    get api_v1_admin_question_url(@question), headers: @admin_headers, as: :json

    assert_response :success
    response_json = response.parsed_body

    assert_equal @question.id, response_json["question"]["id"]
    assert_equal @question.question_text, response_json["question"]["question_text"]
    assert_equal @question.quiz_id, response_json["question"]["quiz_id"]
    assert_equal @question.options.count, response_json["question"]["options"].length
  end

  def test_standard_user_cannot_view_question
    get api_v1_admin_question_url(@question), headers: @standard_user_headers, as: :json

    assert_response :forbidden
  end

  def test_admin_can_clone_question
    assert_difference("Question.count", 1) do
      assert_difference("Option.count", 2) do
        post clone_api_v1_admin_question_url(@question), headers: @admin_headers, as: :json
      end
    end

    assert_response :success

    cloned_question = Question.last
    assert_equal @question.quiz_id, cloned_question.quiz_id
    assert_equal @question.question_text, cloned_question.question_text
    assert_equal @question.options.count, cloned_question.options.count
  end

  def test_standard_user_cannot_clone_question
    assert_no_difference(["Question.count", "Option.count"]) do
      post clone_api_v1_admin_question_url(@question), headers: @standard_user_headers, as: :json
    end

    assert_response :forbidden
  end
end
