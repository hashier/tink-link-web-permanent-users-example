import React from 'react';

// Inspired by http://jsfiddle.net/KJQ9K/554/
const syntaxHighlight = (json: string) => {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function (match: any) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
};

type PrettyCodeProps = {
  code: string;
  highlightSyntax?: boolean;
  className?: string;
};

export const PrettyCode = ({ code, className, highlightSyntax = true }: PrettyCodeProps) => {
  return (
    <div className={`code-wrapper ${className || ''}`}>
      <pre
        className="code"
        dangerouslySetInnerHTML={{
          __html: highlightSyntax ? syntaxHighlight(code) : code,
        }}
      ></pre>
    </div>
  );
};
