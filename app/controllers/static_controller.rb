class StaticController < ApplicationController
  def index
  end

  def auth_token
    respond_to do |format|
      if current_user
        format.json { render json: { :status => 'ok', :token => current_user.authentication_token } }
      else
        format.json { render json: { :status => 406,  :message => 'not acceptable'} }
      end
    end
  end
end
