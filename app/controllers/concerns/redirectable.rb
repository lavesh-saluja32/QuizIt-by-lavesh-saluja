# frozen_string_literal: true

module Redirectable
  extend ActiveSupport::Concern

  DOMAIN = "http://localhost:3000"

  included do
    before_action :handle_redirection
  end

  private

    def handle_redirection
      current_path = request.original_fullpath
      redirection = Redirection.find_by(from: "#{DOMAIN}#{current_path}")
      if redirection
        redirect_to redirection.to, status: :moved_permanently, allow_other_host: true
      end
    end
end
