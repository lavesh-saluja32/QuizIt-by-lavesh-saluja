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
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { "welcome" }
    password_confirmation { "welcome" }

    trait :admin do
      role { "super_admin" }
    end
  end
end
