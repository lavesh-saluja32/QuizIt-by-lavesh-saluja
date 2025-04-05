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
    filter_by_search_term
    @filtered_size = @quizzes.count
    filter_by_pagination
    filter_by_category
    self
  end

  private

    def filter_by_status
      return unless params[:status].present?
      return if params[:status] == "all"

      @quizzes = @quizzes.where(status: params[:status])
    end

    def filter_by_search_term
      return unless params[:search].present?

      @quizzes = @quizzes.where("quizzes.name ILIKE ?", "%#{params[:search]}%")
    end

    def filter_by_pagination
      page = params[:page].to_i.positive? ? params[:page] : DEFAULT_PAGE
      @quizzes = @quizzes.paginate(page:, per_page: DEFAULT_PAGE_SIZE)
    end

    def filter_by_category
      return unless params[:category].present? && params[:category].is_a?(Array)

      @quizzes = @quizzes.joins(:category).where(categories: { name: params[:category] })
    end
end
