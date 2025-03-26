# frozen_string_literal: true

class AddRoleCheckConstraintToUsers < ActiveRecord::Migration[7.1]
  def change
    add_check_constraint :users, "role IN ('admin_user', 'standard_user')", name: "check_user_role"
  end
end
