from functools import wraps
from fastapi import HTTPException
import re

def validateEmail(func):
    
    @wraps(func)
    def wrapper(*args,**kwargs):

        user = kwargs.get('user')
        mail = user.email
        if not re.match( r"^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$", mail):
            raise HTTPException(
                status_code=400,
                detail='The mail format is not valid'
            )
        
        return func(*args,**kwargs)
    
    return wrapper
