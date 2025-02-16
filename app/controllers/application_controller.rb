class ApplicationController < ActionController::Base

  include Authentication

  def root
    render "root", formats: [ :html ]
  end

  private

  def request_authentication
    respond_to do |format|
      format.json { render json: { error: "Unauthorized" }, status: :unauthorized }
      format.html { super }
    end
  end

end
