# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                   :uuid             not null, primary key
#  authentication_token :string
#  email                :string           not null
#  name                 :string
#  organization_name    :string
#  password_digest      :string           not null
#  role                 :string           default("standard_user"), not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  PASSWORD_REQUIREMENTS = /\A
   (?=.{6,})
 /x
  MAX_NAME_LENGTH = 35
  MAX_EMAIL_LENGTH = 255
  MAX_ORGANIZATION_LENGTH = 50
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  VALID_ROLES = %w[admin_user standard_user].freeze

  has_many :quizzes

  has_secure_password
  has_secure_token :authentication_token

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true,
    format: { with: PASSWORD_REQUIREMENTS, message: I18n.t("password") }, on: :create
  validates :password_confirmation, presence: true, if: -> { password.present? }
  validates :role, inclusion: { in: VALID_ROLES }
  validates :organization_name, length: { maximum: MAX_ORGANIZATION_LENGTH }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
