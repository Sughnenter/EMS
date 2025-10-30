from rest_framework import serializers
from .models import Employee, Attendance, Task, LeaveRequest
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model

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

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

Employee = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    is_staff = serializers.BooleanField(default=False, required=False)
    is_superuser = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = Employee
        fields = ['email', 'username', 'password', 'full_name', 'is_staff', 'is_superuser']

    def create(self, validated_data):
        user = Employee.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            full_name=validated_data.get('full_name', ''),
            password=validated_data['password'],
        )

        # handle roles
        user.is_staff = validated_data.get('is_staff', False)
        user.is_superuser = validated_data.get('is_superuser', False)
        user.save()

        return user
