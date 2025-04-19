# frozen_string_literal: true

class Api::V1::RedirectionsController < ApplicationController
  before_action :load_organization

  def create
    puts "KOOO"
    from_url = redirection_params[:from]
    redirection = @organization.redirections.find_by(from: from_url)

    render_json({ redirect_url: redirection.to }, :moved_permanently) if redirection.present?
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from)
    end

    def load_organization
      @organization = Organization.last
    end
end
