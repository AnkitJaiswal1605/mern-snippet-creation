import React, { useState, useEffect } from "react";
import Axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";

function Home() {
    const [snippets, setSnippets] = useState([]);
    const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
    const [editSnippetData, setEditSnippetData] = useState(null);

    useEffect(() => {
        getSnippets();
    }, []);

    async function getSnippets() {
        const snippetsRes = await Axios.get("http://localhost:3000/snippet/");
        setSnippets(snippetsRes.data);
    }

    function editSnippet(snippetData) {
        setEditSnippetData(snippetData);
        setSnippetEditorOpen(true);
    }

    function renderSnippets() {
        let sortedSnippets = [...snippets];
        sortedSnippets = sortedSnippets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return sortedSnippets.map((snippet, i) => {
            return <Snippet key={i} snippet={snippet} getSnippets={getSnippets} editSnippet={editSnippet} />
        })
    }

    return <div className="home">
        {!snippetEditorOpen && <button className="btn-editor-toggle" onClick={() => setSnippetEditorOpen(true)}>
            Add Snippet
        </button>}
        {snippetEditorOpen && (
            <SnippetEditor 
                setSnippetEditorOpen={setSnippetEditorOpen}
                getSnippets={getSnippets}
                editSnippetData={editSnippetData}
                setEditSnippetData={setEditSnippetData}
            />
        )}
        {renderSnippets()}
    </div>;
}

export default Home;