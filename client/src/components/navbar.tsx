import { Link, useLocation } from "wouter";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-primary">BookStore</a>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/">
              <a className={`hover:text-primary ${location === "/" ? "text-primary" : "text-gray-600"}`}>
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className={`hover:text-primary ${location === "/about" ? "text-primary" : "text-gray-600"}`}>
                About
              </a>
            </Link>
            <Link href="/services">
              <a className={`hover:text-primary ${location === "/services" ? "text-primary" : "text-gray-600"}`}>
                Services
              </a>
            </Link>
            <Link href="/contact">
              <a className={`hover:text-primary ${location === "/contact" ? "text-primary" : "text-gray-600"}`}>
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
