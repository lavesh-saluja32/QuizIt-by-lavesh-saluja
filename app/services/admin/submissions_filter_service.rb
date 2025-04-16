# frozen_string_literal: true

class Admin::SubmissionsFilterService < BaseFilterService
  def initialize(params, submissions)
    super(params)
    @submissions = submissions
  end

  def process!
    @submissions = filter_by_user_name(@submissions)
    @submissions = filter_by_status(@submissions)
    @submissions
  end

  private

    def filter_by_user_name(records)
      return records unless params[:search].present?

      records.joins(:user).where("users.name ILIKE ?", "%#{params[:search]}%")
    end
end
