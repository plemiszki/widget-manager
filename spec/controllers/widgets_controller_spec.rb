require 'rails_helper'

RSpec.describe Api::WidgetsController, type: :controller do
  render_views

  before(:all) do
    user = User.create!(email_address: "test@example.com", password: "password")
    Session.create!(user: user)
    Widget.create!(name: "test", age: 10)
  end

  after(:all) do
    User.first.destroy
    Widget.first.destroy
  end

  context '#index' do

    it 'is gated' do
      get :index, as: :json
      expect(response.status).to eq(401)
    end

    it 'returns an OK status code and renders the correct template' do
      create_user_session
      get :index, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/index', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns all widgets' do
      create_user_session
      get :index, as: :json
      widgets = JSON.parse(response.body)["widgets"]
      expect(widgets.length).to eq 1
      expect(widgets[0]["name"]).to eq "test"
    end
  end

  context '#create' do

    it 'is gated' do
      post :create, params: { widget: { name: "test", age: 10 } }, as: :json
      expect(response.status).to eq(401)
    end

    it 'returns an OK status code and renders the correct template' do
      create_user_session
      post :create, params: { widget: { name: "test2", age: 10 } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/index', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns an array of all widgets, including the new one' do
      create_user_session
      post :create, params: { widget: { name: "test2", age: 10 } }, as: :json
      widgets_data = JSON.parse(response.body)["widgets"]
      expect(widgets_data[0]["name"]).to eq "test"
    end
  end

  context '#show' do

    it 'is gated' do
      get :show, params: { id: Widget.first.id }, as: :json
      expect(response.status).to eq(401)
    end

    it 'returns an OK status code and renders the correct template' do
      create_user_session
      get :show, params: { id: Widget.first.id }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/show', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns details about a widget' do
      create_user_session
      get :show, params: { id: Widget.first.id }, as: :json
      widget_data = JSON.parse(response.body)["widget"]
      expect(widget_data["name"]).to eq "test"
    end
  end

  context '#update' do

    it 'is gated' do
      put :update, params: { id: Widget.first.id, widget: { name: "test2" } }, as: :json
      expect(response.status).to eq(401)
    end

    it 'returns an OK status code and renders the correct template' do
      create_user_session
      put :update, params: { id: Widget.first.id, widget: { name: "test2" } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/show', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'updates a widget' do
      create_user_session
      put :update, params: { id: Widget.first.id, widget: { name: "test2" } }, as: :json
      widget_data = JSON.parse(response.body)["widget"]
      expect(widget_data["name"]).to eq "test2"
    end

    it 'does not update a widget with a blank name' do
      create_user_session
      put :update, params: { id: Widget.first.id, widget: { name: "" } }, as: :json
      expect(response.status).to eq(422)
      expect(Widget.first.name).to eq "test"
      errors = JSON.parse(response.body)["errors"]
      expect(errors["name"]).to eq [ "Name can't be blank" ]
    end
  end

  context "#delete" do

    it 'is gated' do
      delete :destroy, params: { id: Widget.first.id }, as: :json
      expect(response.status).to eq(401)
    end

    it 'returns an OK status code' do
      create_user_session
      delete :destroy, params: { id: Widget.first.id }, as: :json
      expect(response.status).to eq(200)
    end

    it 'deletes a widget' do
      create_user_session
      delete :destroy, params: { id: Widget.first.id }, as: :json
      expect(Widget.count).to eq(0)
    end
  end
end
