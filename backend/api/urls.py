from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views

urlpatterns = [
    path('user/token/', api_views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('user/token/refresh/',TokenRefreshView.as_view(),name='refresh_token'),
    path('user/register/',api_views.RegisterView.as_view(),name='register'),
    path('user/profile/<int:user_id>/',api_views.ProfileView.as_view(),name='profile'),
    path('category/list/', api_views.CategoryView.as_view(),name='category'),
    path('category/posts/<category_slug>',api_views.PostCategoryView.as_view(),name="post_by_category"),
    path('posts/',api_views.PostListView.as_view(),name="posts"),
    path('posts/latest-post/',api_views.LatestPosts.as_view(),name="posts"),
    path('post/details/<post_slug>',api_views.PostDetailsView.as_view(),name='posts_details'),
    path('post/like',api_views.LikeView.as_view(),name='post_like'),
    path('post/comment',api_views.CommentView.as_view(),name='comment'),
    path('post/bookmark',api_views.BookmarkView.as_view(),name="bookmark"),
    path('author/dashboard/<user_id>',api_views.AuthorDashboardView.as_view(),name='dashboard')

    
]
