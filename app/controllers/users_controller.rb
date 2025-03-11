class UsersController < ApplicationController
  allow_unauthenticated_access

  def new
    render "application/root", formats: [ :html ]
  end
end
