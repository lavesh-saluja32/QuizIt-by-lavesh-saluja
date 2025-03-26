# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiRescuable
  include Expirable
  include ApiResponders
  include Loggable
  include Authenticable

  private

    def current_user
      @current_user
    end
end
