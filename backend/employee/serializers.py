from rest_framework import serializers
from .models import Employee, Attendance, Task, LeaveRequest
from django.contrib.auth.password_validation import validate_password

class EmployeeSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = Employee
        fields = ['id', 'full_name', 'password', 'email', 'dob', 'address', 'gender', 'phone_number', 'position']
    def create(self, validated_data):
        user = Employee.objects.create(
        full_name=validated_data['full_name'],
        email=validated_data['email'],
        username=validated_data.get('username', validated_data['email']),
        dob=validated_data.get('dob'),
        address=validated_data.get('address'),
        gender=validated_data.get('gender'),
        phone_number=validated_data.get('phone_number'),
        position=validated_data.get('position')
    )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    
    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'check_in', 'check_out', 'status', 'remarks']

class TaskSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'employee', 'title', 'description', 'assigned_date', 'deadline', 'status']

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = LeaveRequest
        fields = ['id', 'employee', 'start_date', 'end_date', 'reason', 'status', 'applied_on']
