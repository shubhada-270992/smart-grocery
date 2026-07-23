from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List
import sqlite3
from .database import get_db

router = APIRouter()

# Pydantic Schemas
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    status: str
    username: str
    token: str

class DashboardStats(BaseModel):
    total_products: int
    low_stock_products: int
    todays_sales: float
    total_revenue: float

class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    quantity: int
# Login Route
@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):
    if request.username == "admin" and request.password == "admin123":
        return {
            "status": "success",
            "username": "admin",
            "token": "mock-admin-session-token"
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password"
    )

# Dashboard Stats Route
@router.get("/dashboard", response_model=DashboardStats)
def get_dashboard_stats(conn: sqlite3.Connection = Depends(get_db)):
    cursor = conn.cursor()
    
    # Get total products count
    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]
    
    # Get low stock products count (< 10)
    cursor.execute("SELECT COUNT(*) FROM products WHERE quantity < 10")
    low_stock_products = cursor.fetchone()[0]
    
    # Hardcoded/Mock metrics for practice
    todays_sales = 350.00
    total_revenue = 2450.00
    
    return {
        "total_products": total_products,
        "low_stock_products": low_stock_products,
        "todays_sales": todays_sales,
        "total_revenue": total_revenue
    }

# Products List Route
@router.get("/products", response_model=List[ProductResponse])
def get_products(conn: sqlite3.Connection = Depends(get_db)):
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, category, price, quantity FROM products")
    rows = cursor.fetchall()
    
    return [
        {
            "id": row["id"],
            "name": row["name"],
            "category": row["category"],
            "price": row["price"],
            "quantity": row["quantity"]
        }
        for row in rows
    ]

