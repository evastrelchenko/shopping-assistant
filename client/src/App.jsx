import { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import Wishlist from './components/Wishlist';
import { getWishlist, addToWishlist, removeFromWishlist } from './api';

function App() {
    const [wishlist, setWishlist] = useState([]);
    const [activeTab, setActiveTab] = useState('search');

    useEffect(() => {
        getWishlist().then(setWishlist).catch(console.error);
    }, []);

    const handleAddToWishlist = async (product) => {
        const saved = await addToWishlist(product);
        setWishlist((prev) => [saved, ...prev]);
    };

    const handleRemove = async (id) => {
        await removeFromWishlist(id);
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>🛍️ Shopping Assistant</h1>
                <p style={styles.subtitle}>Tell me what you need — I'll find it.</p>
            </header>

            <div style={styles.tabs}>
                <button
                    style={activeTab === 'search' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('search')}
                >
                    Search
                </button>
                <button
                    style={activeTab === 'wishlist' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('wishlist')}
                >
                    Wishlist ({wishlist.length})
                </button>
            </div>

            <main style={styles.main}>
                {activeTab === 'search' ? (
                    <ChatBox onAddToWishlist={handleAddToWishlist} />
                ) : (
                    <Wishlist items={wishlist} onRemove={handleRemove} />
                )}
            </main>
        </div>
    );
}

const styles = {
    container: { maxWidth: '700px', margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' },
    header: { textAlign: 'center', marginBottom: '24px' },
    title: { fontSize: '28px', margin: '0 0 6px 0' },
    subtitle: { color: '#666', margin: 0 },
    tabs: { display: 'flex', gap: '8px', marginBottom: '20px' },
    tab: {
        padding: '8px 20px', borderRadius: '6px', border: '1px solid #ccc',
        background: '#fff', cursor: 'pointer', fontSize: '14px',
    },
    activeTab: {
        padding: '8px 20px', borderRadius: '6px', border: '1px solid #111',
        background: '#111', color: '#fff', cursor: 'pointer', fontSize: '14px',
    },
    main: { backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px' },
};

export default App;