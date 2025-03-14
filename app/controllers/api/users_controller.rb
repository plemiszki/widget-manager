class Api::UsersController < ApplicationController
  include RenderErrors

  allow_unauthenticated_access

  def create
    @user = User.new(user_params)
    if @user.save
      render "show", formats: [ :json ], handlers: [ :jbuilder ]
    else
      render_errors(@user)
    end
  end

  private

  def user_params
    params[:user].permit(:email_address, :password)
  end

end
