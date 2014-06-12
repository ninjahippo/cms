class PagesController < ApplicationController
  before_filter :authenticate_user!, :only => [:new, :create, :edit, :update]

  def new
    @site = current_user.sites.find_by_slug(params[:site_id])
    @page = Page.new(:site_id => @site.id)
  end

  def create
    @page = Page.new(params[:page])
    @site = current_user.sites.find_by_slug(params[:site_id])
    @page.site_id = @site.id
    @page.save
    redirect_to @site
  end

  def edit
    @page = current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:page_id])
    @site = current_user.sites.find_by_slug(params[:site_id])
  end

  def update
    @page = current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:page_id])
    @site = current_user.sites.find(params[:site_id])
    @page.update_attributes
    redirect_to @site
  end

  def show
    respond_to do |format|
      format.html { @page = current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:id]) }
      format.json { 
        if Site.find_by_application_token(params[:application_token]) and Site.find_by_application_token(params[:application_token]).pages.where(:slug => params[:id]).any?
          render json: Site.find_by_application_token(params[:application_token]).pages.where(:slug => params[:id])
        else
          render json: {error: 'Incorrect Application Token or Page Slug'}, :status => :unauthorized
        end
        }
    end
  end
end
