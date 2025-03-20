class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new ]

  def new
    render "application/root", formats: [ :html ]
  end

end
