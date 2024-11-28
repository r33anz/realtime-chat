from sqlmodel import Session,select
from ..dto.UserDto import UserCreate,UserResponse,UserLogin
from passlib.hash import bcrypt
from ..models.UserModel import User
from fastapi import HTTPException
from ..dto.AuthDto import AuthResponse
import jwt
from dotenv import  load_dotenv
import os

load_dotenv()

class UserService:

    SECRET_KEY = os.getenv('SECRET_KEY')

    @staticmethod
    def createUser(user: UserCreate, session: Session):
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

        userResponse =  UserResponse(
            email=user.email,
            name=user.name,
            createdAt=newUser.createdAt,
            updatedAt=newUser.updatedAt
        )

        token = UserService.generateJWT(user.email)

        return AuthResponse(
            user= userResponse,
            token= token
        )

    @staticmethod
    def loginUser(user: UserLogin, session: Session):
        userLogged = session.exec(select(User).where(User.email == user.email)).first()
        if not userLogged:
            raise HTTPException(status_code=401, detail="Invalid email.")

        if not bcrypt.verify(user.password,userLogged.password):
            raise HTTPException(status_code=401, detail="Password incorrect.")

        userResponse = UserResponse(
            email=userLogged.email,
            name=userLogged.name,
            createdAt=userLogged.createdAt,
            updatedAt=userLogged.updatedAt
        )

        token = UserService.generateJWT(userLogged.email)

        return AuthResponse(
            user = userResponse,
            token= token
        )
    
    @staticmethod
    def generateJWT(userEmail :str) -> str:
        secret_key = UserService.SECRET_KEY
        payload = {
            "sub": userEmail,
            "exp": 60
            }
        return jwt.encode(payload, secret_key, algorithm="HS256")
        
    @staticmethod
    def hashPassword(password : str) -> str:
        return bcrypt.hash(password)
    