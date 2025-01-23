import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu, Github, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../public/lovable-uploads/c816ee3f-4861-41a1-90a1-3af8e81d86c3.png";

export const Navigation = () => {

  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Team", path: "/team" },
    {
      label: "Software",
      items: [
        { label: "NWB Software", path: "/nwb-software" },
        { label: "Analysis Software", path: "/analysis-software" },
      ],
    },
    {
      label: "Portfolio",
      items: [
        { label: "NWB Conversions", path: "/nwb-conversions" },
        { label: "Funded Projects", path: "/funded-projects" },
      ],
    },
    { label: "Blog", path: "/blog" },
    { label: "Openings", path: "/openings" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center">
          {/* Mobile View */}
          <div className="flex justify-between items-center w-full md:hidden">
            <Link to="/">
              <img 
                src={logo}
                alt="CatalystNeuro"
                className="h-8"
              />
            </Link>
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger className="font-bold" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </MenubarTrigger>
                <MenubarContent>
                  {menuItems.map((item) => (
                    item.items ? (
                      item.items.map((subItem) => (
                        <MenubarItem key={subItem.path}>
                          <Link to={subItem.path} className="block w-full">
                            {subItem.label}
                          </Link>
                        </MenubarItem>
                      ))
                    ) : (
                      <MenubarItem key={item.path}>
                        <Link to={item.path} className="block w-full">
                          {item.label}
                        </Link>
                      </MenubarItem>
                    )
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between flex-1">
            <Link to="/">
              <img 
                src={logo}
                alt="CatalystNeuro"
                className="h-10"
              />
            </Link>
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                item.items ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center hover:text-primary transition-colors">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild>
                          <Link 
                            to={subItem.path}
                            className="block w-full"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <a
                href="https://github.com/catalystneuro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
