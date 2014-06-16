class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  attr_accessible :email, :password, :password_confirmation, :remember_me, :authentication_token

  before_create :gen_auth_token

  has_many :sites

  private

  def gen_auth_token
    begin
      token = SecureRandom.hex(12)
      self.authentication_token = SecureRandom.hex(12)
    end while User.find_by_authentication_token(token)
  end
end
