# frozen_string_literal: true

require "test_helper"

class Api::V1::Admin::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = create(:user, role: :admin_user)
    @standard_user = create(:user, role: :standard_user)
    @category = create(:category)
    @quiz = create(:quiz, user: @admin, category: @category)
    @submission_user = create(:user)
    @submission = create(:submission, quiz: @quiz, user: @submission_user)

    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_admin_can_view_submissions_for_their_own_quiz
    get api_v1_admin_quiz_submissions_path(@quiz.id), headers: @admin_headers, as: :json

    assert_response :success
    response_json = response.parsed_body["submissions"]
    assert_equal 1, response_json.length
    assert_equal @submission.id, response_json.first["id"]
    assert_equal @submission_user.id, response_json.first["user"]["id"]
  end

  def test_admin_cannot_view_submissions_for_other_admins_quiz
    other_admin = create(:user, role: :admin_user)
    other_quiz = create(:quiz, user: other_admin, category: @category)
    create(:submission, quiz: other_quiz, user: create(:user))

    get api_v1_admin_quiz_submissions_path(other_quiz.id), headers: @admin_headers, as: :json

    assert_response :success
    response_json = response.parsed_body["submissions"]
    assert_empty response_json
  end

  def test_returns_404_for_invalid_quiz
    get api_v1_admin_quiz_submissions_path("invalid-id"), headers: @admin_headers, as: :json

    assert_response :not_found
  end
end
