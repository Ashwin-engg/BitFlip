import { motion } from "framer-motion";
import { Card } from "@/react-app/components/ui/card";
import { cn } from "@/react-app/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      }}
    >
      <Card className={cn("transition-colors duration-200", className)}>
        {children}
      </Card>
    </motion.div>
  );
}
