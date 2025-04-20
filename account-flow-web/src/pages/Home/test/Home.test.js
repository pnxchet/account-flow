import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';
import { Constant } from '../../../data/constant/Constant';
import useCartStore from '../../../core/stores/cartStore';
import useProductStore from '../../../core/stores/productStore';
import { useNavigate } from 'react-router-dom';

jest.mock('../../../core/stores/cartStore');
jest.mock('../../../core/stores/productStore');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('../../../components/common', () => ({
    ProductCard: ({ product, onAddToCart }) => (
        <div data-testid={`product-card-${product.id}`}>
            <button data-testid={`add-to-cart-${product.id}`} onClick={() => onAddToCart(product)}>
                Add to Cart
            </button>
        </div>
    ),
}));

jest.mock('@mui/material/Badge', () => ({
    __esModule: true,
    default: ({ badgeContent, children }) => (
        <div data-testid="badge" data-badge-content={badgeContent}>
            {children}
        </div>
    ),
}));

jest.mock('@mui/material/IconButton', () => ({
    __esModule: true,
    default: ({ onClick, children }) => (
        <button data-testid="cart-icon-button" onClick={onClick}>
            {children}
        </button>
    ),
}));

jest.mock('@mui/icons-material/ShoppingCart', () => ({
    __esModule: true,
    default: () => <div data-testid="shopping-cart-icon">ShoppingCartIcon</div>,
}));

describe('Home Component', () => {
    const mockAddItem = jest.fn();
    const mockGetItemCount = jest.fn().mockReturnValue(5);
    const mockResetAppiedCoupons = jest.fn();
    const mockNavigate = jest.fn();
    const mockProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
    ];

    beforeEach(() => {
        useCartStore.mockReturnValue({
            addItem: mockAddItem,
            getItemCount: mockGetItemCount,
            resetAppiedCoupons: mockResetAppiedCoupons,
        });
        useProductStore.mockReturnValue({
            products: mockProducts,
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component with the correct title', () => {
        render(<Home />);
        expect(screen.getByText(Constant.HOME.TITLE)).toBeInTheDocument();
    });

    test('displays the correct number of products', () => {
        render(<Home />);
        mockProducts.forEach(product => {
            expect(screen.getByTestId(`product-card-${product.id}`)).toBeInTheDocument();
        });
    });

    test('displays the correct cart item count in badge', () => {
        render(<Home />);
        expect(mockGetItemCount).toHaveBeenCalled();
        const badge = screen.getByTestId('badge');
        expect(badge).toHaveAttribute('data-badge-content', '5');
    });

    test('navigates to cart page and resets coupons when shopping cart icon is clicked', () => {
        render(<Home />);
        const cartIconButton = screen.getByTestId('cart-icon-button');
        fireEvent.click(cartIconButton);
        expect(mockResetAppiedCoupons).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });

    test('adds item to cart when "Add to Cart" button is clicked', () => {
        render(<Home />);
        const addToCartButton = screen.getByTestId(`add-to-cart-${mockProducts[0].id}`);
        fireEvent.click(addToCartButton);
        expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0]);
    });

    test('handles empty product list gracefully', () => {
        useProductStore.mockReturnValue({
            products: [],
        });
        render(<Home />);
        expect(screen.queryByTestId(/product-card-/)).not.toBeInTheDocument();
    });

    test('adds multiple items to cart', () => {
        render(<Home />);
        mockProducts.forEach(product => {
            const addButton = screen.getByTestId(`add-to-cart-${product.id}`);
            fireEvent.click(addButton);
        });
        expect(mockAddItem).toHaveBeenCalledTimes(2);
        expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0]);
        expect(mockAddItem).toHaveBeenCalledWith(mockProducts[1]);
    });
});