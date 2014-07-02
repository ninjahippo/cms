class StaticController < ApplicationController
  def index
  end

  def auth_token
    if params[:email] and params[:password]
      @user = User.find_by_email(params[:email])
      if @user.valid_password?(params[:password])
        sign_in @user
      end      
    end

    respond_to do |format|
      if current_user
        format.json { render json: { :status => 'ok', :token => current_user.authentication_token } }
      else
        format.json { render json: { :status => 406,  :message => 'not acceptable'} }
      end
    end
  end
end
