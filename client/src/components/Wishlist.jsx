import { removeFromWishlist } from '../api';

function Wishlist({ items, onRemove }) {
    if (items.length === 0) {
        return (
            <div style={styles.empty}>
                <p>Your wishlist is empty.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 style={styles.header}>Your Wishlist ({items.length})</h2>
            {items.map((item) => (
                <div key={item.id} style={styles.item}>
                    <div>
                        <strong>{item.name}</strong> — {item.price}
                        <p style={styles.desc}>{item.description}</p>
                    </div>
                    <button
                        style={styles.removeBtn}
                        onClick={() => onRemove(item.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    header: { fontSize: '18px', marginBottom: '12px' },
    empty: { color: '#888', fontStyle: 'italic' },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#fff',
    },
    desc: { fontSize: '13px', color: '#555', margin: '4px 0 0 0' },
    removeBtn: {
        background: 'none',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '4px 10px',
        cursor: 'pointer',
        color: '#e00',
        flexShrink: 0,
        marginLeft: '12px',
    },
};

export default Wishlist;