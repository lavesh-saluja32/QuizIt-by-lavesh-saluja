# frozen_string_literal: true

class Api::V1::Admin::SubmissionsFilterService
  attr_reader :params
  def initialize(params, submissions)
    @params = params
    @submissions = submissions
  end

  def process!
    filter_by_name
    filter_by_status
    @submissions
  end

  private

    def filter_by_name
      return unless params[:search].present?

      @submissions = @submissions.joins(:user)
        .where("users.name ILIKE ?", "%#{params[:search]}%")
    end

    def filter_by_status
      return unless params[:status].present?

      @submissions = @submissions.where(status: params[:status])
    end
end
