from django.db import models
from datetime import datetime
from django.utils import timezone


class User(models.Model):
    email = models.CharField(max_length=50)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.username
