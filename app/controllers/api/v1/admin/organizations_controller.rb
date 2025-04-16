# frozen_string_literal: true

class Api::V1::Admin::OrganizationsController < ApplicationController
  before_action :load_organization
  def update
    @organization.update!(update_params)
  end

  def show
    render
  end

  private

    def load_organization
      @organization = @current_user.organization
    end

    def update_params
      params.require(:organization).permit(:name)
    end
end
