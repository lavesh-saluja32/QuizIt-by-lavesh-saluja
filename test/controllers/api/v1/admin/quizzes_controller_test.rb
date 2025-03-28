# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::QuizzesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = create(:user, role: :admin_user)
    @standard_user = create(:user, role: :standard_user)
    @category = create(:category)
    @quiz = create(:quiz, user: @admin, category: @category)
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_admin_should_get_index
    create(:quiz, user: @admin, category: @category)
    get api_v1_admin_quizzes_url, headers: @admin_headers, as: :json
    assert_response :success

    response_json = response.parsed_body
    puts response_json["quizzes"]
    assert_equal @admin.quizzes.count, response_json["quizzes"].length
  end

  def test_admin_should_create_quiz
    assert_difference("Quiz.count", 1) do
      post api_v1_admin_quizzes_url,
        params: { quiz: { name: "Admin Created Quiz", category_id: @category.id } },
        headers: @admin_headers,
        as: :json
    end
    assert_response :success
  end

  def test_standard_user_should_not_create_quiz
    assert_no_difference("Quiz.count") do
      post api_v1_admin_quizzes_path,
        params: { quiz: { name: "Unauthorized Quiz", category_id: @category.id } },
        headers: @standard_user_headers,
        as: :json
    end
    assert_response :forbidden
  end

  def test_admin_can_update_quiz
    patch api_v1_admin_quiz_path(@quiz),
      params: { quiz: { name: "Updated Quiz" } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal "Updated Quiz", @quiz.reload.name
  end

  def test_standard_user_cannot_update_quiz
    patch api_v1_admin_quiz_path(@quiz),
      params: { quiz: { name: "Hacked Quiz" } },
      headers: @standard_user_headers,
      as: :json

    assert_response :forbidden
  end

  def test_invalid_params_should_not_create_quiz
    assert_no_difference("Quiz.count") do
      post api_v1_admin_quizzes_path,
        params: { quiz: { name: "", category_id: "" } }, # Invalid params
        headers: @admin_headers,
        as: :json
    end
    assert_response :unprocessable_entity
  end
end
