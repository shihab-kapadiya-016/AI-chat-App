from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("register/", views.register, name='register'),
    path("login/", TokenObtainPairView.as_view(), name='login'),
    path("refresh/", TokenRefreshView.as_view(), name='refresh-token'),
    path("logout/", views.logout, name='register'),
    
]
