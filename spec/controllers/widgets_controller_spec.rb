require 'rails_helper'

RSpec.describe Api::WidgetsController do
  render_views

  context '#index' do
    it 'returns an OK status code and renders the correct template' do
      get :index
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/index', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns all widgets' do
      Widget.create!(name: "test")
      get :index
      widgets = JSON.parse(response.body)["widgets"]
      expect(widgets.length).to eq 1
      expect(widgets[0]["name"]).to eq "test"
    end
  end

  context '#show' do
    it 'returns an OK status code and renders the correct template' do
      widget = Widget.create!(name: "test")
      get :show, params: { id: widget.id }
      expect(response.status).to eq(200)
      expect(response).to render_template('api/widgets/show', formats: [ :json ], handlers: [ :jbuilder ])
    end

    it 'returns details about a widget' do
      widget = Widget.create!(name: "test")
      get :show, params: { id: widget.id }
      widget_data = JSON.parse(response.body)["widget"]
      expect(widget_data["name"]).to eq "test"
    end
  end
end
