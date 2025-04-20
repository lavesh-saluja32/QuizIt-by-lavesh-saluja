# frozen_string_literal: true

class Admin::CategoryPolicy
  attr_reader :user, :category

  def initialize(user, category)
    @user = user
    @category = category
  end

  def create?
    user.organization_id == category.organization_id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def reorder?
    puts user.inspect
    puts category
    puts "LKLK"
    create?
  end
end
