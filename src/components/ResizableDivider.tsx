import { useCallback, useState } from "react";

interface ResizableDividerProps {
  onResize: (width: number) => void;
}

export function ResizableDivider({ onResize }: ResizableDividerProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [initialWidth, setInitialWidth] = useState(70);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    setInitialWidth(e.clientX / window.innerWidth * 100);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        const constrainedWidth = Math.min(Math.max(newWidth, 40), 80); // Restrict between 40% and 80%
        onResize(constrainedWidth);
      }
    },
    [isResizing, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  return (
    <div
      className="hidden lg:block w-1 cursor-col-resize bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 transition-colors"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove as any}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}