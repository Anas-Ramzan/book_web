export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Your Brand. All rights reserved.
      </div>
    </footer>
  );
}
