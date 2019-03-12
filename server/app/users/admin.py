from django.contrib import admin

# Register your models here.
# Register your models here.
from .models import User, Authenticator

admin.site.register(User)
admin.site.register(Authenticator)
