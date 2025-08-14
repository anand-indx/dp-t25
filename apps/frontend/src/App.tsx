import React, { useState, useEffect } from 'react';
import { BookOpen, Github, Database, CheckCircle, ArrowRight, Microscope, Brain, ExternalLink, Play, Lock, Trophy, BarChart3, Home, Target, Clock } from 'lucide-react';

// Get JupyterLab URL from environment - for GitHub Pages, we'll show repository links instead
const JUPYTER_BASE_URL = import.meta.env.VITE_JUPYTER_URL || 'http://localhost:8888';
const IS_GITHUB_PAGES = window.location.hostname === 'anand-indx.github.io' || import.meta.env.PROD;

interface Task {
  name: string;
  notebookUrl: string;
  completed?: boolean;
  estimatedTime: string;
}

interface Dataset {
  name: string;
  description: string;
  url: string;
}

interface Tutorial {
  id: string;
  title: string;
  level: string;
  description: string;
  tasks: Task[];
  datasets: Dataset[];
  duration: string;
  prerequisites: string[];
  locked?: boolean;
  completed?: boolean;
  progress?: number;
}

// User progress tracking
interface UserProgress {
  completedTutorials: string[];
  completedTasks: { [key: string]: string[] };
  currentTutorial: string | null;
  totalProgress: number;
}

