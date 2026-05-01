export function Footer() {
  return (
    <footer className="border-t border-border py-4">
      <div className="px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PAPS — Intelligent Plant Automated Pest System
        </p>
      </div>
    </footer>
  )
}
