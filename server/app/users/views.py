from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .forms import UserRegisterForm
from .models import User
import json
import requests


def register_user(request):
    if request.method == "POST":
        form_data = UserRegisterForm(request.POST)
        if form_data.is_valid():
            form = form_data.save()
            return JsonResponse({'message': "You have been registered"}, status=200)
        else:
            return JsonResponse({'message': "There was an error"}, status=400)
    else:  # Get Request not permitted
        return JsonResponse({'message': "GET Request not allowed"}, status=400)
