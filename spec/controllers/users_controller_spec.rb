require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  render_views

  context '#create' do

    it 'returns an OK status code and renders the correct template' do
      expect(User.count).to eq(0)
      post :create, params: { user: { email_address: "email@domain.com", password: "password" } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/users/show', formats: [ :json ], handlers: [ :jbuilder ])
      expect(User.count).to eq(1)
      user = User.first
      expect(user.email_address).to eq("email@domain.com")
    end

  end

end
