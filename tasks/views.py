from django.shortcuts import render
from rest_framework import viewsets

from django.views.decorators.csrf import csrf_exempt

from .models import Task
from .serializers import TaskSerializer


# Todos routes
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


# Home route
@csrf_exempt
def index(request):
    return render(request, 'tasks/base.html')
