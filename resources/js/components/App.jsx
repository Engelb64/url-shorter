import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Cookies from 'js-cookie';
import DOMPurify from 'dompurify';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken || Cookies.get('XSRF-TOKEN');

function App() {
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [urlError, setUrlError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5); 
    const [totalUrls, setTotalUrls] = useState(0);

    useEffect(() => {
        fetchUrls();
    }, [currentPage]);

    const fetchUrls = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/urls', {
                params: {
                    page: currentPage,
                    per_page: perPage
                }
            });
            console.log('Response data:', response.data);
            setUrls(response.data.data); 
            setTotalUrls(response.data.total); 
        } catch (error) {
            console.error('Error fetching URLs:', error);
            setError('Error fetching URLs');
        } finally {
            setLoading(false);
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
        return url.match(urlPattern);
    };

    const handleAddUrl = async () => {
        try {
            if (!isValidUrl(newUrl)) {
                setUrlError('Invalid URL. Please enter a valid URL.');
                return;
            }
    
            const sanitizedUrl = DOMPurify.sanitize(newUrl);
            const response = await axios.post('/api/v1/shorten', { original_url: sanitizedUrl });
            setUrls([...urls, response.data]);
            setNewUrl('');
        } catch (error) {
            console.error('Error adding URL:', error);
            setError('Error adding URL');
        }
    };

    const handleDeleteUrl = async (id) => {
        try {
            await axios.delete(`/api/v1/urls/${id}`);
            setUrls(urls.filter(url => url.id !== id));
        } catch (error) {
            console.error('Error deleting URL:', error);
            setError('Error deleting URL');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const totalPages = Math.ceil(totalUrls / perPage);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">URL Shortener</h2>
                        </div>
                        <div className="card-body">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                placeholder="Enter URL to shorten"
                            />
                            <button type="button" className="btn btn-primary" onClick={handleAddUrl}>Shorten URL</button>
                        </div>
                        {urlError && <div className="text-danger mb-3">{urlError}</div>}
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded fw-bold">
                                    <div className="col-id">ID</div>
                                    <div className="col-shortened">SHORTENED URL</div>
                                    <div className="col-original">ORIGINAL URL</div>
                                    <div className="col-actions">ACTIONS</div>
                                </div>
                                {urls.map((url) => (
                                    <div className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded" key={url.id}>
                                        <div className="col-id">{url.id}</div>
                                        <div className="col-shortened">
                                            <a href={url.shortened_url} target="_blank" rel="noopener noreferrer">{url.shortened_url}</a>
                                        </div>
                                        <div className="col-original text-truncate" title={url.original_url}>{url.original_url}</div>
                                        <div className="col-actions">
                                            <button className="btn btn-danger me-2" onClick={() => handleDeleteUrl(url.id)}>Delete</button>
                                            <a className="btn btn-success" href={url.shortened_url} target="_blank" rel="noopener noreferrer">Go</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination">
                                {[...Array(totalPages).keys()].map(page => (
                                    <button
                                        key={page}
                                        className={`btn ${currentPage === page + 1 ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => handlePageChange(page + 1)}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
