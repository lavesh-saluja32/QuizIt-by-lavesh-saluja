# frozen_string_literal: true

# == Schema Information
#
# Table name: redirections
#
#  id              :uuid             not null, primary key
#  from            :string           not null
#  to              :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :uuid             not null
#
# Indexes
#
#  index_redirections_on_organization_id           (organization_id)
#  index_redirections_on_organization_id_and_from  (organization_id,from) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
FactoryBot.define do
  factory :redirection do
    from { "/from-path" }
    to { "/to-path" }
    association :organization
  end
end
