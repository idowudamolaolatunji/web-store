import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { DataProvider } from './contexts/DataContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx'
import { FavoriteProvider } from './contexts/favoriteContext.jsx';
import { WishesProvider } from './contexts/WishesContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <DataProvider>
                <CartProvider>
                    <FavoriteProvider>
                        <WishesProvider>
                            <App />
                        </WishesProvider>
                    </FavoriteProvider> 
                </CartProvider>
            </DataProvider>
        </AuthProvider>
    </React.StrictMode>,
)
