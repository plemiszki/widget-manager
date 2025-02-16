class ApplicationController < ActionController::Base
  include Authentication
  def root
    render "root", formats: [ :html ]
  end
end
