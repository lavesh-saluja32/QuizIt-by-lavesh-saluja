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
        params: { quiz: { name: "", category_id: "" } },
        headers: @admin_headers,
        as: :json
    end
    assert_response :unprocessable_entity
  end

  def test_last_saved_at_updates_on_update
    assert_nil @quiz.last_saved_at
    patch api_v1_admin_quiz_path(@quiz),
      params: { quiz: { name: "Updated Quiz Again" } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_not_nil @quiz.reload.last_saved_at
  end

  def test_admin_can_publish_quiz
    assert_equal "draft", @quiz.status

    patch api_v1_admin_quiz_path(@quiz),
      params: { quiz: { status: "published" } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal "published", @quiz.reload.status
  end

  def test_admin_can_unpublish_quiz
    @quiz.update!(status: "published")
    assert_equal "published", @quiz.status

    patch api_v1_admin_quiz_path(@quiz),
      params: { quiz: { status: "draft" } },
      headers: @admin_headers,
      as: :json

    assert_response :success
    assert_equal "draft", @quiz.reload.status
  end

  def test_admin_can_view_quiz
    get api_v1_admin_quiz_path(@quiz), headers: @admin_headers, as: :json

    assert_response :success

    response_json = response.parsed_body
    assert_equal @quiz.id, response_json["quiz"]["id"]
    assert_equal @quiz.status, response_json["quiz"]["status"]
    assert_equal @quiz.last_saved_at&.to_s, response_json["quiz"]["last_saved_at"]&.to_s
  end

  def test_standard_user_cannot_view_quiz
    get api_v1_admin_quiz_path(@quiz), headers: @standard_user_headers, as: :json

    assert_response :forbidden
  end

  def test_admin_gets_404_for_nonexistent_quiz
    get api_v1_admin_quiz_path("non-existent-id"), headers: @admin_headers, as: :json

    assert_response :not_found
  end

  def test_admin_can_clone_quiz
    @quiz2 = create(:quiz, user: @admin, category: @category)
    @question = create(:question, quiz: @quiz2)

    assert_difference("Quiz.count", 1) do
      post clone_api_v1_admin_quiz_path(@quiz2), headers: @admin_headers, as: :json
    end

    assert_response :success

    cloned_quiz = Quiz.order(:created_at).last
    puts cloned_quiz.questions.inspect

    puts cloned_quiz.questions.inspect
    puts @quiz2.questions.inspect
    assert_not_equal @quiz.id, cloned_quiz.id
    assert_equal @quiz2.name, cloned_quiz.name
    assert_equal @quiz2.questions.count, cloned_quiz.questions.count
    assert_equal @quiz2.questions.first.options.count, cloned_quiz.questions.first.options.count
  end

  def test_admin_can_destroy_quiz
    assert_difference("Quiz.count", -1) do
      delete api_v1_admin_quiz_path(@quiz), headers: @admin_headers, as: :json
    end

    assert_response :success
end

  def test_standard_user_cannot_destroy_quiz
    assert_no_difference("Quiz.count") do
      delete api_v1_admin_quiz_path(@quiz), headers: @standard_user_headers, as: :json
    end

    assert_response :forbidden
  end
end
