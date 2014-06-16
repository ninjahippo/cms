class SitesController < ApplicationController
  before_filter :authenticate_user!, :only => [:index, :new, :create, :edit, :update]

  def index
    respond_to do |format|
      format.json { render json: current_user.sites.to_json(:include => { :pages => { :only => [:slug, :title] } }) }
    end
  end

  def create
    @site = Site.new(params[:site])
    @site.user_id = current_user.id
    respond_to do |format|
      format.json {
        if @site.save
          render json: @site
        else
          render json: @site.errors
        end
      }
    end

  end

  def update
    @site = current_user.sites.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id])
    respond_to do |format|
      format.json {
        if @site.update_attributes(params[:site])
          render json: @site
        else
          render json: @site.errors
        end
      }
    end
  end

  def show
    respond_to do |format|
      format.json {
        if user_signed_in?
          render json: current_user.sites.find_by_slug(params[:id]).to_json(:include => { :pages => { :only => [:slug, :title] } })
        else        
          if Site.where(:application_token => params[:application_token]).where(:slug => params[:id]).any?
            render json: Site.where(:application_token => params[:application_token]).where(:slug => params[:id]).to_json(:include => { :pages => { :only => [:slug, :title] } })
          else
            render json: {error: 'Incorrect Application Token or Site Slug.'}, :status => :unauthorized
          end
        end
      }
    end
  end
end
