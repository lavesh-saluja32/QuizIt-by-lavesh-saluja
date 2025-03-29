# frozen_string_literal: true

require "test_helper"

class QuizzesFilterServiceTest < ActiveSupport::TestCase
  setup do
    @admin = create(:user, role: :admin_user)
    @category = create(:category)
    @draft_quiz = create(:quiz, user: @admin, category: @category, status: "draft")
    @published_quiz = create(:quiz, user: @admin, category: @category, status: "published")
  end

  def test_should_return_all_quizzes_when_status_is_all
    filtered_quizzes = Api::V1::Admin::QuizzesFilterService.new(Quiz.all, { status: "all" }).process!
    assert_equal Quiz.count, filtered_quizzes.count
  end

  def test_should_return_only_draft_quizzes
    filtered_quizzes = Api::V1::Admin::QuizzesFilterService.new(Quiz.all, { status: "draft" }).process!
    assert_equal 1, filtered_quizzes.count
    assert_equal "draft", filtered_quizzes.first.status
  end

  def test_should_return_only_published_quizzes
    filtered_quizzes = Api::V1::Admin::QuizzesFilterService.new(Quiz.all, { status: "published" }).process!
    assert_equal 1, filtered_quizzes.count
    assert_equal "published", filtered_quizzes.first.status
  end

  def test_should_return_all_quizzes_when_status_is_nil
    filtered_quizzes = Api::V1::Admin::QuizzesFilterService.new(Quiz.all, {}).process!
    assert_equal Quiz.count, filtered_quizzes.count
  end

  def test_should_return_all_quizzes_when_status_is_blank
    filtered_quizzes = Api::V1::Admin::QuizzesFilterService.new(Quiz.all, { status: "" }).process!
    assert_equal Quiz.count, filtered_quizzes.count
  end
end
