# frozen_string_literal: true

class Admin::QuizzesFilterService < BaseFilterService
  DEFAULT_PAGE = 1
  DEFAULT_PAGE_SIZE = 8

  attr_reader :filtered_size, :quizzes

  def initialize(quizzes, params)
    super(params)
    @quizzes = quizzes
  end

  def process
    @quizzes = filter_by_status(@quizzes)
    @quizzes = filter_by_search_term(@quizzes, table: "quizzes")
    @filtered_size = @quizzes.count
    @quizzes = apply_pagination(@quizzes, default_page: DEFAULT_PAGE, page_size: DEFAULT_PAGE_SIZE)
    @quizzes = filter_by_category(@quizzes)
    self
  end
end
