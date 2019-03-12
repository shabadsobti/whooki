from django.db import models
from django.forms import ModelForm
from .models import User


class UserRegisterForm(ModelForm):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
