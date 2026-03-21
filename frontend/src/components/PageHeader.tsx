/**
 * PageHeader — reusable gradient page header with title and subtitle.
 */

interface PageHeaderProps {
  title: string;
  highlight: string;
  subtitle: string;
}

export default function PageHeader({ title, highlight, subtitle }: PageHeaderProps) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-white animate-fade-in-up">
          {title} <span className="text-gradient">{highlight}</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg animate-fade-in-up">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
