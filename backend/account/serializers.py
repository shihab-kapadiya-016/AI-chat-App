from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from django.contrib.auth import get_user_model, authenticate



User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, allow_null = True)
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', "username", 'password', 'email')

    def validate_email(self, value):
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value

    def validate_username(self, value):
        if value and User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already in use")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        return user
    
class EmailOrUsernameTokenSerializer(TokenObtainPairSerializer):
    username_field = "email"
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        login = attrs.get("email") or attrs.get("username")
        password = attrs.get("password")

        if not login or not password:
            raise serializers.ValidationError("Email/Username and password required")

        # Find user
        if "@" in login:
            user = User.objects.filter(email=login).first()
        else:
            user = User.objects.filter(username=login).first()

        if not user:
            raise serializers.ValidationError("User with this email or username not found")

        # Authenticate using Django's internal username field
        user = authenticate(
            request=self.context.get("request"),
            username=user.username,
            password=password,
        )

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        # Return tokens
        refresh = self.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }