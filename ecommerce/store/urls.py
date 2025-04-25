from django.urls import path
from . import views
from .views import login_view, register_view
from django.contrib.auth.views import LogoutView
from .views import CustomLoginView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('register/', register_view, name='register'),
    path('accounts/login/', CustomLoginView.as_view(), name='login'),
    path('', views.store, name="store"),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),
    path('update_item/', views.updateItem, name="update_item"),
    path('process_order/', views.processOrder, name="process_order"),
    path('login/', login_view, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
]
