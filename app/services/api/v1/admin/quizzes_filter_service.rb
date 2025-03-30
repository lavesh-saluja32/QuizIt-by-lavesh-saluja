# frozen_string_literal: true

class Api::V1::Admin::QuizzesFilterService
  DEFAULT_PAGE = 1
  DEFAULT_PAGE_SIZE = 8

  attr_reader :params, :filtered_size, :quizzes

  def initialize(quizzes, params)
    @quizzes = quizzes
    @params = params
  end

  def process!
    filter_by_status
    # filter_by_search_term
    @filtered_size = @quizzes.count
    filter_by_pagination
    self
  end

  private

    def filter_by_status
      return unless params[:status].present?
      return if params[:status] == "all"

      @quizzes = @quizzes.where(status: params[:status])
    end

    def filter_by_pagination
      page = params[:page].to_i.positive? ? params[:page] : DEFAULT_PAGE
      @quizzes = @quizzes.paginate(page:, per_page: DEFAULT_PAGE_SIZE)
    end
end
