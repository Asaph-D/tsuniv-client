// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { Check } from "lucide-react";

const StepIndicator = ({ steps, currentStep }) => {
  return <motion.div className="w-full mx-auto md:w-4/5 p-4">
    <div className="flex items-start justify-between mb-4">
      {steps.map((step) => (
        <div key={step.title} className="flex flex-col items-center">
          <motion.div
            className={`w-10 h-10 rounded-full 
              flex items-center justify-center text-sm font-semibold transition-all
               ${currentStep >= step.id
                ? 'bg-orange-400 text-white shadow-lg'
                : 'bg-orange-600 text-white'
              }`}
            whileHover={{ scale: 1.1 }}
          >
            {currentStep > step.id ? (
              <Check className="h-5 w-5" />
            ) : (
              <step.icon className="h-5 w-5" />
            )}
          </motion.div>
          <span className="text-xs mt-2 text-center max-w-20">
            {step.title}
          </span>
        </div>
      ))}
    </div>
    <div className="w-full bg-gray-600 rounded-full h-2">
      <motion.div
        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      />
    </div>
  </motion.div>
}

export default StepIndicator;