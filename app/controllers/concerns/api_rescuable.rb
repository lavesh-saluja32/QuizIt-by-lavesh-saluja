# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern
  include Pundit::Authorization

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
    rescue_from ActiveRecord::StatementInvalid, with: :handle_statement_invalid
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from ActionDispatch::Http::Parameters::ParseError, with: :handle_parse_error
    rescue_from Pundit::NotAuthorizedError, with: :handle_user_not_authorized_error
    rescue_from Timeout::Error, with: :handle_timeout_error
    rescue_from ArgumentError, with: :handle_argument_error
    # rescue_from StandardError, with: :handle_generic_exception
  end

  private

    def handle_validation_error(exception)
      log_exception(exception)
      render_error(exception.record.errors.full_messages.to_sentence, :unprocessable_entity)
    end

    def handle_record_not_found(exception)
      puts "=="
      puts exception.message
      log_exception(exception)
      render_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.record_exists"), :conflict)
    end

    def handle_statement_invalid(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.invalid_query"), :bad_request)
    end

    def handle_api_error(exception)
      log_exception(exception)
      render_error(exception.message, :bad_request)
    end

    def handle_parse_error(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.invalid_json"), :unprocessable_entity)
    end

    def handle_user_not_authorized_error(exception)
      render_error(I18n.t("errors.messages.not_authorized"), :forbidden)
    end

    def handle_jwt_decode_error(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.invalid_token"), :unauthorized)
    end

    def handle_timeout_error(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.timeout"), :gateway_timeout)
    end

    def handle_argument_error(exception)
      log_exception(exception)
      render_error(exception.message, :unprocessable_entity) # Respond with 422 status
    end

    def handle_generic_exception(exception)
      log_exception(exception)
      render_error(I18n.t("errors.messages.generic"), :internal_server_error)
    end

    def log_exception(exception)
      Rails.logger.error "[#{exception.class}] #{exception.message}"
      Rails.logger.error exception.backtrace.join("\n") unless Rails.env.test?
    end
end
