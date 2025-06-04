import React, { useState, useEffect } from "react";
import { processInvoice, InvoiceApiResponse } from "@/utils/api";
import FileDropzone from "@/components/FileDropzone";
import LoadingIndicator from "@/components/LoadingIndicator";
import ThemeToggle from "@/components/ThemeToggle";
import DynamicComponent from "@/components/DynamicComponent";
import { FileImage, Download, ArrowRight, Code, FileText } from "lucide-react";

// Painted scenery background with stars and sun/moon (reused from Index)
const PaintedBackground: React.FC = () => {
  // Create an array of random star positions
  const stars = React.useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 70}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 0.3 + 0.1,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ghibli-sky via-ghibli-sky to-ghibli-water dark:from-[#0F2B4C] dark:via-[#1a3b64] dark:to-[#184272] transition-colors duration-700"></div>

      {/* Stars (only visible in dark mode) */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white opacity-0 dark:opacity-80 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            boxShadow: "0 0 10px 0 rgba(255, 255, 255, 0.7)",
          }}
        />
      ))}

      {/* Sun in corner with enhanced glow effect (day mode) */}
      <div className="absolute top-[8%] right-[8%] dark:opacity-0 opacity-100 transition-opacity duration-700">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-yellow-100 blur-2xl opacity-50 scale-[2.5]"></div>
          <div className="absolute inset-0 rounded-full bg-yellow-200 blur-xl opacity-40 scale-[2]"></div>
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 via-yellow-300 to-ghibli-sun rounded-full shadow-lg"></div>
            {/* Enhanced sun rays */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={`ray-${i}`}
                className="absolute bg-gradient-to-t from-ghibli-sun to-yellow-200"
                style={{
                  width: i % 2 === 0 ? "0.5rem" : "0.3rem",
                  height: i % 2 === 0 ? "3.5rem" : "2.5rem",
                  left: "50%",
                  top: "50%",
                  transformOrigin: "bottom center",
                  transform: `translate(-50%, -100%) rotate(${i * 15}deg)`,
                  borderRadius: "1rem",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Moon in corner (night mode) */}
      <div className="absolute top-[8%] right-[8%] dark:opacity-100 opacity-0 transition-opacity duration-700">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gray-300 blur-xl opacity-30 scale-[2]"></div>
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-lg"></div>
            {/* Moon craters */}
            <div className="absolute top-4 left-5 w-4 h-4 bg-gray-400 rounded-full opacity-30"></div>
            <div className="absolute top-10 right-5 w-3 h-3 bg-gray-400 rounded-full opacity-30"></div>
            <div className="absolute bottom-5 left-8 w-3 h-3 bg-gray-400 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Subtle hills */}
      <div className="absolute bottom-0 w-full">
        <div
          className="absolute bottom-0 w-full h-48 bg-ghibli-hills dark:bg-[#2A4A3D] opacity-80"
          style={{
            clipPath:
              "polygon(0% 100%, 10% 80%, 25% 90%, 40% 70%, 60% 85%, 75% 65%, 90% 80%, 100% 60%, 100% 100%)",
          }}
        ></div>

        <div
          className="absolute bottom-0 w-full h-24 bg-ghibli-forest dark:bg-[#1F3626] opacity-90"
          style={{
            clipPath:
              "polygon(0% 100%, 0% 40%, 20% 50%, 40% 30%, 60% 50%, 80% 35%, 100% 45%, 100% 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};

// Animated conversion progress steps for invoice processing
const ConversionSteps: React.FC<{ currentStep: number }> = ({
  currentStep,
}) => {
  const steps = [
    { icon: FileImage, label: "Reading Invoice" },
    { icon: FileText, label: "Extracting Data" },
    { icon: Code, label: "Generating Component" },
  ];

  return (
    <div className="flex justify-center space-x-6 mb-6">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index <= currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full mb-2 
              ${isActive ? "bg-ghibli-accent" : "bg-ghibli-cream/20"} 
              ${isCompleted ? "ring-2 ring-ghibli-accent" : ""}`}
            >
              <StepIcon
                className={`h-6 w-6 
                ${isActive ? "text-white" : "text-ghibli-cream/50"}`}
              />

              {isCompleted && (
                <div className="absolute -right-1 -top-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <span
              className={`text-sm font-medium 
              ${isActive ? "text-ghibli-cream" : "text-ghibli-cream/50"}`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className="hidden sm:block absolute transform translate-x-20">
                <div
                  className={`h-0.5 w-12 mt-6 
                  ${
                    index < currentStep
                      ? "bg-ghibli-accent"
                      : "bg-ghibli-cream/20"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Component to display the generated React component code
const ComponentDisplay: React.FC<{ componentData: InvoiceApiResponse["component"] }> = ({
  componentData,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(componentData.code);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-ghibli-display text-ghibli-forest dark:text-ghibli-cream">
          Generated Component: {componentData.name}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            📋 Copy Code
          </button>
        </div>
      </div>

      {/* Live Preview of the Component */}
      {showPreview && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-ghibli-forest dark:text-ghibli-cream">Live Preview:</h4>
          <DynamicComponent 
            componentCode={componentData.code} 
            componentName={componentData.name}
          />
        </div>
      )}

      {/* Code View */}
      {showCode && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-ghibli-forest dark:text-ghibli-cream">Component Code:</h4>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              <code>{componentData.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Component Metadata:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><strong>Source:</strong> {componentData.metadata.source}</div>
          <div><strong>Generated:</strong> {new Date(componentData.metadata.generatedAt).toLocaleString()}</div>
          <div><strong>Generator:</strong> {componentData.metadata.generator}</div>
          <div><strong>Image Type:</strong> {componentData.metadata.imageType}</div>
        </div>
      </div>
    </div>
  );
};

// Main component
const Invoice: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<InvoiceApiResponse | null>(null);
  const [conversionStep, setConversionStep] = useState<number>(-1);

  useEffect(() => {
    // Simulate conversion progress when processing
    if (isProcessing) {
      const timers = [
        setTimeout(() => setConversionStep(0), 500),
        setTimeout(() => setConversionStep(1), 1200),
        setTimeout(() => setConversionStep(2), 1800),
      ];

      return () => timers.forEach((timer) => clearTimeout(timer));
    } else {
      setConversionStep(-1);
    }
  }, [isProcessing]);

  const handleFileAccepted = async (file: File) => {
    setFile(file);
    setIsProcessing(true);

    try {
      // Process the invoice image
      const response = await processInvoice(file);
      setApiResponse(response);
    } catch (error) {
      console.error("Error processing invoice:", error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate that it's an image file
      if (selectedFile.type.startsWith('image/')) {
        handleFileAccepted(selectedFile);
      } else {
        alert('Please select an image file (PNG, JPG, etc.)');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-ghibli-handwritten dark:text-white">
      {/* Painted background */}
      <PaintedBackground />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Center content vertically and horizontally */}
        <div className="container mx-auto px-4 py-6 flex-1 flex items-center justify-center">
          <main className="w-full max-w-4xl">
            {!apiResponse ? (
              <div className="text-center">
                {/* Ghibli-inspired title */}
                <div className="text-center mb-4">
                  <h1 className="ghibli-title">Invoice to React</h1>
                  <p className="ghibli-subtitle">
                    Transform Invoices into Components
                  </p>
                </div>

                <p className="text-lg text-ghibli-cream dark:text-gray-200 mb-8 mx-auto max-w-md">
                  Upload an invoice image to generate React components with
                  Anthropic Vision and Mastra AI
                </p>

                {isProcessing ? (
                  <div className="my-10">
                    <ConversionSteps currentStep={conversionStep} />
                    <LoadingIndicator message="Your invoice is being transformed into a React component..." />
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-6">
                    {/* Centered dropzone with cleaner styling */}
                    <div className="w-full transform hover:scale-[1.02] transition-transform">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-indigo-900/30 p-8">
                        <FileDropzone
                          onFileAccepted={handleFileAccepted}
                          isProcessing={isProcessing}
                          acceptedFileTypes="image/*"
                          fileTypeLabel="image files"
                        />
                      </div>
                    </div>

                    <label
                      htmlFor="image-upload"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all shadow-lg cursor-pointer"
                    >
                      <FileImage className="h-5 w-5 mr-2" />
                      <span>Select Invoice Image</span>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Component result view */}
                <div className="max-w-6xl mx-auto my-8">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/30 overflow-hidden">
                    <h2 className="text-3xl text-ghibli-forest dark:text-ghibli-cream font-ghibli-display text-center mb-6">
                      Your invoice has been transformed into a React component
                    </h2>

                    <ComponentDisplay componentData={apiResponse.component} />
                  </div>
                </div>

                {/* Convert another button */}
                <div className="text-center my-8">
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                    onClick={() => {
                      setFile(null);
                      setApiResponse(null);
                    }}
                  >
                    Convert Another Invoice
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Simplified footer */}
        <footer className="py-4 text-center text-ghibli-cream/80 dark:text-white/70 text-sm relative z-20">
          <div className="container mx-auto px-4">
            <p className="flex items-center justify-center">
              <Code className="h-4 w-4 mr-2" />
              Powered by Anthropic Vision and Mastra AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Invoice;