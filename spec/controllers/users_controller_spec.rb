require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  render_views

  context '#create' do

    it 'returns an OK status code and renders the correct template' do
      expect(User.count).to eq(0)
      post :create, params: { user: { email_address: "username@domain.com", password: "password" } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/users/show', formats: [ :json ], handlers: [ :jbuilder ])
      expect(User.count).to eq(1)
      user = User.first
      expect(user.email_address).to eq("username@domain.com")
    end

    it 'does not create a user without an email address' do
      post :create, params: { user: { email_address: "", password: "password" } }, as: :json
      expect(response.status).to eq(422)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["emailAddress"][0]).to eq "Email address can't be blank"
    end

    it 'does not create a user without a password' do
      post :create, params: { user: { email_address: "username@domain.com", password: "" } }, as: :json
      expect(response.status).to eq(422)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["password"]).to eq [ "Password can't be blank" ]
    end

    it 'does not create a user with an email address that has already been taken' do
      User.create!(email_address: "user@domain.com", password: "password")
      post :create, params: { user: { email_address: "user@domain.com", password: "password" } }, as: :json
      expect(response.status).to eq(422)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["emailAddress"]).to eq [ "Email address has already been taken" ]
    end

    it 'does not create a user with an invalid email address' do
      post :create, params: { user: { email_address: "user@domain.", password: "password" } }, as: :json
      expect(response.status).to eq(422)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["emailAddress"]).to eq [ "Email address is invalid" ]
    end

  end

end
