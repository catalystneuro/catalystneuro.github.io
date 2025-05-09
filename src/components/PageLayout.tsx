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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-transparent pt-16 relative">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDY2QTciIGZpbGwtb3BhY2l0eT0iMC4wNCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgLTE3NC42NiA1NC44OCkiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob-1 absolute top-[10%] -left-[5%] w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="animate-blob-2 absolute top-[15%] right-[10%] w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animation-delay-2000"></div>
        <div className="animate-blob-3 absolute bottom-[15%] left-[20%] w-56 h-56 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {(title || subtitle) && (
          <div className="transition-opacity duration-1000 opacity-100">
            {title && (
              <>
                <h1 className="text-4xl font-bold mb-2 text-center text-secondary">{title}</h1>
                <div className="h-1 w-24 bg-primary mx-auto mb-8 rounded"></div>
              </>
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
};

export default PageLayout;
