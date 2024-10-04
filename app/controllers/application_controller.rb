class ApplicationController < ActionController::API

  def root
    render 'root', formats: [:html]
  end

end
