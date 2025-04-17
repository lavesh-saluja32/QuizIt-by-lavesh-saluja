# frozen_string_literal: true

class AddOrganizationAndConstraintsToRedirections < ActiveRecord::Migration[7.1]
  def change
    remove_index :redirections, :from if index_exists?(:redirections, :from, unique: true)

    change_column_null :redirections, :from, false
    change_column_null :redirections, :to, false

    add_reference :redirections, :organization, null: false, foreign_key: true, type: :uuid

    add_index :redirections, [:organization_id, :from], unique: true
  end
end
