class Api::WidgetsController < ActionController::API
  def index
    @widgets = Widget.all
    render "index", formats: [ :json ], handlers: [ :jbuilder ]
  end

  def show
    @widget = Widget.find(params[:id])
    render "show", formats: [ :json ], handlers: [ :jbuilder ]
  end

  def update
    @widget = Widget.find(params[:id])
    render "show", formats: [ :json ], handlers: [ :jbuilder ]
  end

  def delete
    @widget = Widget.find(params[:id])
    render "show", formats: [ :json ], handlers: [ :jbuilder ]
  end
end
