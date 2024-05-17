import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UrlForm from './UrlForm';
import UrlList from './UrlList';
import Pagination from './Pagination';
import DOMPurify from 'dompurify';

const UrlShorter = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setUrls(response.data.data);
            setTotalUrls(response.data.total);
        } catch (error) {
            console.error('Error fetching URLs:', error);
            setError('Error fetching URLs');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUrl = async (newUrl, setUrlError, setSuccessMessage) => {
        try {
            const sanitizedUrl = DOMPurify.sanitize(newUrl);
            const response = await axios.post('/api/v1/shorten', { original_url: sanitizedUrl });
            setUrls([...urls, response.data]);
            setSuccessMessage('URL successfully shortened!');
            setUrlError(null);
        } catch (error) {
            console.error('Error adding URL:', error);
            setUrlError('Error adding URL');
            setSuccessMessage(null);
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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">URL Shortener</h2>
                        </div>
                        <div className="card-body">
                            <UrlForm setUrls={setUrls} urls={urls} handleAddUrl={handleAddUrl} />
                            <UrlList urls={urls} handleDeleteUrl={handleDeleteUrl} />
                            <Pagination totalPages={Math.ceil(totalUrls / perPage)} currentPage={currentPage} handlePageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlShorter;
