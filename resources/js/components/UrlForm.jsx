import React, { useState } from 'react';

const UrlForm = ({ setUrls, urls, handleAddUrl }) => {
    const [newUrl, setNewUrl] = useState('');
    const [urlError, setUrlError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
        return url.match(urlPattern);
    };

    const onSubmit = () => {
        if (!isValidUrl(newUrl)) {
            setUrlError('Invalid URL. Please enter a valid URL.');
            setSuccessMessage(null);
            return;
        }
        handleAddUrl(newUrl, setUrlError, setSuccessMessage);
        setNewUrl('');
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Enter URL to shorten"
                />
                <button type="button" className="btn btn-primary" onClick={onSubmit}>Shorten URL</button>
            </div>
            {urlError && <div className="text-danger mb-3">{urlError}</div>}
            {successMessage && <div className="text-success mb-3">{successMessage}</div>}
        </div>
    );
};

export default UrlForm;
