from django.db import models
from datetime import datetime
from django.utils import timezone


class User(models.Model):
    username = models.CharField(max_length=20, primary_key=True)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=370)

    def __str__(self):
        return self.username


class Authenticator(models.Model):
    authenticator = models.CharField(max_length=300)
    user_id = models.ForeignKey(
        'users.User', on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.authenticator
