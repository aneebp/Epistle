from django.contrib import admin
from .models import Profile,User,Category,Post,Comment,Bookmark,Notification

# Register your models here.
admin.site.register(Profile)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Bookmark)
admin.site.register(Notification)



