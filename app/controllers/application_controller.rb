class ApplicationController < ActionController::Base
  def root
    render "root", formats: [ :html ]
  end
end
