from django.urls import path, include
from . import views


app_name = 'employee'

urlpatterns = [
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/refresh/', views.RefreshTokenView.as_view(), name='token_refresh'),
    path('employees/', views.EmployeeListView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', views.EmployeeDetailView.as_view(), name='employee-detail'),
    path('attendance/', views.AttendanceListView.as_view(), name='attendance-list'),
    path('attendance/<int:pk>/', views.AttendanceDetailView.as_view(), name='attendance-detail'),
    path('leaves/', views.LeaveListView.as_view(), name='leave-list'),
    path('leaves/<int:pk>/', views.LeaveDetailView.as_view(), name='leave-detail'),
]
