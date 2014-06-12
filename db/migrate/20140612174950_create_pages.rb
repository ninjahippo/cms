class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.integer :site_id
      t.string :title
      t.text :html

      t.timestamps
    end
  end
end
