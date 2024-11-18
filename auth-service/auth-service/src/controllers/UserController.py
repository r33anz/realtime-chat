from fastapi import status, HTTPException
from src.dto.UserDto import UserResponse,UserCreate
from src.services.UserService import UserService
from sqlmodel import Session

class UserController:
    
    @staticmethod
    def createUser(user : UserCreate, session : Session):
        newUser = UserService.createUser(user,session)
        if not newUser:
            raise HTTPException(status_code=400, detail="Fail to create new user.")
        return newUser
        