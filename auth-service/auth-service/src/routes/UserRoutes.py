from fastapi import APIRouter,status, Depends
from ..dto.UserDto import UserCreate,UserLogin
from ..dto.AuthDto import AuthResponse
from ..controllers.UserController import UserController
from src.databaseConnection import get_session
from sqlmodel import Session
from src.decorator.UserDecorator import validateEmail

router = APIRouter()

@router.post('/user', response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
@validateEmail
def createUser(user : UserCreate , session: Session = Depends(get_session)):
    return UserController.createUser(user,session)

@router.post('/login')
def loginUser(user:UserLogin, session: Session = Depends(get_session)):
    pass