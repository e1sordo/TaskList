from django.conf.urls import include, url
from rest_framework import routers

from . import views

task_router = routers.DefaultRouter()
task_router.register(r'tasks', views.TaskViewSet, base_name='tasks')


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url('^api/', include(task_router.urls)),
]
