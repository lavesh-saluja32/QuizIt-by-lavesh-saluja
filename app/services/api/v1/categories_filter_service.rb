# frozen_string_literal: true

class Api::V1::CategoriesFilterService
  attr_reader :params
  def initialize(params, categories)
    @params = params
    @categories = categories
  end

  def process
    filter_by_name
    @categories
  end

  private

    def filter_by_name
      return unless params[:search].present?

      @categories = @categories.where("name ILIKE ?", "%#{params[:search]}%")
    end
end
