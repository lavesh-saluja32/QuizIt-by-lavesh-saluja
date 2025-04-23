# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @admin = create(:user, role: :admin_user, organization: @organization)
    @standard_user = create(:user, role: :standard_user, organization: @organization)
    @category = create(:category, organization: @organization)
    @quiz = create(:quiz, user: @admin, category: @category, organization: @organization)
    @admin_headers = headers(@admin)
    @standard_user_headers = headers(@standard_user)
  end

  def test_should_create_submission_if_standard_user
    assert_difference("Submission.count", 1) do
      post api_v1_submissions_path,
        params: {
          submission: {
            name: "John Doe",
            email: "john@example.com",
            quiz_slug: @quiz.slug
          }
        },
        as: :json
    end

    assert_response :success
  end

  def test_should_not_create_submission_if_admin_user
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: {
          submission: {
            name: "Admin User",
            email: @admin.email,
            quiz_slug: @quiz.slug
          }
        },
        headers: @admin_headers,
        as: :json
    end

    assert_response :forbidden
  end

  def test_should_not_create_submission_with_invalid_email
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: {
          submission: {
            name: "No Email",
            email: "",
            quiz_slug: @quiz.slug
          }
        },
        as: :json
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_create_submission_without_quiz_slug
    assert_no_difference("Submission.count") do
      post api_v1_submissions_path,
        params: {
          submission: {
            name: "Missing Quiz",
            email: "user@example.com"
            # quiz_slug is missing here
          }
        },
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
          quiz_slug: @quiz.slug
        }
      },
      as: :json

    submission = Submission.last

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
    submission.reload
    assert_equal "completed", submission.status
  end

  def test_should_return_forbidden_if_time_limit_exceeded
    quiz = create(:quiz, user: @admin, category: @category, organization: @organization, is_time_enabled: true, time: 1)

    question = create(:question, quiz: quiz)

    post api_v1_submissions_path,
      params: {
        submission: {
          name: "Time Limit Test",
          email: "timelimit@example.com",
          quiz_slug: quiz.slug
        }
      },
      as: :json

    submission = Submission.last

    puts submission.inspect
    puts submission.user.inspect
    travel_to submission.created_at + 2.minutes do
      patch api_v1_submission_path(submission.id),
        params: {
          submission: {
            answers: {
              question.id.to_s => question.options.find(&:is_correct).id
            }
          }
        },
        as: :json

      assert_response :forbidden
      assert_includes response.body, I18n.t("errors.messages.time_limit")
    end
end
end
