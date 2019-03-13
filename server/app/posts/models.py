from django.db import models
from datetime import datetime
from django.utils import timezone


class Post(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    text = models.CharField(max_length=120)
    website = models.CharField(max_length=100)
    votes = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text
