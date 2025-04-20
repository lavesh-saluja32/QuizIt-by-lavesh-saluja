# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id              :uuid             not null, primary key
#  name            :string
#  position        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :uuid
#
# Indexes
#
#  index_categories_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
FactoryBot.define do
  factory :category do
    name { Faker::Educator.subject }
    organization
  end
end
