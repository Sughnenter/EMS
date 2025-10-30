from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views import View
from rest_framework import generics, permissions
from .models import Employee, Attendance, Task, LeaveRequest
from .serializers import EmployeeSerializer, AttendanceSerializer, TaskSerializer, LeaveRequestSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .permissions import IsAdminUser, IsOwnerOrAdmin


Employee = get_user_model()
# Employee Views
class EmployeeListView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminUser]  # 👈 Admin-only route

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsOwnerOrAdmin]  # 👈 Employee can see self, admin can see all


# Attendance Views
class AttendanceListView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated,]
    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)


class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsOwnerOrAdmin]


# Task Views
class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        # Employees only see their own tasks
        user = self.request.user
        if user.is_staff:
            return Task.objects.all()
        return Task.objects.filter(employee=user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsOwnerOrAdmin]


# Leave Request Views
class LeaveListView(generics.ListCreateAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(employee=user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

class LeaveDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsOwnerOrAdmin]


# User Registration
class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# JWT Login handled by SimpleJWT
class LoginView(TokenObtainPairView):
    pass


# Token Refresh
class RefreshTokenView(TokenRefreshView):
    pass
