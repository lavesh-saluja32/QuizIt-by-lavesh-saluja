# frozen_string_literal: true

class Api::V1::Admin::OrganizationsController < ApplicationController
  def update
    name = update_params[:name]

    organization = Organization.find_or_create_by!(name: name)
    @current_user.update!(organization: organization)

    render_json
  end

  private

    def update_params
      params.require(:organization).permit(:name)
    end
end
