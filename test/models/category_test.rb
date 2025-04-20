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
require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category, name: "Science")
  end

  def test_valid_category
    assert @category.valid?
  end

  def test_invalid_without_name
    @category.name = nil
    assert_not @category.valid?
    assert_includes @category.errors[:name], "can't be blank"
  end

  def test_duplicate_category_name
    @category.save!
    duplicate_category = Category.new(name: "Science")
    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors[:name], "has already been taken"
  end
end
