import React from 'react';

const UrlList = ({ urls, handleDeleteUrl }) => {
    return (
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
    );
};

export default UrlList;
