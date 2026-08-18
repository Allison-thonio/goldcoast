declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  };
  export type LucideIcon = ComponentType<LucideProps>;
  const icon: LucideIcon;
  export default icon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Activity: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Users: LucideIcon;
  export const Award: LucideIcon;
  export const Sparkles: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Globe: LucideIcon;
  export const Smartphone: LucideIcon;
  export const BarChart3: LucideIcon;
  export const Flame: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Heart: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const [key: string]: any;
}
