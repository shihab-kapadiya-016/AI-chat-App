export function Footer() {
    return (
    <footer className="border-t mt-16">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Chat. All rights reserved.
        </div>
    </footer>
);
}