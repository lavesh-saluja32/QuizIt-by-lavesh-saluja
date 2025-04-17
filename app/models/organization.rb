# frozen_string_literal: true

# == Schema Information
#
# Table name: organizations
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_organizations_on_name  (name) UNIQUE
#
class Organization < ApplicationRecord
  has_many :users
  has_many :categories
  has_many :quizzes
  has_many :redirections
  validates :name, uniqueness: { case_sensitive: false }
end
