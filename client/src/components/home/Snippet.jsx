import React from 'react';
import Axios from "axios";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {

    async function deleteSnippet() {
        await Axios.delete(`http://localhost:3000/snippet/${snippet._id}`)
        getSnippets();
    }

    return (
        <div className='snippet'>
            {snippet.title && <h2 className='title'>{snippet.title}</h2>}
            {snippet.description && <p className='description'>{snippet.description}</p>}
            {snippet.code && (
                <pre className='code'>
                    <code>{snippet.code}</code>
                </pre>
            )}
            <button className='btn-edit' onClick={() => editSnippet(snippet)}>Edit</button>
            <button className='btn-delete' onClick={deleteSnippet}>Delete</button>
        </div>
    )
}

export default Snippet;
