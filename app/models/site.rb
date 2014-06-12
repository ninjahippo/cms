class Site < ActiveRecord::Base
  attr_accessible :application_token, :title, :url, :user_id, :slug

  belongs_to :user
  has_many :pages

  before_create :gen_app_token
  before_create :gen_slug

  validates_presence_of :title
  validates_presence_of :url
  validates_presence_of :user_id
  validates_uniqueness_of :slug

  def to_param
    slug
  end

  private

  def gen_app_token
    begin
      token = SecureRandom.hex(12)
      self.application_token = SecureRandom.hex(12)
    end while Site.find_by_application_token(token)
  end

  def gen_slug
    slug = self.title.strip
    slug.gsub! /['`]/, ""
    slug.gsub! /\s*@\s*/, " at "
    slug.gsub! /\s*&\s*/, " and "
    slug.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, '_'  
    slug.gsub! /_+/,"_"
    slug.gsub! /\A[_\.]+|[_\.]+\z/,""
    slug.downcase!
    i = 1
    while Site.find_by_slug(slug)
      slug += i.to_s
      i += 1
    end 
    self.slug = slug
  end
end
