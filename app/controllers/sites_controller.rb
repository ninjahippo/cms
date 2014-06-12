class SitesController < ApplicationController
  before_filter :authenticate_user!, :only => [:index, :new, :create, :edit, :update]

  def index
    @sites = current_user.sites

    respond_to do |format|
      format.html
      format.json { render json: @sites }
    end
  end

  def new
    @site = Site.new
  end

  def create
    @site = Site.new(params[:site])
    @site.user_id = current_user.id
    @site.save
    redirect_to @site
  end

  def edit
    @site = current_user.sites.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id])
  end

  def update
    @site = current_user.sites.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id])
    @site.update_attributes
    redirect_to @site
  end

  def show
    respond_to do |format|
      format.html { @site = current_user.sites.find_by_slug(params[:id]) }
      format.json {
        if Site.where(:application_token => params[:application_token]).where(:slug => params[:id]).any?
          render json: Site.where(:application_token => params[:application_token]).where(:slug => params[:id]).to_json(:include => { :pages => { :only => :slug } })
        else
          render json: {error: 'Incorrect Application Token or Site Slug.'}, :status => :unauthorized
        end
      }
    end
  end
end
