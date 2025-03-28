# frozen_string_literal: true

require "test_helper"

class Api::V1::QuizzesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = create(:user, role: :admin_user)
    @standard_user = create(:user, role: :standard_user)
    @category = create(:category)
    @quiz = create(:quiz, user: @admin, category: @category)
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_should_get_index_with_only_published_quizzes
    create(:quiz, user: @admin, category: @category, status: "published")
    get api_v1_quizzes_url, headers: @standard_user_headers, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal Quiz.published.count, response_json["quizzes"].length
  end

  def test_should_show_quiz
    get api_v1_quiz_url(@quiz), headers: @standard_user_headers, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal @quiz.name, response_json["name"]
  end
end
