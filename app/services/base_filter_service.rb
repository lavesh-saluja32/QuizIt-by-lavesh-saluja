# frozen_string_literal: true

class BaseFilterService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  protected

    def filter_by_search_term(records, column: "name", table: nil)
      return records unless params[:search].present?

      table_prefix = table ? "#{table}." : ""
      records.where("#{table_prefix}#{column} ILIKE ?", "%#{params[:search]}%")
    end

    def filter_by_status(records)
      return records unless params[:status].present?
      return records unless records.column_names.include?("status")

      records.where(status: params[:status])
    end

    def filter_by_category(records)
      return records unless params[:category].present? && params[:category].is_a?(Array)

      records.joins(:category).where(categories: { name: params[:category] })
    end

    def apply_pagination(records, default_page:, page_size:)
      page = params[:page].to_i.positive? ? params[:page] : default_page
      records.paginate(page: page, per_page: page_size)
    end
end
