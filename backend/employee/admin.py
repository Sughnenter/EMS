from django.contrib import admin
from .models import Employee, Attendance, Task, LeaveRequest
from django.contrib.auth.admin import UserAdmin

# Extend the default Django UserAdmin for Employeepu
@admin.register(Employee)
class EmployeeAdmin(UserAdmin):
    model = Employee
    list_display = ('username', 'full_name', 'email', 'position', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'position')
    search_fields = ('username', 'full_name', 'email', 'position')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('full_name', 'DOB', 'address', 'gender', 'phone_number', 'email', 'position')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'full_name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'check_in', 'check_out', 'status')
    list_filter = ('status', 'date')
    search_fields = ('employee__username', 'employee__full_name')
    ordering = ('-date',)


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'employee', 'assigned_date', 'deadline', 'status')
    list_filter = ('status', 'deadline')
    search_fields = ('title', 'employee__username', 'employee__full_name')
    ordering = ('-assigned_date',)


@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('employee', 'start_date', 'end_date', 'status', 'applied_on')
    list_filter = ('status', 'start_date')
    search_fields = ('employee__username', 'employee__full_name')
    ordering = ('-applied_on',)
