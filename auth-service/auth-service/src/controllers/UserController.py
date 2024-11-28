from fastapi import status, HTTPException
from src.dto.UserDto import UserCreate,UserLogin
from src.services.UserService import UserService
from sqlmodel import Session

class UserController:
    
    @staticmethod
    def createUser(user : UserCreate, session : Session):
        newUser = UserService.createUser(user,session)
        if not newUser:
            raise HTTPException(status_code=400, detail="Fail to create new user.")
        return newUser
        
    @staticmethod
    def loginUser(user: UserLogin, session: Session):
        userLogged = UserService.loginUser(user,session)
        if not user:
            raise HTTPException(status_code=400,detail='Failed to login')
        return userLogged
