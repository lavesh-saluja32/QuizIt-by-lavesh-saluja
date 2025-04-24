# frozen_string_literal: true

if Rails.env.development?
  Rails.application.config.action_mailer.delivery_method = :letter_opener
  Rails.application.config.action_mailer.perform_deliveries = true
end

if Rails.env.production?
  if Rails.application.secrets.host.blank?
    raise "URLs in email use Rails.application.secrets.host. This is not set. Please fix it"
  end
end
