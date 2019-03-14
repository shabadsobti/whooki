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
from django.contrib.auth.hashers import make_password, check_password


@csrf_exempt
def register_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        hash_password = make_password(password, salt=None, hasher='default')
        user = User(username=username, password=hash_password, email=email)
        try:
            user.save()
            return JsonResponse({'message': "You have been registered"}, status=200)
        except Exception as e:
            return JsonResponse({'message': "There was an error"}, status=400)

    else:  # Get Request not permitted
        return JsonResponse({'message': "GET Request not allowed"}, status=400)


def check_username(request, username):
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': "Username is taken, try something else."}, status=200)
    else:
        return JsonResponse({'message': "Username is not taken."}, status=200)


@csrf_exempt
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        # hash_password = User.objects.get(pk=username).password

        if User.objects.filter(username=username).exists() and check_password(password, User.objects.get(pk=username).password) is True:
            token = generate_authenticator()
            auth = Authenticator(user_id=User.objects.filter(
                username=username).first(), authenticator=token)
            auth.save()
            return JsonResponse({'message': "Login Success", 'token': token}, status=200)
        else:
            return JsonResponse({'message': "Login Failed"}, status=200)
    else:
        return JsonResponse({'message': "POST Request"}, status=400)


def generate_authenticator():
    authenticator = hmac.new(
        key=settings.SECRET_KEY.encode('utf-8'),
        msg=os.urandom(32),
        digestmod='sha256',
    ).hexdigest()

    return authenticator
