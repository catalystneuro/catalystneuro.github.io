import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent pt-16">
      <div className="container mx-auto px-4 py-8">
        {(title || subtitle) && (
          <div className="transition-opacity duration-1000 opacity-100">
            {title && (
              <h1 className="text-4xl font-bold mb-8 text-center text-secondary">{title}</h1>
            )}
            
            {subtitle && (
              <p className="text-center text-lg text-secondary/85 mb-12 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
