# frozen_string_literal: true

json.array! @redirections do |redirection|
  json.extract! redirection, :id, :from, :to
end
