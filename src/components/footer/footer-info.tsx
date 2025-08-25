import Link from "next/link";
import { TechStackItem } from "@/types/footer";

interface TechStackProps {
  items: TechStackItem[];
}

function TechStack({ items }: TechStackProps) {
  return (
    <div className="tech-stack flex flex-wrap items-center justify-center md:justify-start gap-1 text-xs text-gray-500 mt-2">
      <span>Built with:</span>
      {items.map((item, index) => (
        <span key={item.name} className="flex items-center">
          {item.url ? (
            <Link 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="tech-stack-item text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="tech-stack-item text-gray-600">{item.name}</span>
          )}
          {index < items.length - 1 && (
            <span className="tech-stack-separator mx-1 text-gray-400">•</span>
          )}
        </span>
      ))}
    </div>
  );
}

interface FooterInfoProps {
  copyright: string;
  techStack?: TechStackItem[];
  repositoryUrl?: string;
}

export function FooterInfo({ copyright, techStack, repositoryUrl }: FooterInfoProps) {
  return (
    <div className="footer-info mt-6 pt-6 border-t border-gray-200">
      <div className="text-center md:text-left">
        <p className="footer-copyright text-xs text-gray-500">
          {copyright}
        </p>
        
        {techStack && techStack.length > 0 && (
          <TechStack items={techStack} />
        )}
        
        {repositoryUrl && (
          <div className="mt-2">
            <Link 
              href={repositoryUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              View source code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}