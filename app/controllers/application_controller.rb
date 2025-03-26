# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Expirable
  include ApiResponders
  include Loggable
  include ApiRescuable
  include Authenticable
  include Pundit::Authorization

  private

    def current_user
      @current_user
    end
end
