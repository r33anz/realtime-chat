from pydantic import BaseModel
from .UserDto import UserResponse

class AuthResponse(BaseModel):
    user : UserResponse
    token : str