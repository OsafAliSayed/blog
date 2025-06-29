import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2025 Osaf Ali Sayed. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/blog" 
              className="text-sm hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <a 
              href="https://osafalisayed.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
            >
              Portfolio
            </a>
            <a 
              href="https://github.com/osafalisayed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/osafalisayed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
