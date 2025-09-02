import { Loader2 } from "lucide-react";

const Loader = () => (
    <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="animate-spin text-orange-500 w-8 h-8" />
    </div>
);

export default Loader;
