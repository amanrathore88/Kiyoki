import React from 'react';
import { TechnologyVideoCinema } from './TechnologyVideoCinema';
import { TECHNOLOGY_DATA } from '../../technologyData';

export const TechnologyVideo: React.FC = () => {
  const { videoSection } = TECHNOLOGY_DATA;

  return (
    <TechnologyVideoCinema
      videoSrc="/videos/kiyoki-anion-technology.mp4"
      posterSrc={videoSection.poster || '/images/technology/india-gate.webp'}
      durationLabel={videoSection.duration || '03:15'}
      heading={videoSection.heading}
      subtitle={videoSection.subtitle}
    />
  );
};

export default TechnologyVideo;
