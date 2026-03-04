import React from 'react';

interface IconProps {
  className?: string;
}

export const GraduationIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 6.00012H4V8.00012H20V6.00012ZM18.97 9.00012C18.86 9.00012 18.76 9.02012 18.66 9.06012L12 11.5901L5.34 9.06012C5.24 9.02012 5.14 9.00012 5.03 9.00012C4.46 9.00012 4 9.46012 4 10.0301V15.0001H6V11.1801L12 13.4101L18 11.1801V15.0001H20V10.0301C20 9.46012 19.54 9.00012 18.97 9.00012ZM12 15.0001L7 13.0001V14.5801L12 16.5901L17 14.5801V13.0001L12 15.0001Z" />
  </svg>
);

export const UniversityIcon: React.FC<IconProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
  </svg>
);
