# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                   :uuid             not null, primary key
#  authentication_token :string
#  email                :string           not null
#  name                 :string
#  password_digest      :string           not null
#  role                 :string           default("standard_user"), not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { "welcome" }
    password_confirmation { "welcome" }
    role { "standard_user" }
  end
end
