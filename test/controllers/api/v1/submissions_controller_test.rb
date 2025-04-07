# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = create(:user, role: "admin_user")
    @standard_user = create(:user, role: "standard_user")
    @category = create(:category, name: "Sportt")
    @quiz = create(:quiz, user: @admin_user, category: @category, name: "sample quiz")
    @admin_headers = headers(@admin_user)
    @standard_user_headers = headers(@standard_user)
  end

  def test_should_create_submission_if_standard_user
    assert_difference("Submission.count", 1) do
      post api_v1_submissions_path,
        params: { submission: { name: "John Doe", email: "john@example.com", quiz_id: @quiz.id } },
        as: :json
    end
    assert_response :success
  end

  def test_should_not_create_submission_if_admin_user
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: { submission: { name: "Admin User", email: @admin_user.email, quiz_id: @quiz.id } },
        headers: @admin_headers,
        as: :json
    end

    assert_response :forbidden
  end

  def test_should_not_create_submission_with_invalid_email
    puts @quiz.id
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: { submission: { name: "No Email", email: "", quiz_id: @quiz.id } },
        as: :json
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_create_submission_without_quiz_id
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: { submission: { name: "Missing Quiz", email: "user@example.com" } },
        as: :json
    end

    assert_response :not_found
  end

  def test_should_update_submission_with_valid_answers
    question1 = create(:question, quiz: @quiz)
    question2 = create(:question, quiz: @quiz)

    correct_option_q1 = question1.options.find(&:is_correct)
    correct_option_q2 = question2.options.find(&:is_correct)

    post api_v1_submissions_path,
      params: {
        submission: {
          name: "Jane Doe",
          email: "jane@example.com",
          quiz_id: @quiz.id
        }
      },
      as: :json

    submission = Submission.last

    puts submission

    patch api_v1_submission_path(submission.id),
      params: {
        submission: {
          answers: {
            question1.id.to_s => correct_option_q1.id,
            question2.id.to_s => correct_option_q2.id
          }
        }
      },
      as: :json

    assert_response :success
    puts response.parsed_body
    submission.reload
    assert_equal "completed", submission.status
  end
end
