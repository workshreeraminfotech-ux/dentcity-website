import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeading = ({ subtitle, title, description, light }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
    className="text-center max-w-2xl mx-auto mb-14"
  >
    {subtitle && (
      <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? "opacity-60" : "text-muted-foreground"}`}>
        {subtitle}
      </span>
    )}
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 ${light ? "" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base leading-relaxed ${light ? "opacity-70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
