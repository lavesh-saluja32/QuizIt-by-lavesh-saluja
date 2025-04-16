# frozen_string_literal: true

require "test_helper"

class Admin::QuizzesFilterServiceTest < ActiveSupport::TestCase
  setup do
    @admin = create(:user, role: :admin_user)
    @category = create(:category)
    @draft_quiz = create(:quiz, user: @admin, category: @category, status: "draft", name: "Ruby Basics")
    @published_quiz = create(:quiz, user: @admin, category: @category, status: "published", name: "Rails Advanced")
  end

  def test_should_return_all_quizzes_when_status_is_all
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { status: "all" }).process
    assert_equal Quiz.count, filtered_quizzes.quizzes.count
  end

  def test_should_return_only_draft_quizzes
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { status: "draft" }).process
    assert_equal 1, filtered_quizzes.quizzes.count
    assert_equal "draft", filtered_quizzes.quizzes.first.status
  end

  def test_should_return_only_published_quizzes
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { status: "published" }).process
    assert_equal 1, filtered_quizzes.quizzes.count
    assert_equal "published", filtered_quizzes.quizzes.first.status
  end

  def test_should_return_all_quizzes_when_status_is_nil
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, {}).process
    assert_equal Quiz.count, filtered_quizzes.quizzes.count
  end

  def test_should_return_all_quizzes_when_status_is_blank
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { status: "" }).process
    assert_equal Quiz.count, filtered_quizzes.quizzes.count
  end

  def test_should_return_quizzes_matching_search_term
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { search: "Ruby" }).process
    assert_equal 1, filtered_quizzes.quizzes.count
    assert_equal "Ruby Basics", filtered_quizzes.quizzes.first.name
  end

  def test_should_return_empty_when_search_term_does_not_match
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { search: "Python" }).process
    assert_equal 0, filtered_quizzes.quizzes.count
  end

  def test_should_paginate_results
    Quiz.delete_all
    10.times { create(:quiz, user: @admin, category: @category) }
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { page: 1 }).process
    assert_equal 8, filtered_quizzes.quizzes.size # Default page size
  end

  def test_should_return_correct_filtered_size
    filtered_quizzes = Admin::QuizzesFilterService.new(Quiz.all, { status: "draft" }).process
    assert_equal 1, filtered_quizzes.filtered_size
  end
end
