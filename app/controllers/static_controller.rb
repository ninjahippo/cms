class StaticController < ApplicationController
  def index
    if user_signed_in?
      redirect_to '/dashboard'
    else
      respond_to do |format|
        format.html
      end
    end
  end
end
