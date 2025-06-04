import React from 'react';
import * as Babel from '@babel/standalone';

interface DynamicComponentProps {
  componentCode: string;
  componentName: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentCode, componentName }) => {
  const [RenderedComponent, setRenderedComponent] = React.useState<React.ComponentType | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const transformAndExecute = async () => {
      try {
        setLoading(true);
        setError(null);

        // Clean the component code - remove import statements and TypeScript interfaces
        let cleanCode = componentCode;
        
        // Remove import statements
        cleanCode = cleanCode.replace(/^import.*?from.*?;?\s*$/gm, '');
        
        // Remove export interface/type statements
        cleanCode = cleanCode.replace(/^export\s+(interface|type).*?^}/gms, '');
        
        // Remove standalone interface/type statements
        cleanCode = cleanCode.replace(/^(interface|type)\s+.*?^}/gms, '');
        
        // Remove export default statements
        cleanCode = cleanCode.replace(/^export\s+default\s+\w+;?\s*$/gm, '');
        
        // Remove any remaining export statements
        cleanCode = cleanCode.replace(/^export\s+/gm, '');
        
        // Clean up extra whitespace
        cleanCode = cleanCode.trim();

        // Transform JSX to JavaScript using Babel
        const transformed = Babel.transform(cleanCode, {
          filename: 'component.tsx',
          presets: [
            ['react', { runtime: 'classic' }],
            ['typescript', { allowDeclareFields: true }]
          ],
          plugins: ['transform-typescript']
        });

        if (!transformed.code) {
          throw new Error('Failed to transform component code');
        }

        // Create a function with React and hooks in scope
        const createComponent = new Function(
          'React',
          'useState',
          'useEffect',
          'useCallback',
          'useMemo',
          'useRef',
          'createElement',
          'Fragment',
          `
            ${transformed.code}
            return ${componentName};
          `
        );
        
        const Component = createComponent(
          React,
          React.useState,
          React.useEffect,
          React.useCallback,
          React.useMemo,
          React.useRef,
          React.createElement,
          React.Fragment
        );
        
        setRenderedComponent(() => Component);
        setError(null);
      } catch (err) {
        console.error('Error transforming/executing component:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setRenderedComponent(null);
      } finally {
        setLoading(false);
      }
    };

    transformAndExecute();
  }, [componentCode, componentName]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">Transforming and loading component...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Component Transformation Error</h3>
          <p className="text-red-700 text-sm mb-2">
            Failed to transform or execute the component: {error}
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 rounded-t-lg">
            <h4 className="font-semibold text-gray-800">Generated Component Code:</h4>
          </div>
          <div className="p-4">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-relaxed">
              <code>{componentCode}</code>
            </pre>
          </div>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>💡 How to use:</strong> Copy this code into a .tsx file in your React project. The component uses Tailwind CSS classes and should render perfectly in your development environment.
          </p>
        </div>
      </div>
    );
  }

  if (!RenderedComponent) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">Component ready but no content to render...</p>
      </div>
    );
  }

  try {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Live Component Preview:</h3>
        <div className="border border-gray-100 rounded p-4 bg-gray-50">
          <style>{`
            @layer preview {
              .component-preview-container {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #111827;
                background: white;
                padding: 16px;
                border-radius: 8px;
              }
              
              .component-preview-container * {
                box-sizing: border-box;
              }
              
              /* Essential Tailwind utilities in preview layer */
              .component-preview-container .max-w-2xl { max-width: 42rem; }
              .component-preview-container .mx-auto { margin-left: auto; margin-right: auto; }
              .component-preview-container .p-8 { padding: 2rem; }
              .component-preview-container .p-6 { padding: 1.5rem; }
              .component-preview-container .p-4 { padding: 1rem; }
              .component-preview-container .p-3 { padding: 0.75rem; }
              .component-preview-container .p-2 { padding: 0.5rem; }
              .component-preview-container .mb-8 { margin-bottom: 2rem; }
              .component-preview-container .mb-6 { margin-bottom: 1.5rem; }
              .component-preview-container .mb-4 { margin-bottom: 1rem; }
              .component-preview-container .mb-3 { margin-bottom: 0.75rem; }
              .component-preview-container .mb-2 { margin-bottom: 0.5rem; }
              .component-preview-container .mt-8 { margin-top: 2rem; }
              .component-preview-container .mt-6 { margin-top: 1.5rem; }
              .component-preview-container .mt-4 { margin-top: 1rem; }
              .component-preview-container .mt-3 { margin-top: 0.75rem; }
              .component-preview-container .mt-2 { margin-top: 0.5rem; }
              .component-preview-container .bg-white { background-color: #ffffff; }
              .component-preview-container .bg-gray-50 { background-color: #f9fafb; }
              .component-preview-container .bg-gray-100 { background-color: #f3f4f6; }
              .component-preview-container .bg-gray-200 { background-color: #e5e7eb; }
              .component-preview-container .bg-gray-300 { background-color: #d1d5db; }
              .component-preview-container .bg-gray-900 { background-color: #111827; }
              .component-preview-container .bg-slate-900 { background-color: #0f172a; }
              .component-preview-container .bg-slate-700 { background-color: #334155; }
              .component-preview-container .bg-slate-600 { background-color: #475569; }
              .component-preview-container .bg-amber-400 { background-color: #fbbf24; }
              .component-preview-container .bg-yellow-400 { background-color: #facc15; }
              .component-preview-container .bg-teal-700 { background-color: #0f766e; }
              .component-preview-container .bg-blue-500 { background-color: #3b82f6; }
              .component-preview-container .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
              .component-preview-container .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
              .component-preview-container .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
              .component-preview-container .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
              .component-preview-container .font-bold { font-weight: 700; }
              .component-preview-container .font-semibold { font-weight: 600; }
              .component-preview-container .font-medium { font-weight: 500; }
              .component-preview-container .text-slate-900 { color: #0f172a; }
              .component-preview-container .text-slate-700 { color: #334155; }
              .component-preview-container .text-slate-600 { color: #475569; }
              .component-preview-container .text-white { color: #ffffff; }
              .component-preview-container .text-amber-400 { color: #fbbf24; }
              .component-preview-container .text-teal-700 { color: #0f766e; }
              .component-preview-container .text-blue-500 { color: #3b82f6; }
              .component-preview-container .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
              .component-preview-container .rounded-lg { border-radius: 0.5rem; }
              .component-preview-container .rounded { border-radius: 0.25rem; }
              .component-preview-container .border { border-width: 1px; }
              .component-preview-container .border-b { border-bottom-width: 1px; }
              .component-preview-container .border-gray-200 { border-color: #e5e7eb; }
              .component-preview-container .border-slate-200 { border-color: #e2e8f0; }
              .component-preview-container .flex { display: flex; }
              .component-preview-container .items-center { align-items: center; }
              .component-preview-container .justify-center { justify-content: center; }
              .component-preview-container .justify-between { justify-content: space-between; }
              .component-preview-container .gap-6 { gap: 1.5rem; }
              .component-preview-container .gap-4 { gap: 1rem; }
              .component-preview-container .gap-2 { gap: 0.5rem; }
              .component-preview-container .space-y-1 > * + * { margin-top: 0.25rem; }
              .component-preview-container .space-y-2 > * + * { margin-top: 0.5rem; }
              .component-preview-container .space-y-4 > * + * { margin-top: 1rem; }
              .component-preview-container .grid { display: grid; }
              .component-preview-container .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .component-preview-container .tracking-tight { letter-spacing: -0.025em; }
              .component-preview-container .tracking-wider { letter-spacing: 0.05em; }
              .component-preview-container .uppercase { text-transform: uppercase; }
              .component-preview-container .w-16 { width: 4rem; }
              .component-preview-container .h-16 { height: 4rem; }
              .component-preview-container .w-full { width: 100%; }
              .component-preview-container .h-full { height: 100%; }
            }
          `}</style>
          <div className="component-preview-container">
            <RenderedComponent />
          </div>
        </div>
      </div>
    );
  } catch (renderError) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-yellow-800 font-semibold mb-2">Render Error</h3>
          <p className="text-yellow-600 text-sm">
            Component transformed successfully but failed to render: {renderError instanceof Error ? renderError.message : 'Unknown error'}
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 rounded-t-lg">
            <h4 className="font-semibold text-gray-800">Generated Component Code:</h4>
          </div>
          <div className="p-4">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-relaxed">
              <code>{componentCode}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
};

export default DynamicComponent;