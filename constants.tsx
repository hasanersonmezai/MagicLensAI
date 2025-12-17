import React from 'react';
import { Preset } from './types';

// Icons using simple SVG paths to avoid external dependencies
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const PRESETS: Preset[] = [
  {
    id: 1,
    label: "9 farklı saç sitili uygula",
    prompt: "Make a 3x3 grid of different hairstyles",
    category: "style",
    icon: <GridIcon />
  },
  {
    id: 2,
    label: "20-80 yaş aralığı",
    prompt: "Generate the realistic photo of this person through the ages from 20 up to 80 years old for each 10 years with a different pose.",
    category: "age",
    icon: <ClockIcon />
  },
  {
    id: 3,
    label: "Prens",
    prompt: "Prens yap.",
    category: "fun",
    icon: <CrownIcon />
  },
  {
    id: 4,
    label: "Prenses",
    prompt: "Prenses yap.",
    category: "fun",
    icon: <CrownIcon />
  },
  {
    id: 5,
    label: "Ghibli",
    prompt: "Fotoğrafı ghibli yap.",
    category: "style",
    icon: <SparklesIcon />
  },
  {
    id: 6,
    label: "Pixar",
    prompt: "Fotoğrafı pixar yap.",
    category: "style",
    icon: <SparklesIcon />
  },
  {
    id: 7,
    label: "Karakalem",
    prompt: "Create a photo-style line drawing / ink sketch of the faces identical to the uploaded reference image — keep every facial feature, proportion, and expression exactly the same. Use black and white ink tones with intricate, fine line detailing, drawn on a notebook-page style background. Show a right hand holding a pen and an eraser near the sketch, as if the artist is still working.",
    category: "style",
    icon: <PencilIcon />
  },
  {
    id: 8,
    label: "LinkedIn profil fotoğrafı (Siyah Beyaz)",
    prompt: "Create a professional monochrome (black and white) portrait based on my uploaded selfie. The photo should have a clean, neutral background with soft studio lighting that enhances natural skin texture and facial symmetry. The subject (me) is facing the camera directly, smiling naturally, and framed from the shoulders up in a circular crop. Outfit should be a light-colored blazer or suit jacket over a simple top, with hair styled naturally down. The overall look should feel modern, polished, and LinkedIn-profile ready, similar to a corporate studio headshot. Keep the expression warm and approachable, lighting balanced, and image sharp. Composition: portrait orientation, centered, evenly lit, minimal contrast shadows.",
    category: "professional",
    icon: <UserCircleIcon />
  },
  {
    id: 9,
    label: "LinkedIn profil fotoğrafı (Renkli)",
    prompt: "Create a hyperrealistic professional color portrait of the same person as in the uploaded reference photo, maintaining exact facial proportions, eye spacing, nose width, lip thickness, and natural hairline. The face must look authentic, unretouched, and 95%+ identical to the reference photo — no idealization or reshaping. Use soft, diffused studio lighting from a 45-degree angle to highlight natural skin texture and facial depth. Background: neutral mid-gray, gradient tone, no patterns or props. Expression: gentle, natural smile, eyes open and focused directly on the lens. Composition: shoulders up, circular crop, centered, portrait orientation. Outfit: light-colored blazer or suit jacket over a simple white shirt, collar slightly open. Hair: styled naturally, matching the reference’s hairline and direction. Style reference: LinkedIn corporate photography, Leica Summicron sharpness, Kodak color tonality. Maintain fine skin details (pores, lines, texture), subtle contrast, and evenly balanced shadows. Do not apply beautification filters or symmetry corrections. Ensure realism, authenticity, and professional polish.",
    category: "professional",
    icon: <UserCircleIcon />
  }
];