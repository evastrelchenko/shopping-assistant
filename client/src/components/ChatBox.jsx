import { useState } from 'react';
import { getRecommendations } from '../api';
import ProductCard from './ProductCard';

function ChatBox({ onAddToWishlist }) {
    const [input, setInput] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError('');
        setProducts([]);

        try {
            const results = await getRecommendations(input);
            setProducts(results);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div>
            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="What are you looking for? (e.g. wireless headphones under $100)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button style={styles.button} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {products.length > 0 && (
                <div style={styles.results}>
                    <h2 style={styles.resultsHeader}>Recommendations</h2>
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            onAddToWishlist={onAddToWishlist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    inputRow: { display: 'flex', gap: '8px', marginBottom: '16px' },
    input: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '15px',
    },
    button: {
        backgroundColor: '#111',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '15px',
    },
    results: { marginTop: '8px' },
    resultsHeader: { fontSize: '18px', marginBottom: '12px' },
};

export default ChatBox;