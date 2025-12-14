const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="/team" className="text-sm text-gray-600 hover:text-gray-900">Team</a></li>
              <li><a href="/openings" className="text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="/funded-projects" className="text-sm text-gray-600 hover:text-gray-900">Funded Projects</a></li>
              <li><a href="/nwb-software" className="text-sm text-gray-600 hover:text-gray-900">NWB Software</a></li>
              <li><a href="/analysis-software" className="text-sm text-gray-600 hover:text-gray-900">Analysis Software</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/catalystneuro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/catalyst-neuro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <p className="text-sm text-gray-600">
              Have questions? Get in touch with us.
            </p>
            <a 
              href="mailto:info@catalystneuro.com"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              info@catalystneuro.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} CatalystNeuro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
