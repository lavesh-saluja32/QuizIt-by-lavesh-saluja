# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.string :authentication_token
      t.string :role, default: "standard_user", null: false

      t.timestamps
    end
  end
end
