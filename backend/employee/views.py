from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views import View

class EmployeeListView(View):
    def get(self, request):
        return JsonResponse({"message": "Employee List"})

class EmployeeDetailView(View):
    def get(self, request, pk):
        return JsonResponse({"message": f"Employee Detail {pk}"})

class AttendanceListView(View):
    def get(self, request):
        return JsonResponse({"message": "Attendance List"})

class AttendanceDetailView(View):
    def get(self, request, pk):
        return JsonResponse({"message": f"Attendance Detail {pk}"})

class LeaveListView(View):
    def get(self, request):
        return JsonResponse({"message": "Leave List"})

class LeaveDetailView(View):
    def get(self, request, pk):
        return JsonResponse({"message": f"Leave Detail {pk}"})
