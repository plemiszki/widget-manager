require 'rails_helper'

RSpec.describe Api::WidgetsController, type: :controller do
  render_views

  context '#index' do
    it 'returns an OK status code and renders the correct template' do
      get :index, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/index', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns all widgets' do
      Widget.create!(name: "test", age: 10)
      get :index, as: :json
      widgets = JSON.parse(response.body)["widgets"]
      expect(widgets.length).to eq 1
      expect(widgets[0]["name"]).to eq "test"
    end
  end

  context '#create' do
    it 'returns an OK status code and renders the correct template' do
      post :create, params: { widget: { name: "test", age: 10 } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/index', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns an array of all widgets, including the new one' do
      post :create, params: { widget: { name: "test", age: 10 } }, as: :json
      widgets_data = JSON.parse(response.body)["widgets"]
      expect(widgets_data[0]["name"]).to eq "test"
    end
  end

  context '#show' do
    it 'returns an OK status code and renders the correct template' do
      widget = Widget.create!(name: "test", age: 10)
      get :show, params: { id: widget.id }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/show', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns details about a widget' do
      widget = Widget.create!(name: "test", age: 10)
      get :show, params: { id: widget.id }, as: :json
      widget_data = JSON.parse(response.body)["widget"]
      expect(widget_data["name"]).to eq "test"
    end
  end

  context '#update' do
    it 'returns an OK status code and renders the correct template' do
      widget = Widget.create!(name: "test", age: 10)
      put :update, params: { id: widget.id, widget: { name: "test2" } }, as: :json
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/show', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'updates a widget' do
      widget = Widget.create!(name: "test", age: 10)
      put :update, params: { id: widget.id, widget: { name: "test2" } }, as: :json
      widget_data = JSON.parse(response.body)["widget"]
      expect(widget_data["name"]).to eq "test2"
    end

    it 'does not update a widget with a blank name' do
      widget = Widget.create!(name: "test", age: 10)
      put :update, params: { id: widget.id, widget: { name: "" } }, as: :json
      expect(response.status).to eq(422)
      expect(widget.name).to eq "test"
      errors = JSON.parse(response.body)["errors"]
      expect(errors["name"]).to eq [ "Name can't be blank" ]
    end
  end

  context "#delete" do
    it 'returns an OK status code' do
      widget = Widget.create!(name: "test", age: 10)
      delete :destroy, params: { id: widget.id }, as: :json
      expect(response.status).to eq(200)
    end

    it 'deletes a widget' do
      widget = Widget.create!(name: "test", age: 10)
      delete :destroy, params: { id: widget.id }, as: :json
      expect(Widget.count).to eq(0)
    end
  end
end
