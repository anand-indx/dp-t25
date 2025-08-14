import React, { useState } from 'react';
import { BookOpen, Github, Database, CheckCircle, ArrowRight, Microscope, Brain, Cpu, Download, ExternalLink } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  level: string;
  description: string;
  tasks: string[];
  datasets: string[];
  autoCheck: string;
  duration: string;
}

const tutorials: Tutorial[] = [
  {
    id: 'image-processing',
    title: 'Image Processing Fundamentals',
    level: 'Beginner',
    description: 'Master the basics of digital pathology image manipulation, visualization, and preprocessing techniques.',
    tasks: [
      'Load and visualize histopathology images',
      'Perform image resizing and grayscale conversion',
      'Apply basic augmentation techniques',
      'Implement color normalization'
    ],
    datasets: ['CAMELYON16', 'GlaS Challenge', 'Kaggle Samples'],
    autoCheck: 'assert img_array.shape == (256, 256, 3)',
    duration: '2-3 hours'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Classification',
    level: 'Intermediate',
    description: 'Build traditional ML classifiers for tissue classification using feature extraction and classical algorithms.',
    tasks: [
      'Extract color histograms and texture features',
      'Train Random Forest and SVM classifiers',
      'Evaluate model performance metrics',
      'Implement cross-validation'
    ],
    datasets: ['PatchCamelyon (PCam)', 'Histopathologic Cancer Detection'],
    autoCheck: 'assert accuracy > 0.80',
    duration: '3-4 hours'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning with CNNs',
    level: 'Advanced',
    description: 'Develop convolutional neural networks for automated cancer detection in digital pathology images.',
    tasks: [
      'Design CNN architecture for pathology',
      'Implement data augmentation pipeline',
      'Train deep learning models',
      'Optimize hyperparameters and evaluate'
    ],
    datasets: ['PCam on Kaggle', 'CAMELYON16 Patches'],
    autoCheck: 'assert val_accuracy > 0.85',
    duration: '4-6 hours'
  }
];

const datasets = [
  {
    name: 'CAMELYON16',
    description: 'Whole-slide images of lymph node sections for metastasis detection',
    url: 'https://camelyon16.grand-challenge.org/Data/',
    type: 'WSI Dataset'
  },
  {
    name: 'PatchCamelyon',
    description: 'Pre-extracted patches from CAMELYON16 for efficient training',
    url: 'https://github.com/basveeling/pcam',
    type: 'Patch Dataset'
  },
  {
    name: 'The Cancer Imaging Archive',
    description: 'Comprehensive collection of medical imaging data',
    url: 'https://www.cancerimagingarchive.net/',
    type: 'Image Repository'
  }
];

function App() {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <Microscope className="w-6 h-6" />;
      case 'Intermediate': return <Brain className="w-6 h-6" />;
      case 'Advanced': return <Cpu className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Digital Pathology Tutorials</h1>
                <p className="text-sm text-slate-600">From Image Processing to Deep Learning</p>
              </div>
            </div>
            <a 
              href="https://github.com" 
              className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Master Digital Pathology with Interactive Jupyter Notebooks
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Progress from basic image processing to advanced deep learning through hands-on tutorials 
            designed specifically for digital pathology applications.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-700">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Auto-checked exercises</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Database className="w-5 h-5 text-blue-600" />
              <span>Real pathology datasets</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Github className="w-5 h-5 text-purple-600" />
              <span>GitHub integration</span>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Learning Path</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <div 
                key={tutorial.id}
                className={`bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                  selectedTutorial === tutorial.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedTutorial(selectedTutorial === tutorial.id ? null : tutorial.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                      {getLevelIcon(tutorial.level)}
                    </div>
                    <span className="text-2xl font-bold text-slate-400">0{index + 1}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-2">{tutorial.title}</h4>
                <p className="text-slate-600 mb-4">{tutorial.description}</p>
                
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{tutorial.duration}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {selectedTutorial === tutorial.id && (
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-2">Learning Tasks:</h5>
                      <ul className="space-y-1">
                        {tutorial.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-2">Datasets:</h5>
                      <div className="flex flex-wrap gap-2">
                        {tutorial.datasets.map((dataset, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                            {dataset}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-2">Auto-Check Example:</h5>
                      <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">
                        {tutorial.autoCheck}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Datasets Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Featured Datasets</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900">{dataset.name}</h4>
                  <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-md text-xs">
                    {dataset.type}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{dataset.description}</p>
                <a 
                  href={dataset.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Access Dataset</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl text-white p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Download the complete tutorial series and begin your journey into digital pathology analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              <Download className="w-5 h-5" />
              <span>Download Notebooks</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
              <Github className="w-5 h-5" />
              <span>Fork on GitHub</span>
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Auto-Validation</h4>
            <p className="text-slate-600">Built-in test cells verify your code automatically</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Real Data</h4>
            <p className="text-slate-600">Work with actual pathology datasets and images</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Version Control</h4>
            <p className="text-slate-600">Learn to manage your projects with Git and GitHub</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Progressive Learning</h4>
            <p className="text-slate-600">Structured path from beginner to advanced concepts</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Microscope className="w-8 h-8" />
            <h4 className="text-xl font-bold">Digital Pathology Tutorials</h4>
          </div>
          <p className="text-slate-400 mb-6">
            Empowering the next generation of digital pathology researchers and practitioners
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Community</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;