from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum
from rest_framework.parsers import MultiPartParser, FormParser
# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics , permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime

# Others
import json
import random

# Custom Imports
from api import serializer as api_serializer
from api import models as api_models


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = api_models.User.objects.all()
    permission_classes = (AllowAny,)  
    serializer_class = api_serializer.RegisterSerializer

#for the authenicated user
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = api_serializer.UserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer= self.get_serializer(user)
        return Response(serializer.data)


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = api_serializer.ProfileSerializer
    #used file uploads
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        user = self.request.user
        return user.profile

    def put(self, request, *args, **kwargs):
        #TAKE THE PROFILE OF THE USER
        profile = self.get_object()
        #ADD THE VALUE TO THE PROFIEL, PARTILA=TRUE IS GONNA allows partial updates, meaning you don't need to provide all fields in the request.
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        #RETURN THE NEW DATA
        return Response(serializer.data)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = api_serializer.ProfileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        user = self.request.user
        return user.profile

    def put(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.ProfileSerializer

    def get_object(self):
        #get user id from url
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        profile = api_models.Profile.objects.get(user=user)
        return profile
    
    


class CategoryView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.CategorySerializer

    def get_queryset(self):
        category = api_models.Category.objects.all()
        return category

class PostCategoryView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        category = api_models.Category.objects.get(slug=category_slug)
        posts = api_models.Post.objects.filter(category=category, status='Active')
        return posts


class PostListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_queryset(self):
        return api_models.Post.objects.filter(status='Active').select_related('user','profile').order_by('-date')
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, profile=self.request.user.profile)


#latest 5 post
class LatestPosts(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_queryset(self):
        return api_models.Post.objects.filter(status='Active').select_related('user','profile').order_by('-date')[:5]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, profile=self.request.user.profile)


class PostDetailsView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_object(self):
        slug = self.kwargs['slug']
        posts = api_models.Post.objects.get(slug=slug, status='Active')
        posts.view += 1
        posts.save()
        return posts
    

class LikeView(APIView):
    def get_post(self,request):
        user_id = request.data['user_id']
        post_id = request.data['post_id']

        user = api_models.User.objects.get(id=user_id)
        post = api_models.Post.objects.get(id=post_id)

        #check if the post is already liked
        if user in post.likes.all():
            post.likes.remove(user)

        else:
            post.likes.add(user)
            #create notification for auther
            api_models.Notification.objects.create(
                user = post.user,
                post = post,
                type = "Like",
            )

class CommentView(APIView):
    def get_post(self,request):
        post_id = request.data['post_id']
        name = request.data['name']
        email = request.data['email']
        comment = request.data['comment']
        post = api_models.Post.objects.get(id=post_id)

        api_models.Comment.objects.create(
            post=post,
            name=name,
            email=email,
            comment=comment,
        )
         #create notification for auther
        api_models.Notification.objects.create(
                user = post.user,
                post = post,
                type = "Comment",
            )
        

class BookmarkView(APIView):
    def get_post(self,request):
        user_id = request.data['user_id']
        post_id = request.data['post_id']

        user = api_models.User.objects.get(id=user_id)
        post = api_models.Post.objects.get(id=post_id)

        bookmark = api_models.Bookmark.objects.filter(user=user,post=post)

        #check if the bookmark is already exist
        if bookmark:
            bookmark.delete()
        else:
            api_models.Bookmark.objects.create(
                user=user,
                post=post,
            )
    
class AuthorDashboardView(generics.ListAPIView):
    serializer_class = api_serializer.AuthorSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)

        views = api_models.Post.objects.filter(user=user).aggregate(views = Sum('view'))['views']
        posts = api_models.Post.objects.filter(user=user).count()
        likes = api_models.Post.objects.filter(user=user).aggregate(likes = Sum('likes'))['likes']
        bookmark = api_models.Bookmark.objects.filter(post__user=user).count()

        return [{
            "views":views,
            "posts":posts,
            "likes":likes,
            "bookmark":bookmark,

        }]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



    
