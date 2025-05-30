import { cn } from "@/lib/utils";

export interface LoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
}

const Loader = ({ size = "md", text, className }: LoaderProps) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div
                className={cn(
                    "relative flex items-center justify-center",
                    sizeClasses[size],
                    className
                )}
            >
                <div className="absolute w-full h-full rounded-full bg-purple-200 animate-ping" />
                <div className="absolute w-3/4 h-3/4 rounded-full bg-purple-400 animate-pulse" />
                <div className="w-1/2 h-1/2 rounded-full bg-purple-600" />
            </div>
            {text && <p className="text-foreground/80 animate-pulse text-sm md:text-base">{text}</p>}
        </div>
    )
};

export default Loader;
