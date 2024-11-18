from sqlmodel import Session
from ..dto.UserDto import UserCreate,UserResponse
from passlib.hash import bcrypt
from ..models.UserModel import User

class UserService:

    @staticmethod
    def createUser(user: UserCreate, session: Session) -> UserResponse:
       hashPassword = UserService.hashPassword(user.password)

       newUser = User(
           email=user.email,
           name=user.name,
           password=hashPassword
       )

       session.add(newUser)
       session.commit()
       session.refresh(newUser)

       return UserResponse(
           email=user.email,
           name=user.name,
           createdAt=newUser.createdAt,
        updatedAt=newUser.updatedAt
       )
    
    @staticmethod
    def hashPassword(password : str) -> str:
        return bcrypt.hash(password)