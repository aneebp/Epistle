from rest_framework.parsers import MultiPartParser, FormParser
# Restframework
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics , permissions
from rest_framework.permissions import AllowAny
# Custom Imports
from api import serializer as api_serializer
from api import models as api_models
from rest_framework import status


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


class PostDetailsView(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_object(self):
        slug = self.kwargs['slug']
        posts = api_models.Post.objects.get(slug=slug, status='Active')
        posts.save()
        return posts

class PostDeleteView(generics.DestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.PostSerializer

    def get_queryset(self):
        return api_models.Post.objects.filter(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        try:
            post = self.get_queryset().get(slug=kwargs['slug'])
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except api_models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)