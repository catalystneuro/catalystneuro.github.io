const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</a></li>
              <li><a href="/team" className="text-sm text-white/70 hover:text-white transition-colors">Team</a></li>
              <li><a href="/openings" className="text-sm text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/funded-projects" className="text-sm text-white/70 hover:text-white transition-colors">Funded Projects</a></li>
              <li><a href="/nwb-software" className="text-sm text-white/70 hover:text-white transition-colors">NWB Software</a></li>
              <li><a href="/analysis-software" className="text-sm text-white/70 hover:text-white transition-colors">Analysis Software</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/catalystneuro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/catalyst-neuro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <p className="text-sm text-white/70">
              Have questions? Get in touch with us.
            </p>
            <a
              href="mailto:info@catalystneuro.com"
              className="text-sm text-primary-300 hover:text-primary-200 transition-colors"
            >
              info@catalystneuro.com
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8">
          <p className="text-sm text-white/60 text-center">
            © {currentYear} CatalystNeuro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
