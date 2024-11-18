from fastapi import APIRouter,status, Depends
from ..dto.UserDto import UserCreate,UserResponse
from ..controllers.UserController import UserController
from src.databaseConnection import get_session
from sqlmodel import Session

router = APIRouter()

@router.post('/user', response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def createUser(user : UserCreate , session: Session = Depends(get_session)):
    return UserController.createUser(user,session)