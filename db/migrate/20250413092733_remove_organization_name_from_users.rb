# frozen_string_literal: true

class RemoveOrganizationNameFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :organization_name, :string
  end
end