const tutorials: Tutorial[] = [
  {
    id: 'image-processing',
    title: 'Image Processing Fundamentals',
    level: 'Beginner',
    description: 'Master the basics of digital pathology image manipulation, visualization, and preprocessing techniques.',
    tasks: [
  { name: 'Load and visualize histopathology images', notebookUrl: 'image-processing-tutorials/notebooks/01_load_and_visualize.ipynb', estimatedTime: '30 min' },
  { name: 'Perform image resizing and grayscale conversion', notebookUrl: 'image-processing-tutorials/notebooks/02_resizing_and_grayscale.ipynb', estimatedTime: '25 min' },
  { name: 'Apply basic augmentation techniques', notebookUrl: 'image-processing-tutorials/notebooks/03_basic_augmentation.ipynb', estimatedTime: '35 min' },
  { name: 'Implement color normalization', notebookUrl: 'image-processing-tutorials/notebooks/04_color_normalization.ipynb', estimatedTime: '40 min' },
  { name: '🎯 Run Autograding Tests (Check Your Progress)', notebookUrl: 'image-processing-tutorials/notebooks/test_autograding.ipynb', estimatedTime: '20 min' }
    ],
    datasets: [
      { 
        name: 'CAMELYON16', 
        description: 'Lymph node metastases detection dataset with H&E stained whole-slide images',
        url: 'https://camelyon16.grand-challenge.org/Data/' 
      },
      { 
        name: 'GlaS Challenge', 
        description: 'Gland segmentation dataset from colorectal cancer histology images',
        url: 'https://warwick.ac.uk/fac/cross_fac/tia/data/glascontest' 
      },
      { 
        name: 'Kaggle Samples', 
        description: 'Sample histopathology images for practice and learning',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/breast-histopathology-images' 
      }
    ],
    duration: '2-3 hours',
    prerequisites: []
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization & Analysis',
    level: 'Beginner',
    description: 'Learn essential data analysis and visualization techniques including pandas, matplotlib, heatmaps, and UMAP.',
    tasks: [
  { name: 'Pandas DataFrames for pathology data', notebookUrl: 'visualization-tutorials/notebooks/01_pandas_pathology.ipynb', estimatedTime: '40 min' },
  { name: 'Statistical analysis and plotting', notebookUrl: 'visualization-tutorials/notebooks/02_statistical_plots.ipynb', estimatedTime: '45 min' },
  { name: 'Heatmaps and correlation analysis', notebookUrl: 'visualization-tutorials/notebooks/03_heatmaps_correlation.ipynb', estimatedTime: '35 min' },
  { name: 'UMAP and dimensionality reduction', notebookUrl: 'visualization-tutorials/notebooks/04_umap_dimensionality.ipynb', estimatedTime: '50 min' },
  { name: '🎯 Visualization Skills Assessment', notebookUrl: 'visualization-tutorials/notebooks/test_visualization.ipynb', estimatedTime: '30 min' }
    ],
    datasets: [
      { 
        name: 'TCGA Clinical Data', 
        description: 'Clinical and genomic data from The Cancer Genome Atlas for pathology visualization',
        url: 'https://portal.gdc.cancer.gov/projects/TCGA-BRCA' 
      },
      { 
        name: 'PathML Features', 
        description: 'Extracted morphological features from histopathology images using PathML',
        url: 'https://github.com/Dana-Farber-AIOS/pathml' 
      },
      { 
        name: 'Spatial Coordinates', 
        description: 'Spatial coordinate data for tissue region analysis and visualization',
        url: 'https://www.nature.com/articles/s41592-019-0650-1' 
      }
    ],
    duration: '3-4 hours',
    prerequisites: ['image-processing']
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Classification',
    level: 'Intermediate',
    description: 'Build traditional ML classifiers for tissue classification using feature extraction and classical algorithms.',
    tasks: [
  { name: 'Extract color histograms and texture features', notebookUrl: 'ml-tutorials/notebooks/01_feature_extraction.ipynb', estimatedTime: '60 min' },
  { name: 'Train Random Forest and SVM classifiers', notebookUrl: 'ml-tutorials/notebooks/02_classical_ml.ipynb', estimatedTime: '50 min' },
  { name: 'Evaluate model performance metrics', notebookUrl: 'ml-tutorials/notebooks/03_model_evaluation.ipynb', estimatedTime: '45 min' },
  { name: 'Implement cross-validation', notebookUrl: 'ml-tutorials/notebooks/04_cross_validation.ipynb', estimatedTime: '40 min' },
  { name: '🎯 ML Classification Challenge', notebookUrl: 'ml-tutorials/notebooks/test_ml_skills.ipynb', estimatedTime: '45 min' }
    ],
    datasets: [
      { 
        name: 'PatchCamelyon (PCam)', 
        description: 'Binary classification dataset of histopathologic scans with metastatic tissue',
        url: 'https://github.com/basveeling/pcam' 
      },
      { 
        name: 'Histopathologic Cancer Detection', 
        description: 'Kaggle competition dataset for identifying metastatic cancer in small patches',
        url: 'https://www.kaggle.com/c/histopathologic-cancer-detection/data' 
      }
    ],
    duration: '4-5 hours',
    prerequisites: ['image-processing', 'data-visualization']
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning with CNNs',
    level: 'Intermediate',
    description: 'Develop convolutional neural networks for automated cancer detection in digital pathology images.',
    tasks: [
  { name: 'Design CNN architecture for pathology', notebookUrl: 'deep-learning-tutorials/notebooks/01_cnn_architecture.ipynb', estimatedTime: '70 min' },
  { name: 'Implement data augmentation pipeline', notebookUrl: 'deep-learning-tutorials/notebooks/02_data_augmentation.ipynb', estimatedTime: '45 min' },
  { name: 'Train deep learning models', notebookUrl: 'deep-learning-tutorials/notebooks/03_model_training.ipynb', estimatedTime: '90 min' },
  { name: 'Optimize hyperparameters and evaluate', notebookUrl: 'deep-learning-tutorials/notebooks/04_hyperparameter_optimization.ipynb', estimatedTime: '75 min' },
  { name: '🎯 Deep Learning Mastery Test', notebookUrl: 'deep-learning-tutorials/notebooks/test_deep_learning.ipynb', estimatedTime: '60 min' }
    ],
    datasets: [
      { 
        name: 'PCam on Kaggle', 
        description: 'PatchCamelyon dataset hosted on Kaggle for easy access and competitions',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/patch-camelyon-patchcamelyon' 
      },
      { 
        name: 'CAMELYON16 Patches', 
        description: 'Pre-extracted patches from CAMELYON16 whole-slide images for deep learning',
        url: 'https://camelyon16.grand-challenge.org/Data/' 
      }
    ],
    duration: '5-6 hours',
    prerequisites: ['machine-learning']
  },
  {
    id: 'whole-slide-analysis',
    title: 'Whole Slide Image Analysis',
    level: 'Advanced',
    description: 'Master large-scale histopathology image processing using tiling, stitching, and multi-resolution analysis techniques.',
    tasks: [
  { name: 'QuPath integration and scripting', notebookUrl: 'wsi-tutorials/notebooks/01_qupath_integration.ipynb', estimatedTime: '80 min' },
  { name: 'Multi-scale tissue segmentation', notebookUrl: 'wsi-tutorials/notebooks/02_tissue_segmentation.ipynb', estimatedTime: '90 min' },
  { name: 'Annotation tools and ground truth creation', notebookUrl: 'wsi-tutorials/notebooks/03_annotation_tools.ipynb', estimatedTime: '70 min' },
  { name: 'Spatial analysis and morphometry', notebookUrl: 'wsi-tutorials/notebooks/04_spatial_morphometry.ipynb', estimatedTime: '85 min' },
  { name: '🎯 WSI Analysis Expertise Test', notebookUrl: 'wsi-tutorials/notebooks/test_wsi_analysis.ipynb', estimatedTime: '75 min' }
    ],
    datasets: [
      { 
        name: 'TCGA-BRCA WSI', 
        description: 'Whole-slide images from breast cancer samples in The Cancer Genome Atlas',
        url: 'https://portal.gdc.cancer.gov/projects/TCGA-BRCA' 
      },
      { 
        name: 'CAMELYON16 WSI', 
        description: 'Complete whole-slide images from lymph node sections for large-scale analysis',
        url: 'https://camelyon16.grand-challenge.org/Data/' 
      },
      { 
        name: 'GlaS Challenge', 
        description: 'Gland segmentation challenge dataset with whole-slide annotations',
        url: 'https://warwick.ac.uk/fac/cross_fac/tia/data/glascontest' 
      }
    ],
    duration: '6-7 hours',
    prerequisites: ['deep-learning']
  },
  {
    id: 'computational-pathology',
    title: 'Computational Pathology Pipeline',
    level: 'Advanced',
    description: 'Build end-to-end computational pathology workflows including preprocessing, analysis, and clinical integration.',
    tasks: [
      { name: 'TIAToolbox and HistoLab integration', notebookUrl: 'comp-pathology-tutorials/notebooks/01_toolbox_integration.ipynb', estimatedTime: '75 min' },
      { name: 'Stain normalization and color deconvolution', notebookUrl: 'comp-pathology-tutorials/notebooks/02_stain_normalization.ipynb', estimatedTime: '60 min' },
      { name: 'Cell detection and nuclei segmentation', notebookUrl: 'comp-pathology-tutorials/notebooks/03_cell_detection.ipynb', estimatedTime: '95 min' },
      { name: 'Biomarker quantification pipelines', notebookUrl: 'comp-pathology-tutorials/notebooks/04_biomarker_quantification.ipynb', estimatedTime: '80 min' },
      { name: '🎯 Computational Pathology Mastery', notebookUrl: 'comp-pathology-tutorials/notebooks/test_comp_pathology.ipynb', estimatedTime: '70 min' }
    ],
    datasets: [
      { 
        name: 'CoNSeP', 
        description: 'Colorectal Nuclear Segmentation and Phenotypes dataset with nuclear boundaries',
        url: 'https://warwick.ac.uk/fac/cross_fac/tia/data/hovernet' 
      },
      { 
        name: 'MoNuSeg', 
        description: 'Multi-organ nuclei segmentation challenge dataset for cell detection',
        url: 'https://monuseg.grand-challenge.org/Data/' 
      },
      { 
        name: 'Kumar Dataset', 
        description: 'Multi-organ nuclear segmentation dataset with pixel-level annotations',
        url: 'https://nucleisegmentationbenchmark.weebly.com/' 
      }
    ],
    duration: '6-8 hours',
    prerequisites: ['whole-slide-analysis']
  },
  {
    id: 'foundation-models',
    title: 'Foundation Models in Pathology',
    level: 'Expert',
    description: 'Explore state-of-the-art foundation models like UNI, CONCH, and CLAM for pathology-specific tasks.',
    tasks: [
      { name: 'Pre-trained pathology encoders (UNI, CONCH)', notebookUrl: 'foundation-models-tutorials/notebooks/01_pretrained_encoders.ipynb', estimatedTime: '90 min' },
      { name: 'Multiple Instance Learning (MIL) frameworks', notebookUrl: 'foundation-models-tutorials/notebooks/02_mil_frameworks.ipynb', estimatedTime: '120 min' },
      { name: 'Self-supervised learning techniques', notebookUrl: 'foundation-models-tutorials/notebooks/03_self_supervised.ipynb', estimatedTime: '100 min' },
      { name: 'Vision-language models for pathology', notebookUrl: 'foundation-models-tutorials/notebooks/04_vision_language_models.ipynb', estimatedTime: '110 min' },
      { name: '🎯 Foundation Models Excellence Test', notebookUrl: 'foundation-models-tutorials/notebooks/test_foundation_models.ipynb', estimatedTime: '80 min' }
    ],
    datasets: [
      { 
        name: 'PathLLM', 
        description: 'Large language model trained on pathology reports and medical literature',
        url: 'https://github.com/kbressem/pathLLM' 
      },
      { 
        name: 'OpenPath', 
        description: 'Open-source foundation model for computational pathology tasks',
        url: 'https://github.com/openpath/OpenPath' 
      },
      { 
        name: 'PubMed Pathology', 
        description: 'Curated pathology literature and case studies from PubMed database',
        url: 'https://pubmed.ncbi.nlm.nih.gov/' 
      }
    ],
    duration: '8-10 hours',
    prerequisites: ['computational-pathology']
  },
  {
    id: 'spatial-analysis',
    title: 'Spatial Transcriptomics & Pathology',
    level: 'Expert',
    description: 'Integrate spatial transcriptomics data with histopathology images for multi-modal analysis.',
    tasks: [
      { name: 'Spatial transcriptomics data processing', notebookUrl: 'spatial-tutorials/notebooks/01_spatial_data_processing.ipynb', estimatedTime: '85 min' },
      { name: 'Image-omics data fusion techniques', notebookUrl: 'spatial-tutorials/notebooks/02_image_omics_fusion.ipynb', estimatedTime: '95 min' },
      { name: 'Spatial clustering and neighborhood analysis', notebookUrl: 'spatial-tutorials/notebooks/03_spatial_clustering.ipynb', estimatedTime: '100 min' },
      { name: 'Survival analysis with spatial features', notebookUrl: 'spatial-tutorials/notebooks/04_survival_analysis.ipynb', estimatedTime: '110 min' },
      { name: '🎯 Spatial Multi-omics Mastery', notebookUrl: 'spatial-tutorials/notebooks/test_spatial_analysis.ipynb', estimatedTime: '90 min' }
    ],
    datasets: [
      { 
        name: '10x Visium', 
        description: 'Spatial gene expression data from 10x Genomics Visium platform',
        url: 'https://www.10xgenomics.com/resources/datasets' 
      },
      { 
        name: 'MERFISH', 
        description: 'Multiplexed error-robust fluorescence in situ hybridization spatial data',
        url: 'https://datadryad.org/stash/dataset/doi:10.5061/dryad.8t8s248' 
      },
      { 
        name: 'Spatial TCGA', 
        description: 'Spatially resolved data from TCGA samples for tissue architecture analysis',
        url: 'https://portal.gdc.cancer.gov/projects/TCGA-BRCA' 
      }
    ],
    duration: '8-10 hours',
    prerequisites: ['foundation-models']
  }
];

