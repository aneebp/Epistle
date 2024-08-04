from django.contrib import admin
from .models import Profile,User,Category,Post

# Register your models here.
admin.site.register(Profile)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Post)



