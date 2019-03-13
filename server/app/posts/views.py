from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from users.models import User, Authenticator
from .models import Post
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
def add_post(request):
    if request.method == "POST":
        auth_token = request.POST['auth_token']
        text = request.POST['text']
        website = request.POST['website']
        if Authenticator.objects.filter(authenticator=auth_token):
            user = Authenticator.objects.filter(authenticator=auth_token).first().user_id
            post = Post(user=user, text=text, website=website)
            post.save()
            return JsonResponse({'message': "Post has been added"}, status=200)
        else:
            return JsonResponse({'message': "User could not be authenticated"}, status=200)
    else:
        return HttpResponse("Need a POST")


@csrf_exempt
def get_posts(request):
    if request.method == "POST":
        auth_token = request.POST['auth_token']
        website = request.POST['website']
        if Authenticator.objects.filter(authenticator=auth_token):
            posts = Post.objects.filter(website=website).order_by('-votes')
            data = list(posts.values())
            return JsonResponse(data, status=200, safe=False)
        else:
            return JsonResponse({'message': "User could not be authenticated"}, status=200)
    else:
        return HttpResponse("Need a POST")
