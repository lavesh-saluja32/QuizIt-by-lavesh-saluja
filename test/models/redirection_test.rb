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

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_should_be_valid_with_valid_attributes
    redirection = build(:redirection, from: "/old-path", to: "/new-path", organization: @organization)

    assert redirection.valid?
  end

  def test_should_be_invalid_without_from
    redirection = build(:redirection, from: nil, to: "/new-path", organization: @organization)

    assert_not redirection.valid?
    assert_includes redirection.errors[:from], "can't be blank"
  end

  def test_should_be_invalid_without_to
    redirection = build(:redirection, from: "/old-path", to: nil, organization: @organization)

    assert_not redirection.valid?
    assert_includes redirection.errors[:to], "can't be blank"
  end

  def test_should_be_invalid_without_organization
    redirection = build(:redirection, from: "/old-path", to: "/new-path", organization: nil)

    assert_not redirection.valid?
    assert_includes redirection.errors[:organization], "must exist"
  end

  def test_should_not_allow_duplicate_from_within_same_organization
    create(:redirection, from: "/conflict", to: "/destination", organization: @organization)
    duplicate = build(:redirection, from: "/conflict", to: "/another", organization: @organization)

    assert_not duplicate.valid?
    assert_includes duplicate.errors[:from], "has already been taken"
  end

  def test_should_allow_same_from_for_different_organizations
    other_org = create(:organization)
    create(:redirection, from: "/shared-path", to: "/one", organization: @organization)
    redirection = build(:redirection, from: "/shared-path", to: "/two", organization: other_org)

    assert redirection.valid?
  end
end
