from sqlmodel import Session,select
from ..dto.UserDto import UserCreate,UserResponse
from passlib.hash import bcrypt
from ..models.UserModel import User
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

class UserService:

    @staticmethod
    def createUser(user: UserCreate, session: Session) -> UserResponse:

        email_exists = session.exec(select(User).where(User.email == user.email)).first()
        if email_exists:
            raise HTTPException(
                status_code=400,
                detail=f"The email '{user.email}' is already registered. Please use a different email."
            )

        name_exists = session.exec(select(User).where(User.name == user.name)).first()
        if name_exists:
            raise HTTPException(
                status_code=400,
                detail=f"The name '{user.name}' is already in use. Please choose a different name."
            )
        
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