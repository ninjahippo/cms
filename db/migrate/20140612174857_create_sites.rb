class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.integer :user_id
      t.string :title
      t.string :url
      t.string :application_token

      t.timestamps
    end
  end
end