const learningResources = [
  {
    category: 'Getting Started',
    title: 'Essential Tools & Python Basics',
    description: 'Everything you need to begin your digital pathology journey',
    icon: '🚀',
    difficulty: 'Beginner',
    items: [
      {
        name: 'Python for Everybody (P4E)',
        description: 'Free complete Python course by Dr. Chuck from University of Michigan',
        action: 'Start Free Course',
        url: 'https://www.py4e.com/',
        type: 'course',
        duration: '10 hours',
        provider: 'University of Michigan'
      },
      {
        name: 'Interactive Python Tutorial',
        description: 'Learn Python basics with hands-on coding exercises',
        action: 'Try Interactive Lessons',
        url: 'https://www.learnpython.org/',
        type: 'interactive',
        duration: '4-6 hours',
        provider: 'LearnPython.org'
      },
      {
        name: 'Python Environment Setup',
        description: 'Install Python, Jupyter, and essential libraries for data science',
        action: 'Follow Setup Guide',
        url: 'https://docs.anaconda.com/anaconda/install/',
        type: 'guide',
        provider: 'Anaconda'
      },
      {
        name: 'Jupyter Notebooks Primer',
        description: 'Learn the basics of interactive coding and data exploration',
        action: IS_GITHUB_PAGES ? 'View on GitHub' : 'Try Our Jupyter Lab',
        url: IS_GITHUB_PAGES ? 'https://github.com/anand-indx/dp-t25/tree/main/notebooks' : `${JUPYTER_BASE_URL}/lab`,
        type: 'interactive',
        provider: IS_GITHUB_PAGES ? 'GitHub Repository' : 'Your Environment'
      },
      {
        name: 'Digital Pathology Overview',
        description: 'Understand the field, applications, and career opportunities',
        action: 'Read Introduction',
        url: 'https://www.nature.com/articles/s41746-021-00435-0',
        type: 'reading',
        provider: 'Nature Digital Medicine'
      }
    ]
  },
  {
    category: 'Data Science Foundations',
    title: 'NumPy, Pandas & Visualization',
    description: 'Master the core libraries used throughout our tutorials',
    icon: '📊',
    difficulty: 'Beginner',
    items: [
      {
        name: 'Pandas Fundamentals',
        description: 'Free comprehensive pandas course with real datasets',
        action: 'Start Pandas Course',
        url: 'https://www.kaggle.com/learn/pandas',
        type: 'course',
        duration: '4 hours',
        provider: 'Kaggle Learn',
        usedIn: ['Data Visualization', 'Machine Learning']
      },
      {
        name: 'NumPy Essentials',
        description: 'Learn array operations and mathematical functions',
        action: 'Interactive NumPy Tutorial',
        url: 'https://numpy.org/learn/',
        type: 'tutorial',
        duration: '2-3 hours',
        provider: 'NumPy.org',
        usedIn: ['Image Processing', 'Deep Learning']
      },
      {
        name: 'Matplotlib & Seaborn',
        description: 'Create beautiful visualizations and statistical plots',
        action: 'Learn Plotting',
        url: 'https://www.kaggle.com/learn/data-visualization',
        type: 'course',
        duration: '4 hours',
        provider: 'Kaggle Learn',
        usedIn: ['Data Visualization', 'All Tutorials']
      },
      {
        name: 'Python Data Science Handbook',
        description: 'Free online book covering NumPy, Pandas, Matplotlib, and Scikit-learn',
        action: 'Read Online',
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        type: 'book',
        provider: "Jake VanderPlas",
        usedIn: ['All Courses']
      }
    ]
  },
  {
    category: 'Practice Datasets',
    title: 'Hands-on Learning Data',
    description: 'Real pathology datasets to practice with during tutorials',
    icon: '🔬',
    difficulty: 'All Levels',
    items: [
      {
        name: 'CAMELYON16 Patches',
        description: 'Cancer detection in lymph node patches (96x96 pixels)',
        action: 'Download from Kaggle',
        url: 'https://www.kaggle.com/c/histopathologic-cancer-detection/data',
        type: 'dataset',
        size: '~7GB',
        provider: 'Kaggle Competition',
        usedIn: ['Image Processing', 'Machine Learning']
      },
      {
        name: 'Sample WSI Images',
        description: 'Small whole slide images for learning (auto-downloaded)',
        action: 'Used Automatically',
        type: 'auto',
        size: '~500MB',
        provider: 'Tutorial System',
        usedIn: ['Image Processing', 'WSI Analysis']
      },
      {
        name: 'OpenSlide Test Data',
        description: 'Sample slides for testing WSI processing pipelines',
        action: 'Browse Samples',
        url: 'http://openslide.cs.cmu.edu/download/openslide-testdata/',
        type: 'dataset',
        size: '~2GB',
        provider: 'Carnegie Mellon',
        usedIn: ['WSI Analysis']
      }
    ]
  },
  {
    category: 'Machine Learning Resources',
    title: 'ML & Deep Learning Courses',
    description: 'Build strong foundations in machine learning and AI',
    icon: '🤖',
    difficulty: 'Intermediate',
    items: [
      {
        name: 'Machine Learning Course (Andrew Ng)',
        description: 'The most popular ML course online - comprehensive and beginner-friendly',
        action: 'Enroll Free',
        url: 'https://www.coursera.org/learn/machine-learning',
        type: 'course',
        duration: '61 hours',
        provider: 'Stanford/Coursera',
        unlockAfter: 'Complete Data Visualization course'
      },
      {
        name: 'Scikit-learn Tutorial',
        description: 'Hands-on machine learning with Python and scikit-learn',
        action: 'Start Tutorial',
        url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
        type: 'course',
        duration: '7 hours',
        provider: 'Kaggle Learn',
        unlockAfter: 'Complete Data Visualization course'
      },
      {
        name: 'Deep Learning Specialization',
        description: 'Comprehensive deep learning course series by Andrew Ng',
        action: 'View Course',
        url: 'https://www.coursera.org/specializations/deep-learning',
        type: 'specialization',
        duration: '3-4 months',
        provider: 'deeplearning.ai',
        unlockAfter: 'Complete Machine Learning course'
      },
      {
        name: 'Fast.ai Practical Deep Learning',
        description: 'Learn deep learning through practical projects and applications',
        action: 'Start Lessons',
        url: 'https://course.fast.ai/',
        type: 'course',
        duration: '15+ hours',
        provider: 'fast.ai',
        unlockAfter: 'Complete Machine Learning course'
      }
    ]
  },
  {
    category: 'Advanced Resources',
    title: 'Cutting-edge Pathology AI',
    description: 'Latest research and foundation models in computational pathology',
    icon: '🎓',
    difficulty: 'Advanced',
    items: [
      {
        name: 'Foundation Models Hub',
        description: 'Pre-trained models like UNI and CONCH for pathology',
        action: 'Explore Models',
        url: 'https://huggingface.co/MahmoodLab',
        type: 'models',
        provider: 'Mahmood Lab',
        unlockAfter: 'Complete Deep Learning course'
      },
      {
        name: 'Computational Pathology Papers',
        description: 'Latest research in AI-powered digital pathology',
        action: 'Browse Papers',
        url: 'https://arxiv.org/list/eess.IV/recent',
        type: 'research',
        provider: 'arXiv',
        unlockAfter: 'Complete Machine Learning course'
      },
      {
        name: 'PathML Library',
        description: 'Open-source tools for computational pathology workflows',
        action: 'View Documentation',
        url: 'https://pathml.readthedocs.io/',
        type: 'library',
        provider: 'PathML Team',
        unlockAfter: 'Complete Computational Pathology course'
      },
      {
        name: 'CLAM Framework',
        description: 'Clustering-constrained attention multiple instance learning',
        action: 'GitHub Repository',
        url: 'https://github.com/mahmoodlab/CLAM',
        type: 'framework',
        provider: 'Mahmood Lab',
        unlockAfter: 'Complete Foundation Models course'
      }
    ]
  },
  {
    category: 'Community & Support',
    title: 'Connect & Get Help',
    description: 'Join communities and find help when you need it',
    icon: '👥',
    difficulty: 'All Levels',
    items: [
      {
        name: 'Stack Overflow - Python',
        description: 'Get help with Python programming questions',
        action: 'Ask Questions',
        url: 'https://stackoverflow.com/questions/tagged/python',
        type: 'community',
        provider: 'Stack Overflow'
      },
      {
        name: 'Reddit - r/MachineLearning',
        description: 'Discussions on ML research, papers, and career advice',
        action: 'Join Community',
        url: 'https://www.reddit.com/r/MachineLearning/',
        type: 'community',
        provider: 'Reddit'
      },
      {
        name: 'Kaggle Forums',
        description: 'Data science competitions and learning community',
        action: 'Join Discussions',
        url: 'https://www.kaggle.com/discussions',
        type: 'community',
        provider: 'Kaggle'
      },
      {
        name: 'Python Documentation',
        description: 'Official Python documentation and tutorials',
        action: 'Browse Docs',
        url: 'https://docs.python.org/3/',
        type: 'documentation',
        provider: 'Python.org'
      }
    ]
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedTutorials: [],
    completedTasks: {},
    currentTutorial: null,
    totalProgress: 0
  });

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('pathology-tutorial-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save user progress to localStorage
  const saveProgress = (progress: UserProgress) => {
    setUserProgress(progress);
    localStorage.setItem('pathology-tutorial-progress', JSON.stringify(progress));
  };

  // Check if tutorial is unlocked based on prerequisites
  const isTutorialUnlocked = (tutorial: Tutorial): boolean => {
    if (tutorial.prerequisites.length === 0) return true;
    return tutorial.prerequisites.every(prereq => 
      userProgress.completedTutorials.includes(prereq)
    );
  };

  // Mark tutorial as completed
  const markTutorialCompleted = (tutorialId: string) => {
    const newProgress = {
      ...userProgress,
      completedTutorials: [...userProgress.completedTutorials, tutorialId],
      totalProgress: Math.min(100, userProgress.totalProgress + (100 / tutorials.length))
    };
    saveProgress(newProgress);
  };

  // Mark task as completed
  const markTaskCompleted = (tutorialId: string, taskIndex: number) => {
    const tutorialTasks = userProgress.completedTasks[tutorialId] || [];
    const taskKey = `${tutorialId}-${taskIndex}`;
    
    if (!tutorialTasks.includes(taskKey)) {
      const newCompletedTasks = {
        ...userProgress.completedTasks,
        [tutorialId]: [...tutorialTasks, taskKey]
      };
      
      const newProgress = {
        ...userProgress,
        completedTasks: newCompletedTasks
      };
      saveProgress(newProgress);
    }
  };

  // Get tutorial progress percentage
  const getTutorialProgress = (tutorial: Tutorial): number => {
    const completedTasks = userProgress.completedTasks[tutorial.id] || [];
    return Math.round((completedTasks.length / tutorial.tasks.length) * 100);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <Microscope className="w-6 h-6 text-white" />;
      case 'Intermediate': return <Brain className="w-6 h-6 text-white" />;
      case 'Advanced': return <Brain className="w-6 h-6 text-white" />;
      case 'Expert': return <BookOpen className="w-6 h-6 text-white" />;
      default: return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  const DashboardView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header - Apple HIG Style */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <div className="w-px h-5 bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Learning Dashboard</h1>
                  <p className="text-xs text-gray-500">Track your progress</p>
                </div>
              </div>
            </div>
            
            {/* Progress Overview - Compact */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  {userProgress.completedTutorials.length}/{tutorials.length} Complete
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {Math.round(userProgress.totalProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Progress Card - Apple HIG Style */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">Your Progress</h2>
              <p className="text-gray-600">
                Keep going! You're making excellent progress on your learning journey.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-light text-gray-900 mb-1">
                {Math.round(userProgress.totalProgress)}%
              </div>
              <div className="text-sm text-gray-500 font-medium">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${userProgress.totalProgress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{userProgress.completedTutorials.length} courses completed</span>
            <span>{tutorials.length - userProgress.completedTutorials.length} remaining</span>
          </div>
        </div>

        {/* Tutorial Path */}
        <div className="space-y-6">
          {tutorials.map((tutorial, index) => {
            const isUnlocked = isTutorialUnlocked(tutorial);
            const isCompleted = userProgress.completedTutorials.includes(tutorial.id);
            const progress = getTutorialProgress(tutorial);
            
            return (
              <div
                key={tutorial.id}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  isUnlocked 
                    ? 'border-slate-200 hover:shadow-lg hover:border-slate-300 cursor-pointer' 
                    : 'border-slate-100 opacity-60'
                } ${
                  selectedTutorial === tutorial.id ? 'ring-2 ring-blue-200 shadow-xl' : ''
                } ${
                  isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : ''
                }`}
                onClick={() => isUnlocked && setSelectedTutorial(selectedTutorial === tutorial.id ? null : tutorial.id)}
              >
                {/* Tutorial Card Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Step Number & Lock/Complete Status */}
                      <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-600 to-emerald-600' 
                          : isUnlocked 
                            ? 'bg-gradient-to-br from-blue-600 to-teal-600'
                            : 'bg-slate-300'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : isUnlocked ? (
                          getLevelIcon(tutorial.level)
                        ) : (
                          <Lock className="w-6 h-6 text-slate-500" />
                        )}
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{tutorial.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(tutorial.level)}`}>
                            {tutorial.level}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-3">{tutorial.description}</p>
                        
                        {/* Prerequisites */}
                        {tutorial.prerequisites.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-slate-500 mr-2">Prerequisites:</span>
                            {tutorial.prerequisites.map((prereq, i) => (
                              <span key={prereq} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md mr-1">
                                {tutorials.find(t => t.id === prereq)?.title || prereq}
                                {i < tutorial.prerequisites.length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-1">{tutorial.duration}</div>
                      {isUnlocked && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                isCompleted ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-500">{progress}%</span>
                        </div>
                      )}
                      <ArrowRight 
                        className={`w-4 h-4 mt-2 transition-transform duration-300 ${
                          selectedTutorial === tutorial.id ? 'rotate-90' : ''
                        } ${
                          isUnlocked ? 'text-slate-400' : 'text-slate-300'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedTutorial === tutorial.id && isUnlocked && (
                  <div className="border-t border-slate-100">
                    <div className="p-6">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <Play className="w-4 h-4 mr-2 text-blue-600" />
                        Learning Tasks:
                      </h4>
                      
                      <div className="space-y-3 mb-6">
                        {tutorial.tasks.map((task, taskIndex) => {
                          const taskCompleted = (userProgress.completedTasks[tutorial.id] || [])
                            .includes(`${tutorial.id}-${taskIndex}`);
                          
                          return (
                            <div key={taskIndex} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  taskCompleted ? 'bg-green-500' : 'bg-slate-300'
                                }`}>
                                  {taskCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <span className="text-xs text-slate-600 font-bold">{taskIndex + 1}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900">{task.name}</div>
                                  <div className="text-xs text-slate-500 flex items-center space-x-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{task.estimatedTime}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {taskCompleted && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    Completed
                                  </span>
                                )}
                                
                                {IS_GITHUB_PAGES ? (
                                  <div className="flex flex-wrap items-center gap-2">
                                    <a 
                                      href={`https://github.com/anand-indx/dp-t25/blob/main/${task.notebookUrl}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 bg-slate-600 text-white px-2 py-1 rounded-md hover:bg-slate-700 transition-colors text-xs"
                                      onClick={(e) => e.stopPropagation()}
                                      title="View notebook source on GitHub"
                                    >
                                      <Github className="w-3 h-3" />
                                      <span>View</span>
                                    </a>
                                    <a 
                                      href={`https://colab.research.google.com/github/anand-indx/dp-t25/blob/main/${task.notebookUrl}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600 transition-colors text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!taskCompleted) {
                                          setTimeout(() => markTaskCompleted(tutorial.id, taskIndex), 1000);
                                        }
                                      }}
                                      title="Open in Google Colab (recommended)"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>Colab</span>
                                    </a>
                                    <a 
                                      href={`https://mybinder.org/v2/gh/anand-indx/dp-t25/main?filepath=${task.notebookUrl}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 bg-pink-500 text-white px-2 py-1 rounded-md hover:bg-pink-600 transition-colors text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!taskCompleted) {
                                          setTimeout(() => markTaskCompleted(tutorial.id, taskIndex), 1000);
                                        }
                                      }}
                                      title="Launch in Binder (free cloud environment)"
                                    >
                                      <Play className="w-3 h-3" />
                                      <span>Binder</span>
                                    </a>
                                    <a 
                                      href={`https://anand-indx.github.io/dp-t25/lite/lab?path=files/${task.notebookUrl}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!taskCompleted) {
                                          setTimeout(() => markTaskCompleted(tutorial.id, taskIndex), 1000);
                                        }
                                      }}
                                      title="Run in JupyterLite (Python in browser)"
                                    >
                                      <Brain className="w-3 h-3" />
                                      <span>Lite</span>
                                    </a>
                                  </div>
                                ) : (
                                  <a 
                                    href={`${JUPYTER_BASE_URL}/lab/tree/${task.notebookUrl}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!taskCompleted) {
                                        setTimeout(() => markTaskCompleted(tutorial.id, taskIndex), 1000);
                                      }
                                    }}
                                  >
                                    <Play className="w-3 h-3" />
                                    <span>Start</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Complete Tutorial Button */}
                      {progress === 100 && !isCompleted && (
                        <button
                          onClick={() => markTutorialCompleted(tutorial.id)}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                        >
                          🎉 Mark Tutorial as Complete
                        </button>
                      )}

                      {/* Enhanced Datasets Section */}
                      <div className="mt-6">
                        <h5 className="font-semibold text-slate-800 mb-3 flex items-center">
                          <Database className="w-4 h-4 mr-2 text-blue-600" />
                          📊 Datasets & Resources
                        </h5>
                        <div className="space-y-3">
                          {tutorial.datasets.map((dataset, idx) => (
                            <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                              <div className="font-medium text-blue-900 mb-2">{dataset.name}</div>
                              <div className="text-sm text-gray-700 mb-3 leading-relaxed">{dataset.description}</div>
                              <a 
                                href={dataset.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Access Dataset
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-white">
      {/* Header - Apple HIG Style */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Microscope className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">AI in Digital Pathology</h1>
                <p className="text-xs text-gray-500 font-medium">Interactive Tutorials</p>
              </div>
            </div>
            <a 
              href="https://github.com/anand-indx/dp-t25" 
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero Section - Apple HIG Style */}
        <section className="pt-16 pb-20 text-center">
          {/* Refined Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8 border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            AI-Powered Learning Platform
          </div>
          
          {/* Apple-style Typography */}
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Master AI in Digital 
            <span className="block font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Pathology
            </span>
          </h2>
          
          <p className="text-xl font-light text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Learn through hands-on tutorials, from basic image processing to advanced deep learning 
            and foundation models. Each lesson includes real pathology datasets and interactive exercises.
          </p>
          
          {/* Apple-style Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Learning Path</span>
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-gray-100 text-gray-900 px-8 py-3.5 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Progress</span>
            </button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100">
              <CheckCircle className="w-4 h-4" />
              <span>Progressive Learning</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-100">
              <Database className="w-4 h-4" />
              <span>Real Datasets</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full border border-yellow-100">
              <Trophy className="w-4 h-4" />
              <span>Interactive Exercises</span>
            </div>
          </div>
        </section>

        {IS_GITHUB_PAGES && (
          <section className="mb-20 bg-gray-50/50 rounded-2xl border border-gray-100 p-10">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">Choose Your Learning Environment</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Select the environment that works best for your learning style and technical setup.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Github className="w-6 h-6 text-gray-700" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">View</h4>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Browse notebooks as formatted documents. Perfect for reviewing concepts and code structure.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border border-orange-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 relative">
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Recommended
                </div>
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <ExternalLink className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Colab</h4>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Full Python environment with GPU access. Best for hands-on learning and experimentation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Binder</h4>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Free cloud environment. Takes 1-2 minutes to launch but fully interactive.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Lite</h4>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Run Python directly in browser. Instant startup with basic package support.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full inline-block">
                💡 <strong>New to coding?</strong> Start with Colab for the smoothest experience
              </p>
            </div>
          </section>
        )}

        {/* Learning Path Overview */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Your Learning Journey</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Follow our progressive curriculum designed by experts. Each course builds on previous knowledge, 
              ensuring you develop strong foundations before advancing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => {
              const isUnlocked = isTutorialUnlocked(tutorial);
              const isCompleted = userProgress.completedTutorials.includes(tutorial.id);
              
              return (
                <div
                  key={tutorial.id}
                  className={`bg-white rounded-2xl transition-all duration-300 border ${
                    isUnlocked 
                      ? 'border-gray-200 hover:shadow-xl hover:border-gray-300 cursor-pointer hover:scale-[1.02]' 
                      : 'border-gray-100 opacity-60'
                  } ${
                    isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200' : ''
                  }`}
                  onClick={() => isUnlocked && setCurrentView('dashboard')}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                            : isUnlocked 
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                              : 'bg-gray-300'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : isUnlocked ? (
                            getLevelIcon(tutorial.level)
                          ) : (
                            <Lock className="w-6 h-6 text-gray-500" />
                          )}
                          <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-3xl font-light text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(tutorial.level)}`}>
                        {tutorial.level}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{tutorial.title}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{tutorial.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <span className="font-medium">{tutorial.duration}</span>
                      <span>{tutorial.tasks.length} exercises</span>
                    </div>

                    {/* Prerequisites */}
                    {tutorial.prerequisites.length > 0 && (
                      <div className="mb-6">
                        <span className="text-xs text-gray-500 font-medium mb-2 block">Prerequisites:</span>
                        <div className="flex flex-wrap gap-2">
                          {tutorial.prerequisites.map((prereq) => (
                            <span key={prereq} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                              {tutorials.find(t => t.id === prereq)?.title || prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Status */}
                    {isCompleted ? (
                      <div className="flex items-center text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg">
                        <Trophy className="w-4 h-4 mr-2" />
                        Completed
                      </div>
                    ) : isUnlocked ? (
                      <div className="flex items-center text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        <Play className="w-4 h-4 mr-2" />
                        Start Course
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-lg">
                        <Lock className="w-4 h-4 mr-2" />
                        Complete prerequisites to unlock
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning Resources Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Learning Resources & Tools</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to succeed in your digital pathology journey, organized by your current skill level.
            </p>
          </div>
          
          <div className="space-y-8">
            {learningResources.map((resourceCategory, categoryIndex) => {
              // Check if category should be unlocked based on user progress
              const isAdvanced = resourceCategory.difficulty === 'Advanced';
              const hasMinimumProgress = userProgress.completedTutorials.length >= 2;
              const shouldShowAdvanced = !isAdvanced || hasMinimumProgress;
              
              if (!shouldShowAdvanced) {
                return (
                  <div key={categoryIndex} className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-8 text-center opacity-75">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center text-2xl">
                        🔒
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-700 mb-2">{resourceCategory.title}</h4>
                    <p className="text-slate-600 mb-4">{resourceCategory.description}</p>
                    <div className="inline-flex items-center space-x-2 bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Complete 2+ courses to unlock advanced resources</span>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={categoryIndex} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 border-b border-slate-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-2xl">
                        {resourceCategory.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="text-xl font-bold text-slate-900">{resourceCategory.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            resourceCategory.difficulty === 'Beginner' 
                              ? 'bg-green-100 text-green-800'
                              : resourceCategory.difficulty === 'All Levels'
                                ? 'bg-blue-100 text-blue-800'  
                                : 'bg-purple-100 text-purple-800'
                          }`}>
                            {resourceCategory.difficulty}
                          </span>
                        </div>
                        <p className="text-slate-600">{resourceCategory.description}</p>
                        <div className="mt-2 text-sm text-slate-500">
                          <span className="font-medium">{resourceCategory.category}</span> • 
                          <span className="ml-1">{resourceCategory.items.length} resources</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Resource Items */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resourceCategory.items.map((item, itemIndex) => {
                        const isLocked = item.unlockAfter && !userProgress.completedTutorials.some(id => 
                          item.unlockAfter?.toLowerCase().includes(id.replace('-', ' '))
                        );
                        
                        return (
                          <div
                            key={itemIndex}
                            className={`bg-slate-50 rounded-lg p-4 transition-all duration-200 ${
                              isLocked 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-slate-100 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h5 className="font-semibold text-slate-900 mb-1 flex items-center">
                                  {item.name}
                                  {item.type === 'auto' && (
                                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                      Auto
                                    </span>
                                  )}
                                </h5>
                                <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                                
                                {/* Additional Info */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {item.size && (
                                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                      📦 {item.size}
                                    </span>
                                  )}
                                  {item.usedIn && (
                                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                      🎯 Used in: {item.usedIn.join(', ')}
                                    </span>
                                  )}
                                  {item.type && (
                                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded capitalize">
                                      {item.type === 'guide' && '📖'}
                                      {item.type === 'interactive' && '🚀'}
                                      {item.type === 'reading' && '�'}
                                      {item.type === 'dataset' && '🔬'}
                                      {item.type === 'models' && '🤖'}
                                      {item.type === 'research' && '📄'}
                                      {item.type === 'auto' && '⚡'}
                                      {' '}{item.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Button or Status */}
                            {isLocked ? (
                              <div className="text-xs text-slate-500 italic">
                                🔒 {item.unlockAfter}
                              </div>
                            ) : item.type === 'auto' ? (
                              <div className="flex items-center text-green-600 text-sm font-medium">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Available in tutorials
                              </div>
                            ) : item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium w-full justify-center"
                              >
                                <span>{item.action}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <div className="text-center py-2 text-sm text-slate-500 border border-dashed border-slate-300 rounded">
                                {item.action}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Category Footer with Tips */}
                    {resourceCategory.category === 'Getting Started' && (
                      <div className="mt-6 bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">💡</span>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-semibold text-blue-900 mb-1">Beginner Tip</h6>
                            <p className="text-sm text-blue-800">
                              Start with the Python Environment Setup, then try the Jupyter demo. 
                              All datasets are automatically downloaded when you run the tutorials!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {resourceCategory.category === 'Practice Datasets' && (
                      <div className="mt-6 bg-green-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">🎯</span>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-semibold text-green-900 mb-1">Good to Know</h6>
                            <p className="text-sm text-green-800">
                              Don't worry about downloading datasets manually! Our tutorials automatically fetch 
                              the data you need. Just click "Start Learning Path" above.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-slate-200">
          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="text-amber-600 mt-0.5">⚠️</div>
              <div className="text-left">
                <p className="text-sm text-amber-800 font-medium mb-1">AI-Generated Educational Content</p>
                <p className="text-sm text-amber-700">
                  These tutorials are generated by AI to make learning AI in digital pathology smooth and faster. 
                  While designed to be educational and comprehensive, please verify concepts with authoritative sources 
                  for critical applications. Our goal is to accelerate your learning journey in computational pathology.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-slate-600">
            Built with ❤️ for the digital pathology community. 
            <a href="https://github.com" className="text-blue-600 hover:text-blue-800 ml-1">
              Contribute on GitHub
            </a>
          </p>
        </footer>
      </main>
    </div>
  );

  return currentView === 'dashboard' ? <DashboardView /> : <HomeView />;
}

export default App;
