import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./SnippetEditor.scss";

function SnippetEditor({ getSnippets, setSnippetEditorOpen, editSnippetData, setEditSnippetData }) {

    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");

    useEffect(() => {
        if (editSnippetData) {
            setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
            setEditorDescription(editSnippetData.description ? editSnippetData.description : "");
            setEditorCode(editSnippetData.code ? editSnippetData.code : "");
        }
    }, [editSnippetData]);

    async function saveSnippet(e) {
        e.preventDefault();

        const snippetData = {
            title: editorTitle ? editorTitle : undefined,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined,
        };

        if(!editSnippetData) 
            await Axios.post("http://localhost:3000/snippet/", snippetData);
        else
            await Axios.put(`http://localhost:3000/snippet/${editSnippetData._id}`, snippetData);

        getSnippets();
        closeEditor();        
    }

    function closeEditor() {
        setSnippetEditorOpen(false);
        setEditorCode("");
        setEditorDescription("");
        setEditorTitle("");
        setEditSnippetData(null);
    }

    return ( 
        <div className="snippet-editor">
            <form onSubmit={saveSnippet}>
                <label htmlFor="editor-title">Title</label>
                <input 
                    id="editor-title" 
                    type="text"
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                />

                <label htmlFor="editor-description">Description</label>
                <input 
                    id="editor-description" 
                    type="text"
                    value={editorDescription}
                    onChange={(e) => setEditorDescription(e.target.value)}
                />

                <label htmlFor="editor-code">Code</label>
                <textarea 
                    id="editor-code" 
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                />

                <button className="btn-save" type="submit">Save</button>
                <button className="btn-cancel" type="button" onClick={closeEditor}>Cancel</button>
            </form>
        </div>
)}

export default SnippetEditor;