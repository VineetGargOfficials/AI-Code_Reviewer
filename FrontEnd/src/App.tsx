import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(`// Welcome to AI Code Reviewer! 🚀
function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(`# 👋 Welcome to AI Code Reviewer!

## How to get started:
1. **Write or paste your code** in the editor on the left
2. **Click the "✨ Review Code" button** to get AI-powered insights
3. **Get detailed feedback** with suggestions for improvement

*Your AI coding companion is ready to help you write better code!*`)

  const [isLoading, setIsLoading] = useState(false)
  const [isReviewComplete, setIsReviewComplete] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) return;
    
    setIsLoading(true)
    setIsReviewComplete(false)
    setReview("# 🔍 Analyzing your code...\n\nPlease wait while our AI examines your code for improvements, best practices, and potential optimizations.")
    
    try {
      const response = await axios.post('http://localhost:5000/ai/get-review', { code })
      setReview(response.data)
      setIsReviewComplete(true)
    } catch (error) {
      setReview("# ❌ Oops! Something went wrong\n\nPlease make sure the backend server is running and try again.")
    } finally {
      setIsLoading(false)
    }
  }
return (
    <div className="app">
      <div className="background-gradient"></div>
      <div className="background-pattern"></div>
      
      <header className="header">
        <div className="logo">
          <div className="logo-icon">🤖</div>
          <h1>AI Code Reviewer</h1>
        </div>
        <div className="header-actions">
          <div className="status-indicator">
            <div className={`status-dot ${isLoading ? 'loading' : 'ready'}`}></div>
            <span>{isLoading ? 'Analyzing...' : 'Ready to Use'}</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="panel-icon">📝</span>
              <h2>Code Editor</h2>
            </div>
            <div className="editor-controls">
              <button className="control-btn" onClick={() => setCode('')}>
                🗑️ Clear
              </button>
            </div>
          </div>
          
          <div className="editor-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={24}
              className="code-editor"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                outline: 'none'
              }}
              placeholder="// Start typing your code here..."
            />
          </div>

          <div className="review-button-container">
            <button 
              onClick={reviewCode} 
              disabled={isLoading || !code.trim()}
              className={`review-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  ✨ Review Code
                </>
              )}
            </button>
          </div>
        </div>

        <div className="review-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="panel-icon">🔍</span>
              <h2>AI Review</h2>
            </div>
            <div className="review-status">
              {isReviewComplete && (
                <span className="completion-badge">
                  ✅ Review Complete
                </span>
              )}
            </div>
          </div>
          
          <div className="review-container">
            <div className="review-content">
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({children}) => <h1 className="md-h1">{children}</h1>,
                  h2: ({children}) => <h2 className="md-h2">{children}</h2>,
                  h3: ({children}) => <h3 className="md-h3">{children}</h3>,
                  code: ({children, className}) => {
                    const isInline = !className
                    return isInline ? 
                      <code className="inline-code">{children}</code> :
                      <code className={className}>{children}</code>
                  },
                  pre: ({children}) => <pre className="code-block">{children}</pre>,
                  ul: ({children}) => <ul className="md-list">{children}</ul>,
                  li: ({children}) => <li className="md-list-item">{children}</li>,
                  p: ({children}) => <p className="md-paragraph">{children}</p>
                }}
              >
                {review}
              </Markdown>
            </div>
          </div>
        </div>
      </main>

    </div>
  )

}



export default App