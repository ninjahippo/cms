class AddSiteSlugToPages < ActiveRecord::Migration
  def change
    add_column :pages, :site_slug, :string
  end
end
