import React from 'react';

export interface Preset {
  id: number;
  label: string;
  prompt: string;
  category: 'style' | 'professional' | 'fun' | 'age';
  icon: React.ReactNode;
}

export interface GeneratedImage {
  imageUrl: string;
  presetLabel: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  currentStep: string;
}