class Page < ActiveRecord::Base
  attr_accessible :html, :site_id, :title, :slug

  belongs_to :site

  before_create :gen_slug

  validates_presence_of :html
  validates_presence_of :title

  def to_param
    slug
  end

  private

  def gen_slug
    puts '************** CALLED **************'
    slug = self.title.strip
    slug.gsub! /['`]/, ""
    slug.gsub! /\s*@\s*/, " at "
    slug.gsub! /\s*&\s*/, " and "
    slug.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, '_'  
    slug.gsub! /_+/,"_"
    slug.gsub! /\A[_\.]+|[_\.]+\z/,""
    slug.downcase!
    i = 1
    while Site.find(self.site_id).pages.find_by_slug(slug)
      slug += i.to_s
      i += 1
    end 
    self.slug = slug
  end
end
