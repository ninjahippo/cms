class PagesController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :update]

  def create
    @page = Page.new(params[:page])
    @site = current_user.sites.find_by_slug(params[:site_id])
    @page.site_id = @site.id
    respond_to do |format|
      format.json {
        if @page.save
          render json: @site
        else
          render json: @page.errors
        end
      }
    end
  end

  def update
    @page = current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:id]) || current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:page_id])
    @site = current_user.sites.find_by_slug(params[:site_id])
    respond_to do |format|
      format.json {
        if @page.update_attributes(params[:page])
          render json: @site
        else
          render json: @page.errors
        end
      }
    end
  end

  def show
    respond_to do |format|
      format.json { 
        if user_signed_in? and current_user.sites.find_by_slug(params[:site_id])
          render json: current_user.sites.find_by_slug(params[:site_id]).pages.find_by_slug(params[:id])
        else
          if Site.find_by_application_token(params[:application_token]) and Site.find_by_application_token(params[:application_token]).pages.where(:slug => params[:id]).any?
            render json: Site.find_by_application_token(params[:application_token]).pages.where(:slug => params[:id])
          else
            render json: {error: 'Incorrect Application Token or Page Slug'}, :status => :unauthorized
          end
        end
        }
    end
  end
end
