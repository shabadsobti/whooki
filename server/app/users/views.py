from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .forms import UserRegisterForm
from .models import User, Authenticator
import json
import requests
from django.views.decorators.csrf import csrf_exempt
import os
import hmac
from django.conf import settings


@csrf_exempt
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


def check_username(request, username):
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': "Username is taken, try something else."}, status=400)
    else:
        return JsonResponse({'message': "Username is not taken."}, status=200)


@csrf_exempt
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    if User.objects.filter(username=username, password=password).exists():
        token = generate_authenticator()
        auth = Authenticator(user_id=User.objects.filter(
            username=username, password=password).first(), authenticator=token)
        auth.save()
        return JsonResponse({'message': "Login Success"}, status=200)
    else:
        return JsonResponse({'message': "Login Failed"}, status=400)


def generate_authenticator():
    authenticator = hmac.new(
        key=settings.SECRET_KEY.encode('utf-8'),
        msg=os.urandom(32),
        digestmod='sha256',
    ).hexdigest()

    return authenticator
