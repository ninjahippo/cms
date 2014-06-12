class RemoveSiteIdFromPages < ActiveRecord::Migration
  def up
    remove_column :pages, :site_id
  end

  def down
    add_column :pages, :site_id, :integer
  end
end
