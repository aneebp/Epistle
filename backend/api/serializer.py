from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile,User,Category,Post,Comment,Bookmark,Notification
from django.utils.dateformat import format

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username

        return token
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["full_name", "email", "password", "password2"]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password did not match"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email']
        )
        email_username, domain = user.email.split('@')
        user.username = email_username
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source='profile.image', read_only=True)
    bio = serializers.CharField(source='profile.bio', allow_blank=True, required=False)
    about = serializers.CharField(source='profile.about', allow_blank=True, required=False)
    class Meta:
        model = User
        fields = ["id","username","email","full_name","profile_image","bio","about"]


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ["id", "full_name", "bio", "about","image"]

    


class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    def get_post_count(self, category):
        return category.posts.count()

    class Meta:
        model = Category
        fields = [
            "id","title","image","slug","post_count",
        ]


class CommentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Comment
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CommentSerializer,self).__init__( *args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile = ProfileSerializer(read_only=True)
    formatted_date = serializers.SerializerMethodField()
    class Meta: 
        model = Post
        fields = ["title", "image", "description", "tags", "category", "status","slug","user","profile","formatted_date"]

    def __init__(self, *args, **kwargs):
        super(PostSerializer,self).__init__( *args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1
    def get_formatted_date(self, obj):
        return format(obj.date, 'd M Y')



class BookmarkSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Bookmark
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(BookmarkSerializer,self).__init__( *args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1


class NotificationSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Notification
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer,self).__init__( *args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1


class AuthorSerializer(serializers.Serializer):
    views = serializers.IntegerField(default=0)
    posts = serializers.IntegerField(default=0)
    likes = serializers.IntegerField(default=0)
    bookmarks = serializers.IntegerField(default=0)

    

