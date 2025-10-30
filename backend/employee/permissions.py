from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allows employees to access their own data, admins can access all.
    """
    def has_object_permission(self, request, view, obj):
        return bool(request.user and (request.user.is_staff or obj == request.user))
