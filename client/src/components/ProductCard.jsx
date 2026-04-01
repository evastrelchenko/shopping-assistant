function ProductCard({ product, onAddToWishlist }) {
    return (
        <div style={styles.card}>
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>{product.price}</p>
            <p style={styles.description}>{product.description}</p>
            <button
                style={styles.button}
                onClick={() => onAddToWishlist(product)}
            >
                + Save to Wishlist
            </button>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: '#fff',
    },
    name: { margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' },
    price: { margin: '0 0 8px 0', color: '#2563eb', fontWeight: '500' },
    description: { margin: '0 0 12px 0', color: '#555', fontSize: '14px' },
    button: {
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 14px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default ProductCard;